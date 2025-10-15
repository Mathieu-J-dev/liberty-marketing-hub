import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// List of disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'trashmail.com', 'yopmail.com', 'temp-mail.org'
];

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 5,
  windowMinutes: 60
};

interface LeadSubmission {
  name: string;
  email: string;
  source?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role for database operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP address
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log(`Lead submission attempt from IP: ${clientIp}`);

    // Parse and validate request body
    const body = await req.json();
    const { name, email, source = 'capture-page' } = body as LeadSubmission;

    // 1. INPUT VALIDATION
    if (!name || !email) {
      console.warn(`Missing required fields from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: 'Les champs nom et email sont requis.',
          code: 'MISSING_FIELDS'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate name length and format
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      console.warn(`Invalid name length from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: 'Le nom doit contenir entre 2 et 100 caractères.',
          code: 'INVALID_NAME_LENGTH'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for suspicious characters in name
    const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    if (!nameRegex.test(trimmedName)) {
      console.warn(`Invalid name format from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: 'Le nom contient des caractères non autorisés.',
          code: 'INVALID_NAME_FORMAT'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      console.warn(`Invalid email format from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: 'Format d\'email invalide.',
          code: 'INVALID_EMAIL_FORMAT'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. DISPOSABLE EMAIL DETECTION
    const emailDomain = trimmedEmail.split('@')[1];
    if (DISPOSABLE_EMAIL_DOMAINS.includes(emailDomain)) {
      console.warn(`Disposable email detected from IP: ${clientIp}, domain: ${emailDomain}`);
      return new Response(
        JSON.stringify({ 
          error: 'Les adresses email jetables ne sont pas autorisées.',
          code: 'DISPOSABLE_EMAIL'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. RATE LIMITING
    const rateLimitWindow = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60 * 1000);
    
    // Check recent submissions from this IP
    const { data: recentAttempts, error: rateLimitError } = await supabase
      .from('rate_limits')
      .select('id')
      .eq('ip_address', clientIp)
      .eq('action_type', 'lead_submission')
      .gte('created_at', rateLimitWindow.toISOString());

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      // Continue anyway - don't block legitimate users due to rate limit check errors
    } else if (recentAttempts && recentAttempts.length >= RATE_LIMIT.maxAttempts) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}, attempts: ${recentAttempts.length}`);
      return new Response(
        JSON.stringify({ 
          error: `Trop de tentatives. Veuillez réessayer dans ${RATE_LIMIT.windowMinutes} minutes.`,
          code: 'RATE_LIMIT_EXCEEDED'
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. CHECK FOR DUPLICATE EMAIL
    const { data: existingLead, error: duplicateCheckError } = await supabase
      .from('leads')
      .select('email')
      .eq('email', trimmedEmail)
      .maybeSingle();

    if (duplicateCheckError) {
      console.error('Duplicate check error:', duplicateCheckError);
    } else if (existingLead) {
      console.info(`Duplicate email submission from IP: ${clientIp}, email: ${trimmedEmail}`);
      return new Response(
        JSON.stringify({ 
          error: 'Cet email est déjà enregistré.',
          code: 'DUPLICATE_EMAIL'
        }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. RECORD RATE LIMIT ATTEMPT
    const { error: recordError } = await supabase
      .from('rate_limits')
      .insert({
        ip_address: clientIp,
        action_type: 'lead_submission'
      });

    if (recordError) {
      console.error('Failed to record rate limit:', recordError);
      // Continue anyway - don't block submission due to rate limit recording error
    }

    // 6. INSERT LEAD
    const { data: insertedLead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: trimmedName,
        email: trimmedEmail,
        source: source
      })
      .select()
      .single();

    if (insertError) {
      console.error('Lead insertion error:', insertError);
      return new Response(
        JSON.stringify({ 
          error: 'Une erreur est survenue lors de l\'enregistrement.',
          code: 'INSERT_ERROR'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Lead successfully submitted from IP: ${clientIp}, email: ${trimmedEmail}`);

    // 7. SUCCESS RESPONSE
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Inscription réussie!',
        lead: {
          id: insertedLead.id,
          email: insertedLead.email
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    // Log détaillé côté serveur uniquement
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Unexpected error in submit-lead function:', { message: errorMessage, stack: errorStack });
    
    // Message générique pour l'utilisateur
    return new Response(
      JSON.stringify({ 
        error: 'Une erreur s\'est produite lors du traitement de votre demande.',
        code: 'UNEXPECTED_ERROR'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
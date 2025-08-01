import { useState } from 'react';

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

interface ValidationSchema {
  [key: string]: ValidationRule[];
}

export const useFormValidation = (schema: ValidationSchema) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string | null => {
    const rules = schema[name];
    if (!rules) return null;

    for (const rule of rules) {
      if (!rule.test(value)) {
        return rule.message;
      }
    }
    return null;
  };

  const validateForm = (data: Record<string, string>): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    for (const [field, value] of Object.entries(data)) {
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => setErrors({});

  return { errors, validateForm, validateField, clearErrors };
};

// Règles de validation communes
export const validationRules = {
  required: (message = 'Ce champ est requis'): ValidationRule => ({
    test: (value) => value.trim().length > 0,
    message
  }),

  email: (message = 'Adresse email invalide'): ValidationRule => ({
    test: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => value.length >= min,
    message: message || `Minimum ${min} caractères requis`
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => value.length <= max,
    message: message || `Maximum ${max} caractères autorisés`
  }),

  noScript: (message = 'Caractères non autorisés détectés'): ValidationRule => ({
    test: (value) => !/<script|javascript:|on\w+=/i.test(value),
    message
  }),

  sanitized: (message = 'Contenu non autorisé détecté'): ValidationRule => ({
    test: (value) => {
      // Détecte les tentatives d'injection basiques
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+=/i,
        /data:text\/html/i,
        /<iframe/i,
        /<object/i,
        /<embed/i
      ];
      return !dangerousPatterns.some(pattern => pattern.test(value));
    },
    message
  })
};
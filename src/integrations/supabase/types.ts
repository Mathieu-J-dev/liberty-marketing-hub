export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      actions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          type: string
          xp_reward: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          type: string
          xp_reward?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          type?: string
          xp_reward?: number
        }
        Relationships: []
      }
      affiliate_programs: {
        Row: {
          category: string
          commission: string
          created_at: string
          created_by: string | null
          description: string
          earnings: string
          id: string
          is_active: boolean
          is_public: boolean
          link: string
          name: string
          rating: number
          recurring: boolean
          updated_at: string
        }
        Insert: {
          category: string
          commission: string
          created_at?: string
          created_by?: string | null
          description: string
          earnings: string
          id?: string
          is_active?: boolean
          is_public?: boolean
          link: string
          name: string
          rating: number
          recurring?: boolean
          updated_at?: string
        }
        Update: {
          category?: string
          commission?: string
          created_at?: string
          created_by?: string | null
          description?: string
          earnings?: string
          id?: string
          is_active?: boolean
          is_public?: boolean
          link?: string
          name?: string
          rating?: number
          recurring?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      completed_actions: {
        Row: {
          action_id: string
          completed_at: string
          id: string
          user_id: string
        }
        Insert: {
          action_id: string
          completed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          action_id?: string
          completed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "completed_actions_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "completed_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_downloads: {
        Row: {
          content_id: string
          downloaded_at: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          content_id: string
          downloaded_at?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          content_id?: string
          downloaded_at?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_downloads_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "member_content"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          source?: string | null
        }
        Relationships: []
      }
      "liberty-marketing-hub": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      member_content: {
        Row: {
          affiliate_link: string | null
          content_type: string
          created_at: string
          created_by: string | null
          description: string
          download_count: number | null
          download_url: string | null
          external_url: string | null
          file_path: string | null
          id: string
          is_active: boolean
          is_premium: boolean
          thumbnail_path: string | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          affiliate_link?: string | null
          content_type: string
          created_at?: string
          created_by?: string | null
          description: string
          download_count?: number | null
          download_url?: string | null
          external_url?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean
          is_premium?: boolean
          thumbnail_path?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          affiliate_link?: string | null
          content_type?: string
          created_at?: string
          created_by?: string | null
          description?: string
          download_count?: number | null
          download_url?: string | null
          external_url?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean
          is_premium?: boolean
          thumbnail_path?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      nods_page: {
        Row: {
          checksum: string | null
          id: number
          meta: Json | null
          parent_page_id: number | null
          path: string
          source: string | null
          type: string | null
        }
        Insert: {
          checksum?: string | null
          id?: number
          meta?: Json | null
          parent_page_id?: number | null
          path: string
          source?: string | null
          type?: string | null
        }
        Update: {
          checksum?: string | null
          id?: number
          meta?: Json | null
          parent_page_id?: number | null
          path?: string
          source?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nods_page_parent_page_id_fkey"
            columns: ["parent_page_id"]
            isOneToOne: false
            referencedRelation: "nods_page"
            referencedColumns: ["id"]
          },
        ]
      }
      nods_page_section: {
        Row: {
          content: string | null
          embedding: string | null
          heading: string | null
          id: number
          page_id: number
          slug: string | null
          token_count: number | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          heading?: string | null
          id?: number
          page_id: number
          slug?: string | null
          token_count?: number | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          heading?: string | null
          id?: number
          page_id?: number
          slug?: string | null
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nods_page_section_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "nods_page"
            referencedColumns: ["id"]
          },
        ]
      }
      security_logs: {
        Row: {
          action_type: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          trial_end: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          task: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          level: number
          progression: number
          updated_at: string
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          level?: number
          progression?: number
          updated_at?: string
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          level?: number
          progression?: number
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      create_thread: {
        Args: {
          p_created_by: string
          p_participant_ids: string[]
          p_title: string
        }
        Returns: string
      }
      get_page_parents: {
        Args: { page_id: number }
        Returns: {
          id: number
          meta: Json
          parent_page_id: number
          path: string
        }[]
      }
      get_user_subscription_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          is_valid: boolean
          subscribed: boolean
          subscription_end: string
          subscription_tier: string
          trial_end: string
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      increment_content_stats: {
        Args: { content_id_param: string; stat_type: string }
        Returns: undefined
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_page_sections: {
        Args: {
          embedding: string
          match_count: number
          match_threshold: number
          min_content_length: number
        }
        Returns: {
          content: string
          heading: string
          id: number
          page_id: number
          similarity: number
          slug: string
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      validate_password: {
        Args: { password: string }
        Returns: boolean
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "content_manager" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "content_manager", "user"],
    },
  },
} as const

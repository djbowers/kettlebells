export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string
          id: number
          movements: string[]
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          movements: string[]
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          movements?: string[]
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      training_history: {
        Row: {
          completed_at: string | null
          id: number
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: number
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: number
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_history_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

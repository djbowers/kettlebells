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
      workout_logs: {
        Row: {
          bells: number[]
          completed_at: string
          completed_reps: number
          completed_rounds: number
          completed_rungs: number
          id: number
          interval_timer: number
          minutes: number
          movements: string[]
          notes: string | null
          rep_scheme: number[]
          rest_timer: number
          rpe: Database["public"]["Enums"]["RPE"] | null
          started_at: string
          unit: string | null
          user_id: string
        }
        Insert: {
          bells?: number[]
          completed_at?: string
          completed_reps: number
          completed_rounds: number
          completed_rungs: number
          id?: number
          interval_timer?: number
          minutes: number
          movements: string[]
          notes?: string | null
          rep_scheme?: number[]
          rest_timer?: number
          rpe?: Database["public"]["Enums"]["RPE"] | null
          started_at: string
          unit?: string | null
          user_id: string
        }
        Update: {
          bells?: number[]
          completed_at?: string
          completed_reps?: number
          completed_rounds?: number
          completed_rungs?: number
          id?: number
          interval_timer?: number
          minutes?: number
          movements?: string[]
          notes?: string | null
          rep_scheme?: number[]
          rest_timer?: number
          rpe?: Database["public"]["Enums"]["RPE"] | null
          started_at?: string
          unit?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_user_id_fkey"
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
      RPE: "noEffort" | "easy" | "ideal" | "hard" | "maxEffort"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


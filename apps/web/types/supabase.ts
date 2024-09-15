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
          is_one_handed: boolean | null
          minutes: number
          movements: string[]
          rep_scheme: number[]
          rest_timer: number
          rpe: Database["public"]["Enums"]["RPE"] | null
          started_at: string
          unit: string | null
          user_id: string
          workout_details: string | null
          workout_notes: string | null
        }
        Insert: {
          bells?: number[]
          completed_at?: string
          completed_reps: number
          completed_rounds: number
          completed_rungs: number
          id?: number
          interval_timer?: number
          is_one_handed?: boolean | null
          minutes: number
          movements: string[]
          rep_scheme?: number[]
          rest_timer?: number
          rpe?: Database["public"]["Enums"]["RPE"] | null
          started_at: string
          unit?: string | null
          user_id: string
          workout_details?: string | null
          workout_notes?: string | null
        }
        Update: {
          bells?: number[]
          completed_at?: string
          completed_reps?: number
          completed_rounds?: number
          completed_rungs?: number
          id?: number
          interval_timer?: number
          is_one_handed?: boolean | null
          minutes?: number
          movements?: string[]
          rep_scheme?: number[]
          rest_timer?: number
          rpe?: Database["public"]["Enums"]["RPE"] | null
          started_at?: string
          unit?: string | null
          user_id?: string
          workout_details?: string | null
          workout_notes?: string | null
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


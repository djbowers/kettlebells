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
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
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
            isOneToOne: true
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
          minutes: number
          notes: string | null
          reps: number[]
          started_at: string
          tasks: string[]
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
          minutes: number
          notes?: string | null
          reps?: number[]
          started_at: string
          tasks: string[]
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
          minutes?: number
          notes?: string | null
          reps?: number[]
          started_at?: string
          tasks?: string[]
          unit?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workouts: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
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

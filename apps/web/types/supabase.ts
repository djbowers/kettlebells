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
      movement_logs: {
        Row: {
          created_at: string | null
          id: number
          movement_name: string
          rep_scheme: number[]
          user_id: string
          weight_one_unit: Database["public"]["Enums"]["weight_unit"] | null
          weight_one_value: number | null
          weight_two_unit: Database["public"]["Enums"]["weight_unit"] | null
          weight_two_value: number | null
          workout_log_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          movement_name: string
          rep_scheme?: number[]
          user_id: string
          weight_one_unit?: Database["public"]["Enums"]["weight_unit"] | null
          weight_one_value?: number | null
          weight_two_unit?: Database["public"]["Enums"]["weight_unit"] | null
          weight_two_value?: number | null
          workout_log_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          movement_name?: string
          rep_scheme?: number[]
          user_id?: string
          weight_one_unit?: Database["public"]["Enums"]["weight_unit"] | null
          weight_one_value?: number | null
          weight_two_unit?: Database["public"]["Enums"]["weight_unit"] | null
          weight_two_value?: number | null
          workout_log_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "movement_logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movement_logs_workout_log_id_fkey"
            columns: ["workout_log_id"]
            referencedRelation: "workout_logs"
            referencedColumns: ["id"]
          }
        ]
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
      workout_logs: {
        Row: {
          bells: number[]
          completed_at: string
          completed_reps: number
          completed_rounds: number
          completed_rungs: number
          completed_volume: number | null
          id: number
          interval_timer: number
          is_one_handed: boolean | null
          movements: string[]
          rep_scheme: number[]
          rest_timer: number
          rpe: Database["public"]["Enums"]["RPE"] | null
          started_at: string
          unit: string | null
          user_id: string
          workout_details: string | null
          workout_goal: number
          workout_goal_units: Database["public"]["Enums"]["workout_goal_units"]
          workout_notes: string | null
        }
        Insert: {
          bells?: number[]
          completed_at?: string
          completed_reps: number
          completed_rounds: number
          completed_rungs: number
          completed_volume?: number | null
          id?: number
          interval_timer?: number
          is_one_handed?: boolean | null
          movements: string[]
          rep_scheme?: number[]
          rest_timer?: number
          rpe?: Database["public"]["Enums"]["RPE"] | null
          started_at: string
          unit?: string | null
          user_id: string
          workout_details?: string | null
          workout_goal: number
          workout_goal_units?: Database["public"]["Enums"]["workout_goal_units"]
          workout_notes?: string | null
        }
        Update: {
          bells?: number[]
          completed_at?: string
          completed_reps?: number
          completed_rounds?: number
          completed_rungs?: number
          completed_volume?: number | null
          id?: number
          interval_timer?: number
          is_one_handed?: boolean | null
          movements?: string[]
          rep_scheme?: number[]
          rest_timer?: number
          rpe?: Database["public"]["Enums"]["RPE"] | null
          started_at?: string
          unit?: string | null
          user_id?: string
          workout_details?: string | null
          workout_goal?: number
          workout_goal_units?: Database["public"]["Enums"]["workout_goal_units"]
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
      weight_unit: "kilograms" | "pounds"
      workout_goal_units: "minutes" | "rounds"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


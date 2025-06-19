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
      photos: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          image_url: string
          category: string | null
          featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          image_url: string
          category?: string | null
          featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          image_url?: string
          category?: string | null
          featured?: boolean
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          photo_id: string
          name: string
          comment: string
        }
        Insert: {
          id?: string
          created_at?: string
          photo_id: string
          name: string
          comment: string
        }
        Update: {
          id?: string
          created_at?: string
          photo_id?: string
          name?: string
          comment?: string
        }
      }
    }
  }
}
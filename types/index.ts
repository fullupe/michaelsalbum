export interface Photo {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category?: string;
  featured: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  photo_id: string;
  name: string;
  comment: string;
  created_at: string;
}

export interface BannerSlide {
  id: number;
  image_url: string;
  title?: string;
}
export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  featured: boolean;
  created_at: string;
}
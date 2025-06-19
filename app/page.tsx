
"use client"
import { supabase } from "@/lib/supabase";
import Banner from "@/components/home/Banner";
import PhotoGrid from "@/components/home/PhotoGrid";
import { Photo, Video } from "@/types";
import { useEffect, useState } from "react";
import VideoSection from "@/components/home/VideoSection";



const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Wedding Ceremony Highlights 1",
    description: "Beautiful moments from our wedding ceremony.",
    video_url: "https://player.cloudinary.com/embed/?cloud_name=dtho1iv7d&public_id=VIDEO-2025-05-29-11-09-21_ynkpbb&profile=cld-default",
    thumbnail_url: "https://images.pexels.com/photos/1573007/pexels-photo-1573007.jpeg",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Wedding Ceremony Highlights 2",
    description: "Beautiful moments from our wedding ceremony.",
    video_url: "https://player.cloudinary.com/embed/?cloud_name=dtho1iv7d&public_id=VIDEO-2025-05-15-15-29-05_vcmdqd&profile=cld-default",
    thumbnail_url: "https://images.pexels.com/photos/1573007/pexels-photo-1573007.jpeg",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "First Dance",
    description: "Our magical first dance as husband and wife.",
    video_url: "https://player.cloudinary.com/embed/?cloud_name=dtho1iv7d&public_id=VIDEO-2025-05-14-11-04-52_rduhep&profile=cld-default",
    thumbnail_url: "https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Reception Party",
    description: "Fun moments from our wedding reception.",

    video_url: "https://player.cloudinary.com/embed/?cloud_name=dtho1iv7d&public_id=VIDEO-2025-05-10-11-29-46_pz4gxt&profile=cld-default",
    thumbnail_url: "https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg",
    featured: false,
    created_at: new Date().toISOString(),
  },
];



export default  function Home() {



const [videos]=useState<Video[]>(sampleVideos)

  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      // When connected to Supabase, replace with:
      const { data, error } = await supabase
        .from('photos_michael')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching photos:', error);
        return;
      }
      
      setPhotos(data);
    
 
    };
    
    fetchPhotos();
  }, []);



  return (
    <div className="min-h-screen">
      <Banner />
      
      <div className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-cormorant text-4xl font-semibold md:text-5xl">
             Michael & Ephraim   
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thank you for being part of our special day. We're delighted to share these precious 
            memories with you. Explore our wedding album and relive the magical moments with us.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a 
              href="#gallery" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
      
      <PhotoGrid photos={photos} />
      <VideoSection videos={videos} />
    </div>
  );
}
export const revalidate =0; 
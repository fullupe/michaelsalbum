//"use client"
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Photo, Comment } from "@/types";
import PhotoDetail from "@/components/photo/PhotoDetail";
import CommentSection from "@/components/photo/CommentSection";

interface PhotoPageProps {
  params: {
    id: string;
  };
}


async function getPhoto(id: string): Promise<Photo | null> {
  //When connected to Supabase, replace with:
  const { data, error } = await supabase
    .from('photos_michael')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching photo:', error);
    return null;
  }
  
  return data as Photo;
  
  // const photo = samplePhotos.find(photo => photo.id === id);
  // return photo || null;
}

async function getComments(photoId: string): Promise<Comment[]> {
  // When connected to Supabase, replace with:
  const { data, error } = await supabase
    .from('comments_michael')
    .select('*')
    .eq('photo_id', photoId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  
  return data as Comment[];
  
  //return sampleComments.filter(comment => comment.photo_id === photoId);
}

export async function generateStaticParams() {
  // When connected to Supabase, replace with:
  const { data } = await supabase.from('photos_michael').select('id');
  return data?.map((photo) => ({
    id: photo.id,
  })) || [];
  
  // return samplePhotos.map((photo) => ({
  //   id: photo.id,
  // }));
}

export async function generateMetadata({
  params,
}: PhotoPageProps): Promise<Metadata> {
  const photo = await getPhoto(params.id);
  
  if (!photo) {
    return {
      title: "Photo Not Found",
      description: "The requested photo could not be found.",
    };
  }
  
  return {
    title: `${photo.title} | Michael & Ephraim Wedding Album`,
    description: photo.description,
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const photo = await getPhoto(params.id);
  
  if (!photo) {
    notFound();
  }
  
  const comments = await getComments(params.id);
  
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <PhotoDetail photo={photo} />
        
        <hr className="border-border" />
        
        <CommentSection photoId={params.id} initialComments={comments} />
      </div>
    </div>
  );
}

//export const revalidate = 0 ;
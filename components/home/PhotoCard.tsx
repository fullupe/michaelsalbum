

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photo, Comment } from "@/types";
import { getImageUrl } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface PhotoCardProps {
  photo: Photo;
}



export default   function PhotoCard({ photo }: PhotoCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [coments,setComments]=useState<any>(0)


  async function getComments(photoId: string) {
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
    
    //console.log(data.length)
   
  
    return data.length 
    
    
  }




  
   useEffect(()=>{
   //const NumberOfComments  =  ;

   console.log(  getComments(photo.id))

    setComments( getComments(photo.id))

   },[])


  
  return (
    <Link href={`/photos/${photo.id}`}>
      <div className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-[3/4] overflow-hidden">
      
          <Image
            src={getImageUrl(photo.image_url, 600)}
            alt={photo.title}
            fill
            className={cn(
              "object-cover transition-all duration-300 group-hover:scale-105",
              isLoading ? "blur-sm" : "blur-0"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 43vw"
            onLoadingComplete={() => setIsLoading(false)}
          />
           <div className="absolute top-3 left-3 bg-[#566521]/80 text-white py-1 px-3 rounded-full text-xs font-medium">

              <p className="white font-cormorant text-lg font-semibold"> Comnents ({coments})</p>

           </div>
        </div>
        <div className="p-4">
          <h3 className="font-cormorant text-xl font-medium text-card-foreground">
            {photo.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {photo.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
export const revalidate = 0 ;
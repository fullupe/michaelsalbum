"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo } from "@/types";
import { getImageUrl } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface PhotoDetailProps {
  photo: Photo;
}

export default function PhotoDetail({ photo }: PhotoDetailProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg shadow-md">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={getImageUrl(photo.image_url, 1200)}
            alt={photo.title}
            fill
            priority
            className={cn(
              "object-cover",
             " bg-cover",
               //"bg-center",
              isLoading ? "blur-sm" : "blur-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 332vw"
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
      </div>
      
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="font-cormorant text-3xl font-semibold md:text-4xl">
          {photo.title}
        </h1>
        <p className="text-lg text-muted-foreground">{photo.description}</p>
        
        {photo.category && (
          <div className="flex items-center justify-center">
            <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              {photo.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export const revalidate = 0 ;
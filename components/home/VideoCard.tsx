"use client";

import { useState, useRef } from "react";
import { Video } from "@/types";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // const togglePlay = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  const togglePlay = () => {
    console.log('togglePlay called');
    if (videoRef.current) {
      console.log('videoRef.current:', videoRef.current);
      if (isPlaying) {
        console.log('Pausing video');
        videoRef.current.pause();
      } else {
        console.log('Playing video');
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      console.log('isPlaying:', !isPlaying);
    } else {
      console.log('videoRef.current is null');
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <iframe
        allowFullScreen
        //width={100}
          // ref={videoRef}
          src={video.video_url}
          // poster={video.thumbnail_url}
          className="h-full w-[100%] object-cover"
          onEnded={() => setIsPlaying(false)}
        />
        {/* <button
          onClick={togglePlay}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white backdrop-blur-sm transition-all hover:bg-black/70",
            isPlaying ? "opacity-0" : "opacity-100",
            "group-hover:opacity-100"
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button> */}
      </div>
      <div className="p-4">
        <h3 className="font-cormorant text-xl font-medium text-card-foreground">
          {video.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {video.description}
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Video } from "@/types";
import VideoCard from "./VideoCard";

interface VideoSectionProps {
  videos: Video[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  return (
    <section className="container py-16">
      <div className="mb-12 text-center">
        <h2 className="font-cormorant text-3xl font-semibold leading-tight md:text-4xl">
          Wedding Videos
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Watch the magical moments of our special day come to life through these beautiful video memories.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
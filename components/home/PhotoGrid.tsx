import { Photo } from "@/types";
import PhotoCard from "./PhotoCard";

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <section id="gallery" className="container py-16">
      <div className="mb-12 text-center">
        <h2 className="font-cormorant text-3xl font-semibold leading-tight md:text-4xl">
          Our Wedding Gallery
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Browse through the cherished moments from our special day. Each photo tells a part 
          of our story, capturing the joy, love, and celebration we shared with friends and family.
        </p>
      </div>
      
      <div className="photo-grid">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
}
export const revalidate = 0 ;
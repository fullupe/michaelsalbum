"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Photo } from "@/types";
import { getImageUrl } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


export default function PhotoManager() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);
  const { toast } = useToast();
  
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
      
    
    setIsLoading(false);
 
    };
    
    fetchPhotos();
  }, []);
  
  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteClick = (photo: Photo) => {
    setPhotoToDelete(photo);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!photoToDelete) return;
    
    try {
      // When connected to Supabase, replace with:
      const { error } = await supabase
        .from('photos_michael')
        .delete()
        .eq('id', photoToDelete.id);
      
       if (error) throw error;
    
      
      toast({
        title: "Photo deleted",
        description: "The photo has been successfully deleted",
      });
    } catch (error: any) {
      console.error("Error deleting photo:", error);
      toast({
        title: "Delete failed",
        description: error.message || "There was an error deleting the photo",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPhotoToDelete(null);
    }
  };
  
  const toggleFeatured = async (photo: Photo) => {
    try {
      // When connected to Supabase, replace with:
      const { error } = await supabase
        .from('photos')
        .update({ featured: !photo.featured })
        .eq('id', photo.id);
      
      if (error) throw error;
    
      
      toast({
        title: photo.featured ? "Removed from featured" : "Added to featured",
        description: `The photo has been ${
          photo.featured ? "removed from" : "added to"
        } featured photos`,
      });
    } catch (error: any) {
      console.error("Error updating photo:", error);
      toast({
        title: "Update failed",
        description: error.message || "There was an error updating the photo",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search photos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <p>Loading photos...</p>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-md border bg-muted/50">
          <p className="text-muted-foreground">No photos found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex items-center gap-4 rounded-md border bg-card p-4 shadow-sm"
            >
              <img
                src={getImageUrl(photo.image_url, 100)}
                alt={photo.title}
                className="h-16 w-16 rounded-md object-cover"
              />
              
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{photo.title}</h3>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {photo.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={photo.featured ? "default" : "outline"}
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => toggleFeatured(photo)}
                >
                  {photo.featured ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Featured
                    </>
                  ) : (
                    "Feature"
                  )}
                </Button>
                
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDeleteClick(photo)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{photoToDelete?.title}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
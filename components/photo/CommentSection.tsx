"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
  photoId: string;
  initialComments: Comment[];
}

export default function CommentSection({ photoId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // When connected to Supabase, replace with actual API call
      const { data, error } = await supabase
        .from('comments_michael')
        .insert({
          photo_id: photoId,
          name,
          comment
        })
        .select();
      
      if (error) throw error;
      
      // Create a mock response for now
      const newComment: Comment = {
        id: `temp-${Date.now()}`,
        photo_id: photoId,
        name,
        comment,
        created_at: new Date().toISOString(),
      };
      
      getComments();
      //setComments((prev) => [newComment, ...prev]);
      setName("");
      setComment("");

    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  async function getComments() {
    // When connected to Supabase, replace with:
    const { data, error } = await supabase
      .from('comments_michael')
      .select('*')
      .eq("photo_id", photoId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
    
    //return data as Comment[];

    setComments(data)
  }

  useEffect(()=>{

    getComments()

  },[])



  
  return (
    <div className="space-y-8">
      <h3 className="font-cormorant text-2xl font-semibold">Share Your Thoughts</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comment">Your Comment</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this moment..."
            required
            rows={4}
          />
        </div>
        
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
      
      <div className="space-y-6">
        <h3 className="font-cormorant text-2xl font-semibold">
          Comments ({comments.length})
        </h3>
        
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Be the first to share your thoughts about this moment!
          </p>
        )}
      </div>
    </div>
  );
}
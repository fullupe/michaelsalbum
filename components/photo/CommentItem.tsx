import { format } from "date-fns";
import { Comment } from "@/types";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="animate-fade-in rounded-md border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{comment.name}</h4>
        <time className="text-sm text-muted-foreground">
          {format(new Date(comment.created_at), "MMM d, yyyy")}
        </time>
      </div>
      <p className="mt-2 text-card-foreground">{comment.comment}</p>
    </div>
  );
}
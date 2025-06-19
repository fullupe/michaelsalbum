import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-cormorant text-4xl font-semibold mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. The photo you're trying to view may not exist or may have been removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#gallery">
              View Gallery
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
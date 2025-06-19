import Link from 'next/link';
import { ModeToggle } from '../ModeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm transition-all">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="font-cormorant text-2xl font-semibold tracking-tight transition-colors hover:text-foreground/80"
          >
            Michael & Ephraim
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            Home
          </Link>
          <Link 
            href="#gallery" 
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            Gallery
          </Link>
          {/* <Link 
            href="/admin" 
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            Admin
          </Link> */}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
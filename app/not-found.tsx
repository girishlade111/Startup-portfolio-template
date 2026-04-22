import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-9xl font-display font-bold gradient-text">404</h1>
        <p className="text-2xl mt-4 text-muted-foreground">Page not found</p>
        <p className="text-sm mt-2 text-muted-foreground/60">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
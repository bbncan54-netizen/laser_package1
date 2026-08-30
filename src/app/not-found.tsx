import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-3xl text-primary sm:text-4xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button href="/" variant="primary" className="mt-8">
        Back to Home
      </Button>
    </section>
  );
}

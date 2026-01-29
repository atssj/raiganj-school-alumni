import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight">
          Raiganj School Alumni
        </h1>
        <p className="text-muted-foreground max-w-md">
          Welcome to the Raiganj School alumni community. Connect with fellow
          alumni, share memories, and stay updated on events.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Raiganj School Alumni Association
        </p>
      </footer>
    </div>
  );
}

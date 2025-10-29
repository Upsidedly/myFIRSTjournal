import { HomeLayout } from "fumadocs-ui/layouts/home";
import Link from "next/link";
import { baseOptions } from "./layout.config";

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions}>
      <main className="flex flex-1 flex-col justify-center text-center items-center">
        <h1 className="!font-sans !normal-case text-2xl lg:text-8xl !font-normal -mb-2">
          404
        </h1>
        <h2 className="mb-4 !font-sans !normal-case text-2xl lg:text-4xl font-normal mt-5 text-balance">
          Only <span className="font-serif italic text-muted-foreground">cobwebs</span> here — This page was not found.
        </h2>
        <Link
          className="rounded-lg font-normal text-xl border border-muted-foreground/30 w-max px-8 py-1 hover:cursor-pointer transition-colors hover:bg-muted/60"
          href="/"
        >
          Go back home
        </Link>
      </main>
    </HomeLayout>
  );
}

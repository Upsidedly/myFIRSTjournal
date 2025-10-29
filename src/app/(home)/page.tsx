import Footer from "@/components/footer";
import { Wordmark } from "@/components/wordmark";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center items-center">
      {/* <Image src={'/robot.png'} width={800} height={700} alt="robot" className="fixed -z-10 lg:-left-[10vw] lg:-bottom-[20vh] lg:rotate-35 dark:invert lg:opacity-10 lg:w-[50vw] -left-[30%] -bottom-[20vh] top-[20vh] rotate-45 lg:rotate-35 dark:invert opacity-10 w-[50vh]" /> */}
      <Wordmark className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl" />
      <h1 className="mb-4 text-balance !font-sans !normal-case text-2xl lg:text-4xl font-light mt-5">
        Tips, tricks and info for <em className="font-light">FIRST</em>{" "}
        programming
      </h1>
      <Link
        className="rounded-lg font-thin text-xl border border-muted-foreground/30 w-max px-8 py-1 hover:cursor-pointer transition-colors hover:bg-muted/60"
        href="/docs"
      >
        Go!
      </Link>
      <Footer />
    </main>
  );
}

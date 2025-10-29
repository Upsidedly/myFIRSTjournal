import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/utils";
import ToBeAdded from "@/components/tba";
import { Card, Cards } from "fumadocs-ui/components/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SeeMain } from "@/components/see-main";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>
        {!params.slug ? (
          <>
            What is <Wordmark className="inline mr-0.5" />?
          </>
        ) : (
          page.data.title
        )}
      </DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            Wordmark: ({ className }: { className?: string }) => (
              <Wordmark className={cn("inline", className)} />
            ),
            TBA: ToBeAdded,
            LinkedCards: ({
              className,
              data,
            }: {
              className?: string;
              data: { title?: string; description: string; href: string }[];
            }) => (
              <Cards className={className}>
                {data.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    href={card.href}
                  />
                ))}
              </Cards>
            ),
            SeeMain: SeeMain
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

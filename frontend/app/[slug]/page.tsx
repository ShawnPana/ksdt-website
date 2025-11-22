import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { GetPageQueryResult } from "@/sanity.types";
import  NotFound  from "../global-not-found"
// import { notFound } from "next/navigation";

/**
 * From what I can tell, this file handles weird runtime rendering 
 * things. 
 */

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getPageQuery, params }),
  ]);

  /**
   * Handles 404
   */
  if (page == null) {
  // From what I saw this is the correct not hacky implementation
  // but when ran from my machine it does not properly link to
  // dedicated not-found.tsx file
  // https://nextjs.org/docs/app/api-reference/functions/not-found
    // notFound();
    // This is the hacky implementation of new 404 page
    // TODO: Stylize 404 page to actually not be awful looking lol
    return (
      <NotFound/>
    );
  }

  
  return (
    <div className="pt-30 pb-12 lg:pb-24">
      <Head>
        <title>{page.heading}</title>
      </Head>
      {/* Conditionally hide header for about page */}
      {params.slug !== 'about' && (
        <div className="">
          <div className="container">
            <div className="pb-6 border-b border-gray-100">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                  {page.heading}
                </h2>
                <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                  {page.subheading}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";
import { AllPostsQueryResult } from "@/sanity.types";
import ClientMobileWrapper from "./components/ClientMobileWrapper";

import './globals.css';

export default async function Page() {
  const { data: posts } = await sanityFetch({ query: allPostsQuery });

  const featuredPosts = posts?.slice(0, 3) || [];
  const remainingPosts = posts?.slice(3) || [];
  const allPosts = posts || [];

  return (
    <>
      {/* Mobile Swipe View - Only visible on mobile */}
      <div className="block md:hidden">
        <ClientMobileWrapper posts={allPosts} />
      </div>

      {/* Desktop View - Hidden on mobile */}
      <main className="hidden md:block bg-white min-h-screen">
      {/* Hero Section - The Face Style */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Featured Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Main Feature Article */}
            {featuredPosts[0] && (
              <div className="lg:col-span-2">
                <Link href={`/posts/${featuredPosts[0].slug}`} className="group block">
                  <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                    {featuredPosts[0].coverImage?.asset?._ref ? (
                      <Image
                        src={urlForImage(featuredPosts[0].coverImage)?.url() as string}
                        alt={featuredPosts[0].title || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <div className="mb-4">
                        <svg width="90" height="24" className="inline-block">
                          <rect width="100%" height="100%" fill="#bc2026" rx="3" />
                          <text x="45" y="15.5" textAnchor="middle"
                                fontSize="11" fontWeight="bold" fill="white" letterSpacing="0.5px"
                                // fontFamily="var(--font-alte-haas-grotesk), Arial, sans-serif">
                                fontFamily="var(--font-barlow), Arial, sans-serif">
                            FEATURED
                          </text>
                        </svg>
                      </div>
                      <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
                        {featuredPosts[0].title}
                      </h1>
                      {featuredPosts[0].excerpt && (
                        <p className="text-lg text-gray-200 leading-relaxed max-w-2xl">
                          {featuredPosts[0].excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Side Articles */}
            <div className="space-y-8">
              {featuredPosts.slice(1, 3).map((post) => (
                <Link key={post._id} href={`/posts/${post.slug}`} className="group block">
                  <div className="relative h-[280px] overflow-hidden">
                    {post.coverImage?.asset?._ref ? (
                      <Image
                        src={urlForImage(post.coverImage)?.url() as string}
                        alt={post.title || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="mb-3">
                        <svg width="75" height="20" className="inline-block">
                          <rect width="100%" height="100%" fill="#bc2026" rx="2" />
                          <text x="37.5" y="13" textAnchor="middle"
                                fontSize="9" fontWeight="bold" fill="white" letterSpacing="0.5px"
                                // fontFamily="var(--font-alte-haas-grotesk), Arial, sans-serif">
                                fontFamily="var(--font-barlow), Arial, sans-serif">
                            FEATURED
                          </text>
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold leading-tight">
                        {post.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

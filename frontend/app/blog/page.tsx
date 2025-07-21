import { Metadata } from 'next'
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";
import PostGrid from './components/PostGrid';

export const metadata: Metadata = {
  title: 'Blog | KSDT Radio',
  description: 'Explore all blog posts and articles from KSDT Radio',
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: allPostsQuery });

  return (
    <main className="bg-white min-h-screen">
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-black text-black mb-4">
              Blog
            </h1>
          </div>
          
          <PostGrid posts={posts || []} />
        </div>
      </div>
    </main>
  );
}
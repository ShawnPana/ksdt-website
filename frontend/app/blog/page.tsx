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
    <div className="bg-white min-h-screen">
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <PostGrid posts={posts || []} />
        </div>
      </div>
    </div>
  );
}
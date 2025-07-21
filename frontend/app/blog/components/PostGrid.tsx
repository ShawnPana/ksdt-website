import { AllPostsQueryResult } from "@/sanity.types";
import PostCard from './PostCard';

interface PostGridProps {
  posts: AllPostsQueryResult;
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
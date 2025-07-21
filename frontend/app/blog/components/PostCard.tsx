import Link from "next/link";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { AllPostsQueryResult } from "@/sanity.types";

interface PostCardProps {
  post: NonNullable<AllPostsQueryResult>[0];
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="w-full">
        {/* Image Container - Fixed aspect ratio */}
        <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-gray-100">
          {post.coverImage?.asset?._ref ? (
            <Image
              src={urlForImage(post.coverImage)?.url() as string}
              alt={post.title || ""}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-medium">No Image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-black leading-tight group-hover:text-red-500 transition-colors duration-200 line-clamp-3">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
            {post.author && (
              <span className="font-medium">
                {post.author.firstName} {post.author.lastName}
              </span>
            )}
            {formattedDate && (
              <time dateTime={post.date}>{formattedDate}</time>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
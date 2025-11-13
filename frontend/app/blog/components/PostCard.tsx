import Link from "next/link";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { AllPostsQueryResult } from "@/sanity.types";

interface PostCardProps {
  post: NonNullable<AllPostsQueryResult>[0];
  isFeatured?: boolean;
}

export default function PostCard({ post, isFeatured = false }: PostCardProps) {
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        {/* YouTube-style Thumbnail */}
        <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {post.coverImage?.asset?._ref ? (
            <Image
              src={urlForImage(post.coverImage)?.url() as string}
              alt={post.title || ""}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
              sizes="160px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs font-medium">No Image</span>
            </div>
          )}
          
          {/* Featured Tag */}
          {isFeatured && (
            <div className="absolute top-2 left-2">
              <svg width="65" height="18" className="inline-block">
                <rect width="100%" height="100%" fill="#bc2026" rx="2" />
                <text x="32.5" y="11.5" textAnchor="middle"
                      fontSize="8" fontWeight="bold" fill="white" letterSpacing="0.3px"
                      // fontFamily="var(--font-alte-haas-grotesk), Arial, sans-serif">
                      fontFamily="var(--font-barlow), Arial, sans-serif">
                  FEATURED
                </text>
              </svg>
            </div>
          )}
        </div>

        {/* YouTube-style Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-black leading-tight group-hover:text-red-500 transition-colors duration-200 line-clamp-2 mb-2">
            {post.title}
          </h2>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            {post.author && (
              <span className="font-medium">
                {post.author.firstName} {post.author.lastName}
              </span>
            )}
            {formattedDate && (
              <>
                <span>•</span>
                <time dateTime={post.date}>{formattedDate}</time>
              </>
            )}
          </div>
          
          {post.excerpt && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
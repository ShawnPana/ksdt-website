"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Image as SanityImage } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { AllPostsQueryResult } from "@/sanity.types";
import { navItems } from "@/lib/navigation";

type Post = NonNullable<AllPostsQueryResult>[0];

interface MobileSwipeViewProps {
  posts: Post[];
}

export default function MobileSwipeView({ posts }: MobileSwipeViewProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!posts.length) return null;

  // Render a single post
  const renderPost = (post: Post, index: number) => {
    const isFeatured = index < 3; // First 3 posts are featured
    
    return (
      <div 
        key={`${post._id}-${index}`} 
        className="w-full h-screen flex-none snap-start snap-always"
        style={{ scrollSnapAlign: 'start' }}
      >
        <Link href={`/posts/${post.slug}`} className="block w-full h-full">
          <div className="relative w-full h-full">
            {/* Background Image */}
            {post.coverImage?.asset?._ref ? (
              <SanityImage
                src={urlForImage(post.coverImage)?.url() as string}
                alt={post.title || ""}
                fill
                className="object-cover"
                priority={index <= 2}
              />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-xl font-bold">No Image</span>
              </div>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {/* Featured Badge */}
              {isFeatured && (
                <div className="mb-4">
                  <svg width="90" height="24" className="inline-block">
                    <defs>
                      <mask id={`textMask-${index}`}>
                        <rect width="100%" height="100%" fill="white" />
                        <text x="45" y="15.5" textAnchor="middle" 
                              fontSize="11" fontWeight="bold" fill="black" letterSpacing="0.5px"
                              fontFamily="var(--font-alte-haas-grotesk), Arial, sans-serif">
                          FEATURED
                        </text>
                      </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="#bc2026" rx="3" mask={`url(#textMask-${index})`} />
                  </svg>
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-4">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-base text-gray-200 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              
              {/* Author */}
              {post.author && (
                <div className="text-sm text-gray-300">
                  By {post.author.firstName} {post.author.lastName}
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50">
      {/* Mobile Header - Transparent for homepage */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/40 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            {/* Logo - Same as desktop */}
            <Link className="flex items-center hover:opacity-70 transition-opacity" href="/">
              <Image
                src="/images/ksdt-logo-1.png"
                alt="KSDT Radio"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Mobile Menu Button - White for transparent background */}
            <button 
              className="flex items-center justify-center w-10 h-10 relative z-50"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div className="space-y-1">
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu - Same as desktop */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <nav className="py-4 space-y-4 border-t border-gray-100 bg-white/95">
              {navItems.map((item) => (
                item.disabled ? (
                  <span 
                    key={item.label}
                    className="block text-sm font-medium uppercase tracking-wide text-gray-400 cursor-not-allowed px-4 py-2"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    key={item.label}
                    href={item.href} 
                    className="block text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Scroll Container with CSS Scroll Snap */}
      <div
        ref={scrollContainerRef}
        className="mobile-scroll-container h-full w-full overflow-y-scroll overflow-x-hidden pt-20"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'none',
        }}
      >
        {/* Render all posts in a scrollable container */}
        {posts.map((post, index) => renderPost(post, index))}
      </div>
    </div>
  );
}
"use client";

import { AllPostsQueryResult } from "@/sanity.types";
import MobileSwipeView from "./MobileSwipeView";

type Post = NonNullable<AllPostsQueryResult>[0];

interface ClientMobileWrapperProps {
  posts: Post[];
}

export default function ClientMobileWrapper({ posts }: ClientMobileWrapperProps) {
  return <MobileSwipeView posts={posts} />;
}
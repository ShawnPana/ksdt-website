import { Suspense } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { AllPosts } from "@/app/components/Posts";
import GetStartedCode from "@/app/components/GetStartedCode";
import SideBySideIcons from "@/app/components/SideBySideIcons";
import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          {/* Logo - The Face Style */}
          <Link className="flex items-center" href="/">
            <span className="text-3xl font-black tracking-tight hover:opacity-70 transition-opacity">
              {settings?.title || "KSDT"}
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/music" className="text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity">
              Music
            </Link>
            <Link href="/culture" className="text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity">
              Culture
            </Link>
            <Link href="/style" className="text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity">
              Style
            </Link>
            <Link href="/about" className="text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity">
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center justify-center w-10 h-10">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

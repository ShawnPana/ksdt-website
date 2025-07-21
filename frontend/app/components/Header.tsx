import Link from "next/link";
import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { navItems } from "@/lib/navigation";

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
            {navItems.map((item) => (
              item.disabled ? (
                <span 
                  key={item.label}
                  className="text-sm font-medium uppercase tracking-wide text-gray-400 cursor-not-allowed"
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  key={item.label}
                  href={item.href} 
                  className="text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </Link>
              )
            ))}
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

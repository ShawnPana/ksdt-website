"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link className="flex items-center hover:opacity-70 transition-opacity" href="/">
            <Image
              // src="/images/ksdt-logo-1.png"
              src="/images/logo_updated_black.png"
              alt="KSDT Radio"
              width={200}
              height={200}
              // below h-x is lever to control size of header
              // Currently hard-coded, a more capable person should make it not hard coded
              className="h-20 w-auto"
              priority
            />
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
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 relative z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="space-y-1">
              <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
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
    </header>
  );
}

export interface NavItem {
  href: string;
  label: string;
  disabled: boolean;
}

export const navItems: NavItem[] = [
  { href: "/music", label: "Music", disabled: false },
  { href: "/blog", label: "Blog", disabled: false },
  { href: "/sports", label: "Sports", disabled: false },
  { href: "/booking", label: "Booking", disabled: true },
  { href: "/about", label: "About", disabled: false },
];

// Helper function to check if a route is disabled
export function isRouteDisabled(pathname: string): boolean {
  // Normalize pathname - remove trailing slashes and convert to lowercase
  const normalizedPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  // Check if any disabled route matches the pathname
  return navItems.some(item => 
    item.disabled && (
      item.href.toLowerCase() === normalizedPath ||
      normalizedPath.startsWith(item.href.toLowerCase() + '/')
    )
  );
}

// Get all disabled routes (useful for middleware)
export function getDisabledRoutes(): string[] {
  return navItems
    .filter(item => item.disabled)
    .map(item => item.href);
}
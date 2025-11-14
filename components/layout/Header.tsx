'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, BarChart3, Newspaper } from 'lucide-react';

const navItems = [
  { name: 'Investing', href: '/', icon: TrendingUp },
  { name: 'Prices', href: '/prices', icon: BarChart3 },
  { name: 'News', href: '/news', icon: Newspaper },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-rh-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-rh-green rounded-md flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-semibold tracking-tight">CryptoHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-rh-text-secondary hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile indicator */}
          <div className="md:hidden text-xs text-rh-text-secondary">
            Menu
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-rh-border">
        <nav className="flex items-center justify-around px-4 py-3 bg-black">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-white' : 'text-rh-text-secondary'
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

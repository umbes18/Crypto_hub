'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Newspaper, BarChart3, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: TrendingUp },
  { name: 'Prices', href: '/prices', icon: BarChart3 },
  { name: 'News', href: '/news', icon: Newspaper },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-robinhood-light-gray bg-robinhood-dark/95 backdrop-blur supports-[backdrop-filter]:bg-robinhood-dark/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-robinhood-green" />
            <span className="text-xl font-bold text-gradient">CryptoHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium transition-colors hover:text-robinhood-green',
                    isActive ? 'text-robinhood-green' : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-robinhood-light-gray px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search crypto..."
              className="bg-transparent border-none outline-none w-40 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden items-center justify-around border-t border-robinhood-light-gray px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 text-xs font-medium transition-colors',
                isActive ? 'text-robinhood-green' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

'use client';
import Link from 'next/link';
import { Raleway, Great_Vibes } from 'next/font/google';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

const heading = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    };

    checkAdminStatus();
    window.addEventListener('storage', checkAdminStatus);
    
    const handleLogout = () => {
      setIsAdmin(false);
    };
    window.addEventListener('adminLogout', handleLogout);

    return () => {
      window.removeEventListener('storage', checkAdminStatus);
      window.removeEventListener('adminLogout', handleLogout);
    };
  }, [pathname]);

  return (
    <header className="py-6 px-8 font-bold flex justify-between items-center">
      <Link href="/" className="font-bold text-4xl">
        <AnimatedGradientText className={heading.className}>
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-3xl md:text-4xl`,
            )}
          >
            Delicious Recipes
          </span>
        </AnimatedGradientText>
      </Link>
      <nav className={`${body.className} space-x-6`}>
        <Link href="/" className="text-gray-800 dark:text-gray-100 hover:text-gray-600 transition-colors">Home</Link>
        {isAdmin ? (
          <Link href="/admin/dashboard" className="text-gray-800 dark:text-gray-100 hover:text-gray-600 transition-colors">Dashboard</Link>
        ) : (
          <Link href="/admin/login" className="text-gray-800 dark:text-gray-100 hover:text-gray-600 transition-colors">Admin</Link>
        )}
        <Link href="/about" className="text-gray-800 dark:text-gray-100 hover:text-gray-600 transition-colors">About</Link>
      </nav>
    </header>
  );
} 
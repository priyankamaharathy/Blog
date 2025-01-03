'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Great_Vibes, Raleway } from 'next/font/google';

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('isAdmin', 'true');
      window.dispatchEvent(new Event('adminLogin'));
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-16 px-8 flex items-center justify-center">
        <div className="bg-[#F0E7E5]/40 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className={`${body.className} text-3xl text-center mb-8 animate-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent bg-300%`}
              style={{ animation: 'gradient 8s linear infinite' }}>
            Admin Login
          </h1>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className={`${body.className} block text-gray-800 mb-2`}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              /></div>
            <button
              type="submit"
              className={`${body.className} w-full py-3 rounded-md border-2 border-gray-300 hover:bg-gray-300 text-gray-800
                transition-all duration-300`}>Login
            </button>
          </form>
         </div>
        </main>
          <footer className="py-6 border-t">
            <div className="max-w-6xl mx-auto px-4 text-center text-gray-900">
              <p className={body.className}>©2024 Delicious Recipes. All rights reserved.</p>
            </div>
          </footer>
    </div>
  );
} 
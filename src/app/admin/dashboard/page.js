'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Raleway } from 'next/font/google';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function AdminDashboard() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = sessionStorage.getItem('isAdmin');
    if (!adminStatus) {
      router.push('/admin/login');
    } else {
      setIsAdmin(true);
      loadRecipes();
    }

    const handleStorageChange = () => {
      loadRecipes();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router]);

  const loadRecipes = () => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    window.dispatchEvent(new Event('adminLogout'));
    router.push('/');
  };

  if (!isAdmin) return null;
  return (
    <div>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex justify-end mb-16 space-x-4">
            <Link
              href="/recipes/upload"
              className={`${body.className} px-4 py-2 border-2 font-bold border-gray-400 text-black rounded-lg hover:bg-gray-300 rounded-md transition-all duration-300`}
            >Upload Recipe
            </Link>
            <button
              onClick={handleLogout}
              className={`${body.className} px-4 py-2 border-2 font-bold border-gray-400 text-black rounded-lg hover:bg-gray-300 rounded-md transition-all duration-300`}
            >Logout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeCard 
                  {...recipe} 
                  onDelete={handleDeleteRecipe}
                  isAdminView={true}
                /></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
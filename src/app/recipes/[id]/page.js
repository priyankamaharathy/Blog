'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Raleway } from 'next/font/google';

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});
export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const foundRecipe = recipes.find(r => r.id.toString() === id);
    setRecipe(foundRecipe);
  }, [id]);
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className={`${body.className} text-xl text-gray-600`}>Recipe not found</p>
      </div>
    );
  }
  return (
    <main className="flex-grow py-16 px-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96 w-full">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`${body.className} p-8`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-gray-700">
                  {recipe.ingredients}
                </pre>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-gray-700">
                  {recipe.instructions}
                </pre>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className={`${body.className} px-6 py-2 border-2 border-gray-400 text-black font-bold rounded-md hover:bg-gray-400`}
            >Back to Recipes</Link>
          </div>
        </div>
      </div>
    </main>
  );
} 
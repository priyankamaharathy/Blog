'use client';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Raleway, Great_Vibes } from 'next/font/google';
import RecipeCard from '../components/RecipeCard';
import FeaturedRecipeCard from '../components/FeaturedRecipeCard';
import LongRecipeCard from '../components/LongRecipeCard';
import { useEffect, useState } from 'react';
import { FaHeart, FaUtensils, FaClock, FaUsers } from 'react-icons/fa';

const great_vibes = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
   loadRecipes();
    window.addEventListener('storage', loadRecipes);
    return () => {
      window.removeEventListener('storage', loadRecipes);
    };
  }, []);
  const loadRecipes = () => {
    try {
      const storedRecipes = localStorage.getItem('recipes');
      if (storedRecipes) {
        const parsedRecipes = JSON.parse(storedRecipes);
        setRecipes(parsedRecipes);
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };
  useEffect(() => {
    const handleRecipeChange = () => {
      loadRecipes();
    };

    window.addEventListener('recipeAdded', handleRecipeChange);
    window.addEventListener('recipeDeleted', handleRecipeChange);
    
    return () => {
      window.removeEventListener('recipeAdded', handleRecipeChange);
      window.removeEventListener('recipeDeleted', handleRecipeChange);
    };
  }, []);

  const featuredRecipe = recipes[0];
  const topThreeRecipes = recipes.slice(1, 4);
  const remainingRecipes = recipes.slice(4);
  const longRecipe = recipes[4]; 
  
return (
    <main className="flex-grow">
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h1 className={`${body.className} text-4xl md:text-5xl text-center mb-16 text-gray-800`}>
          Latest Recipes
        </h1>
        {featuredRecipe && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/recipes/${featuredRecipe.id}`}>
              <FeaturedRecipeCard {...featuredRecipe} />
            </Link>
          </motion.div>
        )}
        {topThreeRecipes.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {topThreeRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <RecipeCard {...recipe} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        {longRecipe && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/recipes/${longRecipe.id}`}>
              <LongRecipeCard {...longRecipe} />
            </Link>
          </motion.div>
        )}
        {remainingRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className={`${body.className} text-3xl text-center mb-12 text-gray-800`}>
              More Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {remainingRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link href={`/recipes/${recipe.id}`}>
                    <RecipeCard {...recipe} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {recipes.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className={`${body.className} text-gray-600 text-lg`}>
              No recipes yet. Start by adding your first recipe!
            </p>
          </motion.div>
        )}
        <section className="relative py-32 mt-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2026&auto=format&fit=crop"
              alt="Cooking background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`${great_vibes.className} text-5xl md:text-6xl mb-6 text-gray-800`}>
                Cooking with Love
              </h2>
              <p className={`${body.className} text-lg md:text-xl text-gray-600 mb-12 leading-relaxed`}>
                Every recipe tells a story, every meal creates a memory. Join us in celebrating the joy of cooking and sharing delicious moments with loved ones.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <FaUtensils className="text-3xl text-gray-800 mb-4" />
                  <span className="block text-xl font-semibold text-gray-800 mb-2">
                    Fresh Recipes
                  </span>
                  <span className={`${body.className} text-gray-600 text-sm`}>
                    Discover new flavors daily
                  </span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <FaClock className="text-3xl text-gray-800 mb-4" />
                  <span className="block text-xl font-semibold text-gray-800 mb-2">
                    Easy to Make
                  </span>
                  <span className={`${body.className} text-gray-600 text-sm`}>
                    Step by step guidance
                  </span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <FaHeart className="text-3xl text-gray-800 mb-4" />
                  <span className="block text-xl font-semibold text-gray-800 mb-2">
                    Made with Love
                  </span>
                  <span className={`${body.className} text-gray-600 text-sm`}>
                    Share the joy of cooking
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="bg-white py-8 border-t mt-16">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <motion.p 
              className={`${body.className} text-gray-600`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              ©2024 Delicious Recipes. All rights reserved.
            </motion.p>
          </div>
        </footer>
      </section>
    </main>
  );
}

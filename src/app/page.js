'use client';
import Link from 'next/link';
import { Raleway, Great_Vibes } from 'next/font/google';
import RecipeCard from '../components/RecipeCard';
import FeaturedRecipeCard from '../components/FeaturedRecipeCard';
import LongRecipeCard from '../components/LongRecipeCard';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }

    const handleStorageChange = () => {
      const updatedRecipes = localStorage.getItem('recipes');
      if (updatedRecipes) {
        setRecipes(JSON.parse(updatedRecipes));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const featuredRecipe = recipes[0];
  const topThreeRecipes = recipes.slice(1, 4);
  const remainingRecipes = recipes.slice(4);
  const groupedRecipes = remainingRecipes.reduce((acc, recipe, index) => {
  const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(recipe);
    return acc;
  }, []);

  return (
    <motion.main 
      className="flex-grow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <section className="max-w-7xl mx-auto px-8 py-16">
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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={container}
          initial="hidden"
          animate="show">
          {topThreeRecipes.map((recipe) => (
            <motion.div key={recipe.id} variants={item}>
              <Link href={`/recipes/${recipe.id}`}>
                <RecipeCard {...recipe} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {remainingRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <motion.h2 
              className={`${body.className} text-3xl text-center mb-12 text-gray-800`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              More Recipes
            </motion.h2>
            {groupedRecipes.map((group, groupIndex) => (
              <motion.div 
                key={groupIndex} 
                className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                animate="show">
                {group.map((recipe, index) => (
                  <motion.div key={recipe.id} variants={item}>
                    <Link href={`/recipes/${recipe.id}`}>
                      {index === 1 ? (
                        <LongRecipeCard {...recipe} />
                      ) : (
                        <RecipeCard {...recipe} />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.section 
          className="relative py-24 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/cooking-bg.jpg" 
              alt="Cooking background"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center px-8">
            <h2 className={`${great_vibes.className} text-2xl md:text-4xl mb-6 animate-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent bg-300% animate-gradient`}
            style={{
              animation: 'gradient 8s linear infinite'
            }}>
              Cooking with Love
            </h2>
            <p className={`${body.className} text-sm md:text-md text-gray-600 mb-8 leading-relaxed`}>
              Every recipe tells a story, every meal creates a memory. Join us in celebrating the joy of cooking and sharing delicious moments with loved ones.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm w-full md:w-1/3">
                <span className="block text-2xl font-bold text-gray-800 mb-2">
                  {recipes.length}+
                </span>
                <span className={`${body.className} text-gray-600`}>
                  Delicious Recipes
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm w-full md:w-1/3">
                <span className="block text-2xl font-bold text-gray-800 mb-2">
                  24/7
                </span>
                <span className={`${body.className} text-gray-600`}>
                  Cooking Inspiration
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm w-full md:w-1/3">
                <span className="block text-2xl font-bold text-gray-800 mb-2">
                  ∞
                </span>
                <span className={`${body.className} text-gray-600`}>
                  Happy Moments
                </span>
              </div>
            </div>
          </div>
        </motion.section>
        <footer className="bg-white py-8 border-t">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <p className={`${body.className} text-gray-600`}>
              ©2024 Delicious Recipes. All rights reserved.
            </p>
          </div>
        </footer>
      </section>
    </motion.main>
  );
}

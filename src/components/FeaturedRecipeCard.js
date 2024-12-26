'use client';
import { Raleway } from 'next/font/google';
import { motion } from "framer-motion";

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function FeaturedRecipeCard({ title, image }) {
  return (
    <motion.div 
      className="group relative transition-transform duration-300"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden">
        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div className={`${body.className} p-8 flex flex-col justify-center`}>
          
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {title}
          </h2>
        <div className="text-gray-600">
           
          </div>
          <div className="mt-8">
            <span className="inline-block px-6 py-2 border-2 border-gray-500 hover:bg-gray-300 text-black font-bold rounded-md transition-all duration-300">
              View Recipe
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 
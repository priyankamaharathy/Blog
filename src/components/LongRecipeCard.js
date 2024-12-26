'use client';
import { Raleway } from 'next/font/google';
import { motion } from "framer-motion";

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function LongRecipeCard({ title, image }) {
  return (
    <motion.div 
      className="group relative h-full"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col h-full">
        <div className="relative h-[400px] w-full overflow-hidden">
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
        <div className={`${body.className} pt-4 flex-grow`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h3>
        
        </div>
      </div>
    </motion.div>
  );
} 
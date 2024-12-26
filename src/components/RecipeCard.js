'use client';
import { Raleway } from 'next/font/google';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from "framer-motion";

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function RecipeCard({ id, title, image, onDelete, isAdminView = false }) {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      onDelete(id);
    }
  };

  return (
    <motion.div 
      className="group relative transition-transform duration-300 hover:-translate-y-1"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {isAdminView && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Link
            href={`/recipes/edit/${id}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
            aria-label="Edit recipe"
          >
            <FaEdit size={16} />
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            aria-label="Delete recipe"
          >
            <FaTrash size={16} />
          </button>
        </div>
      )}
      <div className="relative h-48 w-full overflow-hidden">
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
      <div className={`${body.className} pt-4`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>
      </div>
    </motion.div>
  );
} 
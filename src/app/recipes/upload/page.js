'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import { motion } from "framer-motion";

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function UploadRecipe() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const adminStatus = sessionStorage.getItem('isAdmin');
    if (!adminStatus) {
      router.push('/admin/login');
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  try {
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
      const newRecipe = {
        ...formData,
        id: Date.now(),
        image: preview
      };
      const updatedRecipes = [newRecipe, ...recipes];
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('recipeAdded'));
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error uploading recipe:', error);
      alert('Failed to upload recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isAdmin) return null;
  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="py-16 px-8">
        <motion.div 
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="p-8 border-b"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className={`${body.className} text-3xl font-semibold text-gray-800`}>
              Create New Recipe
            </h1>
            <p className={`${body.className} text-gray-600 mt-2`}>
              Fill in the details below to create a new recipe
            </p>
          </motion.div>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Recipe preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">Recipe Image Preview</span>
                    </div>
                  )}
                </div>
              </motion.div>
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    placeholder="Enter recipe title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                    Ingredients
                  </label>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all min-h-[120px]"
                    placeholder="Enter ingredients (one per line)"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                    Instructions
                  </label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all min-h-[120px]"
                    placeholder="Enter cooking instructions"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipe Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <Link
                    href="/admin/dashboard"
                    className="px-6 py-2 border-2 border-gray-400 text-black rounded-lg hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 border-2 border-gray-400 text-black rounded-lg hover:bg-gray-300 transition-all duration-300"
                  >
                    {isSubmitting ? 'Uploading...' : 'Upload Recipe'}
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
} 
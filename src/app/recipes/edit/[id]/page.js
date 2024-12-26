'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Raleway } from 'next/font/google';
import Link from 'next/link';

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function EditRecipe() {
  const router = useRouter();
  const params = useParams();
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
    const adminStatus = localStorage.getItem('isAdmin');
    if (!adminStatus) {
      router.push('/admin/login');
    } else {
      setIsAdmin(true);
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
      const recipe = recipes.find(r => r.id.toString() === params.id);
      if (recipe) {
        setFormData(recipe);
        setPreview(recipe.image);
      }
    }
  }, [router, params.id]);

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
      const updatedRecipes = recipes.map(recipe => 
        recipe.id.toString() === params.id ? { ...formData, id: recipe.id } : recipe
      );
      
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      window.dispatchEvent(new Event('storage'));
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="relative h-64 w-full overflow-hidden rounded-lg">
              {preview ? (
                <img
                  src={preview}
                  alt="Recipe preview"
                  className="w-full h-full object-cover"
                />) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Recipe Image Preview</span>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className={`${body.className} block text-gray-700 mb-2`}>
                  Recipe Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
            <div>
                <label htmlFor="ingredients" className={`${body.className} block text-gray-700 mb-2`}>
                  Ingredients
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[100px]"
                  required
                />
              </div>
            <div>
                <label htmlFor="instructions" className={`${body.className} block text-gray-700 mb-2`}>
                  Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[100px]"
                  required
                />
            </div>
            <div>
                <label htmlFor="image" className={`${body.className} block text-gray-700 mb-2`}>
                  Recipe Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <Link
                  href="/admin/dashboard"
                  className={`${body.className} px-6 py-2 border-2 border-gray-400 hover:bg-gray-300 text-black font-bold rounded-md`}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${body.className} px-6 py-2 border-2 border-gray-400 hover:bg-gray-300 rounded-md text-black font-bold`}
                >
                  {isSubmitting ? 'Updating...' : 'Update Recipe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 
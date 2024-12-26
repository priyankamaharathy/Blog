import { NextResponse } from 'next/server';

const getStoredRecipes = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('recipes');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};
const saveRecipes = (recipes) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }
};
export async function GET() {
  const recipes = getStoredRecipes();
  return NextResponse.json(recipes);
}
export async function DELETE(request) {
  const { id } = await request.json();
  const recipes = getStoredRecipes();
  const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
  saveRecipes(updatedRecipes);
  return NextResponse.json({ success: true });
}
export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get('title');
  const ingredients = formData.get('ingredients');
  const instructions = formData.get('instructions');
  const cookingTime = formData.get('cookingTime');
  const imageFile = formData.get('image');
  const imageBuffer = await imageFile.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString('base64');
  const imageType = imageFile.type;
  const imageUrl = `data:${imageType};base64,${imageBase64}`;
  const newRecipe = {
    id: Date.now(),
    title,
    ingredients,
    instructions,
    cookingTime,
    image: imageUrl,
    createdAt: new Date().toISOString()
  };
  const recipes = getStoredRecipes();
  recipes.unshift(newRecipe);
  saveRecipes(recipes);
  return NextResponse.json(newRecipe);
} 
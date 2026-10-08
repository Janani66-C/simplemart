import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DUMMY_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Category } from '../types';

interface HomeProps {
  onNavigate: (page: string, params?: { productId?: number }) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { setSelectedCategory } = useCart();
  // Display 8 dummy products on home page as requested
  const featuredProducts = DUMMY_PRODUCTS.slice(0, 8);

  const categories: Category[] = ['Electronics', 'Fashion', 'Home', 'Accessories'];

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    onNavigate('products');
  };

  return (
    <div className="space-y-10">
      {/* Small Welcome Section */}
      <section className="bg-gradient-to-b from-blue-50/70 to-white border border-blue-100/60 rounded-2xl p-6 sm:p-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Everyday Essentials & Lifestyle</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome to SimpleMart
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
          Simple shopping made easy.
        </p>

        {/* Quick Category Filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 text-sm font-medium transition-colors shadow-2xs cursor-pointer"
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedCategory('All');
              onNavigate('products');
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <span>All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Top picked items for you today
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              onNavigate('products');
            }}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({DUMMY_PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Grid: 4 columns on desktop, 2 or 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(id) => onNavigate('productDetails', { productId: id })}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

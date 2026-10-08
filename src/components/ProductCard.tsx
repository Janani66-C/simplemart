import React, { useState } from 'react';
import { ShoppingCart, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelect(product.id)}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            {product.name}
          </div>
        )}
        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-gray-700 text-xs font-medium px-2 py-0.5 rounded-md shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-gray-700">{product.rating || 4.5}</span>
        </div>

        <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-gray-400 font-normal">Price</span>
            <p className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              justAdded
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Check, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { DUMMY_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailsProps {
  productId: number;
  onNavigate: (page: string, params?: { productId?: number }) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onNavigate }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const product = DUMMY_PRODUCTS.find((p) => p.id === productId) || DUMMY_PRODUCTS[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const relatedProducts = DUMMY_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>
      </div>

      {/* Main Product Card / Detail View */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
        {/* Left: Product Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden aspect-square border border-gray-100">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center max-h-120"
            />
          ) : (
            <div className="text-gray-400 text-sm">{product.name}</div>
          )}
        </div>

        {/* Right: Info & Controls */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category badge */}
            <div className="flex items-center justify-between">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-800">{product.rating || 4.5}</span>
                <span className="text-gray-400">(Demo rating)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-400">Inclusive of all taxes</span>
            </div>

            {/* Short Description */}
            <div className="border-t border-b border-gray-100 py-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-base transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold text-gray-800 min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer font-bold text-base transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  Subtotal: ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Item Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                handleAddToCart();
                onNavigate('cart');
              }}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Buy Now / Go to Cart
            </button>
          </div>

          {/* Simple delivery badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center text-xs text-gray-500">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Truck className="w-4 h-4 mx-auto text-blue-600 mb-1" />
              <span>Free Delivery</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <RotateCcw className="w-4 h-4 mx-auto text-blue-600 mb-1" />
              <span>Easy Return</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 mx-auto text-blue-600 mb-1" />
              <span>Demo Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-gray-900">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={(id) => onNavigate('productDetails', { productId: id })}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

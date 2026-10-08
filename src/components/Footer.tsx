import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-600 text-sm">
      {/* 3 Simple Value Propositions */}
      <div className="border-b border-gray-100 py-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-3">
            <Truck className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-semibold text-gray-900 text-sm">Free Delivery</h4>
            <p className="text-xs text-gray-500 mt-1">Enjoy free standard shipping on every order</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <RotateCcw className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-semibold text-gray-900 text-sm">7-Day Easy Returns</h4>
            <p className="text-xs text-gray-500 mt-1">Simple and hassle-free return policy</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-semibold text-gray-900 text-sm">Demo Store</h4>
            <p className="text-xs text-gray-500 mt-1">Safe and lightweight dummy shopping experience</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-gray-900">SimpleMart</span>
            <span className="text-xs text-gray-400 ml-2">| Simple shopping made easy.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Cart
            </button>
            <button
              onClick={() => onNavigate('orders')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Orders
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Profile
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} SimpleMart. All rights reserved.</p>
          <p className="text-gray-400">Dummy e-commerce project designed for demo and learning purposes.</p>
        </div>
      </div>
    </footer>
  );
};

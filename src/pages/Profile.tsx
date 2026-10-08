import React from 'react';
import { User, Mail, Phone, MapPin, Package, ShoppingCart, CheckCircle } from 'lucide-react';
import { INITIAL_PROFILE } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { orders, cartCount } = useCart();
  const profile = INITIAL_PROFILE;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Demo customer account details
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Avatar and Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-xs">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              <span className="inline-flex items-center gap-1 text-2xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200 font-semibold">
                <CheckCircle className="w-3 h-3 text-green-600" />
                Active Demo Member
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">SimpleMart Shopper</p>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Full Name</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{profile.name}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Email Address</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{profile.email}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Phone Number</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{profile.phone}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Delivery Address</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{profile.address}</p>
          </div>
        </div>

        {/* Quick Stats & Shortcuts */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => onNavigate('orders')}
            className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">{orders.length}</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 mt-2 group-hover:text-blue-600">
              My Orders
            </p>
            <p className="text-2xs text-gray-400">View recent purchases</p>
          </button>

          <button
            onClick={() => onNavigate('cart')}
            className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">{cartCount}</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 mt-2 group-hover:text-blue-600">
              Items in Cart
            </p>
            <p className="text-2xs text-gray-400">Proceed to checkout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

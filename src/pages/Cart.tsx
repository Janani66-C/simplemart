import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onNavigate: (page: string, params?: { productId?: number }) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, placeDemoOrder } = useCart();
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  const handleCheckout = () => {
    const newId = placeDemoOrder();
    setOrderPlacedId(newId);
  };

  // If checkout success modal/card is active
  if (orderPlacedId) {
    return (
      <div className="max-w-lg mx-auto my-8 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Order placed successfully!
        </h2>
        <p className="text-sm font-medium text-blue-600 mt-1">
          Order ID: #{orderPlacedId}
        </p>

        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-gray-600 text-sm">
          <p className="font-semibold text-gray-800">This is a demo order.</p>
          <p className="text-xs text-gray-500 mt-1">
            No real payment was charged. You can view this order status in the Orders section.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('orders')}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            View Orders
          </button>
          <button
            onClick={() => onNavigate('products')}
            className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your Cart is Empty</h2>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Looks like you haven't added any products to your cart yet.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review your selected items before checkout
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Cart items list */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-4"
            >
              {/* Product Image */}
              <div
                onClick={() => onNavigate('productDetails', { productId: item.product.id })}
                className="w-24 h-24 sm:w-20 sm:h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 cursor-pointer border border-gray-100"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left">
                <span className="text-2xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
                  {item.product.category}
                </span>
                <h3
                  onClick={() => onNavigate('productDetails', { productId: item.product.id })}
                  className="font-semibold text-gray-900 text-base mt-1 hover:text-blue-600 cursor-pointer"
                >
                  {item.product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Unit Price: ₹{item.product.price.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm font-semibold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-gray-800 min-w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm font-semibold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Item Subtotal */}
              <div className="text-right min-w-20">
                <p className="font-bold text-gray-900 text-sm">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs h-fit space-y-4">
          <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-medium text-gray-900">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Delivery Fee</span>
              <span className="font-medium">FREE</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Taxes (Included)</span>
              <span>₹0</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
            <span className="font-bold text-gray-900 text-base">Total Amount</span>
            <span className="font-extrabold text-blue-600 text-xl">
              ₹{cartTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Demo Checkout — No real transaction or credit card required.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

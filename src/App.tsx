import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { Check } from 'lucide-react';

interface RouteState {
  page: string;
  productId?: number;
}

// Router helper parsing URL hash (e.g. #products, #product/3, #cart, #orders, #profile)
function parseHash(hash: string): RouteState {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'home') {
    return { page: 'home' };
  }

  if (clean.startsWith('product/')) {
    const id = parseInt(clean.replace('product/', ''), 10);
    return { page: 'productDetails', productId: isNaN(id) ? 1 : id };
  }

  if (['products', 'cart', 'orders', 'profile'].includes(clean)) {
    return { page: clean };
  }

  return { page: 'home' };
}

function MainApp() {
  const { toastMessage } = useCart();
  const [route, setRoute] = useState<RouteState>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, params?: { productId?: number }) => {
    let newHash = `#${page}`;
    if (page === 'productDetails' && params?.productId) {
      newHash = `#product/${params.productId}`;
    } else if (page === 'home') {
      newHash = '#';
    }

    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    } else {
      setRoute({ page, productId: params?.productId });
    }

    // Scroll to top upon page navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Bar */}
      <Navbar currentPage={route.page} onNavigate={navigate} />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {route.page === 'home' && <Home onNavigate={navigate} />}
        {route.page === 'products' && <Products onNavigate={navigate} />}
        {route.page === 'productDetails' && (
          <ProductDetails
            productId={route.productId || 1}
            onNavigate={navigate}
          />
        )}
        {route.page === 'cart' && <Cart onNavigate={navigate} />}
        {route.page === 'orders' && <Orders onNavigate={navigate} />}
        {route.page === 'profile' && <Profile onNavigate={navigate} />}
      </main>

      {/* Minimal Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Minimal Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-gray-800 animate-fade-in">
          <Check className="w-4 h-4 text-green-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

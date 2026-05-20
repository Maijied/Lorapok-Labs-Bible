import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppShell from './components/layout/AppShell';

// Eager load
import HomePage from './pages/HomePage';

// Lazy load other pages
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const AtlasPage = lazy(() => import('./pages/AtlasPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BrandPage = lazy(() => import('./pages/BrandPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ConnectPage = lazy(() => import('./pages/ConnectPage'));

function App() {
  const location = useLocation();

  return (
    <AppShell>
      <Suspense fallback={<div className="page-loading" />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/atlas" element={<AtlasPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/connect" element={<ConnectPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </AppShell>
  );
}

export default App;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductCarousel from '@/components/products/ProductCarousel';
import AuthModal from '@/components/AuthModal';

const Products = () => {
  const { categories, filteredProducts, selectedCategory, setSelectedCategory } = useProducts();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [productToBuy, setProductToBuy] = useState<Product | null>(null);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (productToBuy) {
      setTimeout(() => {
        window.open('https://www.paypal.com', '_blank');
      }, 1500);
    }
  };

  const handleShowAuthModal = (product: Product) => {
    setProductToBuy(product);
    setShowAuthModal(true);
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-cyborg-dark to-black relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Premium Enhancements
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our collection of cutting-edge cybernetic enhancements designed to transcend human limitations and elevate your capabilities beyond imagination.
          </p>
        </motion.div>

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <ProductCarousel 
          products={filteredProducts}
          onShowAuthModal={handleShowAuthModal}
        />
      </div>

      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          product={productToBuy}
        />
      )}
    </section>
  );
};

export default Products;

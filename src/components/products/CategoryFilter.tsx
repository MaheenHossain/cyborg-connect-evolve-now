
import React from 'react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/product';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <motion.div 
      className="mb-8 flex flex-wrap justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: false }}
    >
      <Button 
        onClick={() => onCategorySelect('all')}
        variant={selectedCategory === 'all' ? "default" : "outline"}
        className="hover:bg-blue-700/20 transition-colors"
      >
        All Products
      </Button>
      
      {categories.map((category) => (
        <Button 
          key={category.id} 
          onClick={() => onCategorySelect(category.id)}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className="hover:bg-blue-700/20 transition-colors"
        >
          {category.name}
        </Button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;

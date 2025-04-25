
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { motion } from 'framer-motion';

type Product = Tables<'products'>;

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-black/40 border border-blue-900/50 overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="h-56 overflow-hidden bg-gradient-to-b from-blue-900/20 to-cyan-900/20">
            <motion.img
              src={product.image_url || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 flex-grow">
          <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-400">${product.price.toFixed(2)}</p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 flex items-center text-sm text-gray-400 hover:text-white"
          >
            {showDetails ? "Hide details" : "View details"}
            {showDetails ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
          </Button>
          
          {showDetails && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 text-sm text-gray-400 space-y-4"
            >
              <div>
                <h4 className="font-semibold text-gray-300 mb-2">Features</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features && typeof product.features === 'object' && Object.entries(product.features).map(([key, value]) => (
                    <li key={key}>
                      <span className="text-gray-300">{key}:</span> {value as string}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-300 mb-2">Technical Specifications</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {product.technical_specs && typeof product.technical_specs === 'object' && Object.entries(product.technical_specs).map(([key, value]) => (
                    <li key={key}>
                      <span className="text-gray-300">{key}:</span> {value as string}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="flex gap-2 p-6 pt-0">
          <Button 
            onClick={onAddToCart}
            variant="outline" 
            className="flex-1 hover:bg-blue-900/30"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          
          <Button 
            onClick={onBuyNow}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;

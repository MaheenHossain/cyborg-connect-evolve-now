
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ChevronDown, ChevronUp, ImageIcon } from 'lucide-react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import EncryptButton from './animations/EncryptButton';
import PixelCard from './animations/PixelCard';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <PixelCard 
      variant="blue" 
      className="cursor-pointer relative"
      onClick={onClick}
    >
      {product.special && (
        <div className="absolute -top-4 -right-4 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          Special Product
        </div>
      )}
      
      <Card className="bg-black/40 border border-blue-900/50 overflow-hidden h-full flex flex-col hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <CardHeader className="p-0 relative">
          <div className="h-56 overflow-hidden bg-gradient-to-b from-blue-900/20 to-cyan-900/20 relative">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 mx-auto text-blue-500/50" />
                  <p className="text-sm text-gray-400 mt-2">{product.name}</p>
                </div>
              </div>
            ) : (
              <motion.img
                src={product.image_url}
                alt={product.name}
                className={`w-full h-full object-cover object-center transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500/30">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 flex-grow" onClick={(e) => e.stopPropagation()}>
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
        
        <CardFooter className="flex flex-col sm:flex-row gap-2 p-6 pt-0" onClick={(e) => e.stopPropagation()}>
          <EncryptButton 
            onClick={onAddToCart}
            className="w-full sm:flex-1 hover:bg-blue-900/30"
          >
            Add to Cart
          </EncryptButton>
          
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow();
            }}
            className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </PixelCard>
  );
};

export default ProductCard;

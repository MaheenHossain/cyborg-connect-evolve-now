
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tables } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';

type Product = Tables<'products'>;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real app, we'd fetch from Supabase
        // For now, we'll use our sample data
        const SAMPLE_PRODUCTS = [
          {
            id: '1',
            name: 'NeuroLink Pro',
            description: 'Advanced neural interface for direct mind-computer connection',
            price: 7999.99,
            image_url: '/product-neurolink.png',
            category_id: '1',
            created_at: new Date().toISOString(),
            features: {
              processingPower: '10 petaflops',
              connectionType: 'Quantum encrypted',
              batteryLife: 'Self-powering',
            },
            technical_specs: {
              dimensions: '3.5cm x 2.1cm x 0.8cm',
              weight: '15g',
              material: 'Bio-compatible titanium alloy',
            },
          },
          {
            id: '2',
            name: 'Titan Arm X1',
            description: 'Military-grade cybernetic arm with enhanced strength and precision',
            price: 8499.99,
            image_url: '/product-arm.png',
            category_id: '2',
            created_at: new Date().toISOString(),
            features: {
              strengthMultiplier: '50x',
              motorPrecision: '0.001mm',
              batteryLife: '72 hours continuous use',
            },
            technical_specs: {
              dimensions: 'Custom fit to user',
              weight: '2.3kg',
              material: 'Carbon fiber and tungsten alloy',
            },
          },
          {
            id: '3',
            name: 'Eagle Eye V5',
            description: 'Cybernetic eye enhancement with 100x zoom and night vision',
            price: 5999.99,
            image_url: '/product-eye.png',
            category_id: '3',
            created_at: new Date().toISOString(),
            features: {
              zoomCapability: '100x optical',
              visionModes: 'Night vision, thermal, AR overlay',
              resolution: '16K ultra-definition',
            },
            technical_specs: {
              dimensions: 'Standard eye socket compatible',
              weight: '45g',
              material: 'Lab-grown sapphire and bio-electronics',
            },
          },
          {
            id: '4',
            name: 'CardioTech Heart',
            description: 'Synthetic heart with 300% efficiency compared to biological hearts',
            price: 9999.99,
            image_url: '/product-heart.png',
            category_id: '4',
            created_at: new Date().toISOString(),
            features: {
              pumpEfficiency: '300%',
              materials: 'Self-healing synthetic tissues',
              monitoring: 'Real-time health analytics',
            },
            technical_specs: {
              dimensions: 'Custom fit to patient',
              weight: '380g',
              material: 'Synthetic organic compounds and titanium',
            },
          },
          {
            id: '5',
            name: 'CortexCore Neural Interface',
            description: 'Direct neural interface with advanced AI integration capabilities',
            price: 8299.99,
            image_url: 'public/lovable-uploads/ca96e439-a3bd-41ef-8083-b60732aa9d27.png',
            category_id: '1',
            created_at: new Date().toISOString(),
            features: {
              aiIntegration: 'Full symbiotic neural link',
              bandwidth: '10 TB/s',
              interface: 'Non-invasive quantum connection',
            },
            technical_specs: {
              dimensions: '5.2cm x 4.3cm x 1.1cm',
              weight: '23g',
              material: 'Nano-carbon mesh with graphene electrodes',
            },
          },
          {
            id: '6',
            name: 'Precision Hand MK-II',
            description: 'Ultra-precise cybernetic hand with tactile feedback system',
            price: 7599.99,
            image_url: 'public/lovable-uploads/8cf69124-7ee1-4d6e-a84f-c0f7b0004e3c.png',
            category_id: '2',
            created_at: new Date().toISOString(),
            features: {
              sensorResolution: '0.001mm pressure sensitivity',
              gripStrength: 'Variable, up to 500kg',
              neuralFeedback: 'Full tactile sensation',
            },
            technical_specs: {
              dimensions: 'Anatomical human hand equivalent',
              weight: '1.2kg',
              material: 'Titanium frame with synthetic skin overlay',
            },
          }
        ] as unknown as Product[];
        
        const foundProduct = SAMPLE_PRODUCTS.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    window.open('https://www.paypal.com', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyborg-dark flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-blue-500 rounded-full"></div>
          <div className="space-y-4">
            <div className="h-4 bg-blue-500 rounded w-36"></div>
            <div className="h-4 bg-blue-500 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cyborg-dark flex flex-col">
        <Navbar onCartClick={() => {}} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyborg-dark text-white overflow-x-hidden">
      <div className="interactive-bg">
        <Navbar onCartClick={() => navigate('/')} />
        
        <div className="container mx-auto px-4 py-24">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-8 flex items-center hover:bg-blue-900/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Product Image */}
            <motion.div 
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-blue-900/20 to-cyan-900/20 p-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto object-contain rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            
            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <motion.div 
                  className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Premium Enhancement
                </motion.div>
                
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {product.name}
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-6"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {product.description}
                </motion.p>
                
                <motion.div 
                  className="text-3xl font-bold text-blue-400 mb-8"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ${product.price.toFixed(2)}
                </motion.div>
              </div>
              
              <motion.div 
                className="space-y-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Features</h3>
                  <ul className="space-y-2">
                    {product.features && typeof product.features === 'object' && Object.entries(product.features).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <div className="mr-2 h-5 w-5 rounded-full bg-blue-500/30 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                        </div>
                        <span>
                          <span className="font-medium text-blue-300">{key}: </span>
                          <span className="text-gray-300">{value as string}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Technical Specifications</h3>
                  <ul className="space-y-2">
                    {product.technical_specs && typeof product.technical_specs === 'object' && Object.entries(product.technical_specs).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <div className="mr-2 h-5 w-5 rounded-full bg-blue-500/30 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                        </div>
                        <span>
                          <span className="font-medium text-blue-300">{key}: </span>
                          <span className="text-gray-300">{value as string}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button 
                  onClick={handleAddToCart}
                  variant="outline" 
                  size="lg"
                  className="flex-1 hover:bg-blue-900/30 text-lg py-7"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button 
                  onClick={handleBuyNow}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-7"
                >
                  Buy Now with PayPal
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;

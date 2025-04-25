
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingCart, Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import AuthModal from '@/components/AuthModal';
import { Tables } from '@/integrations/supabase/types';

type Category = Tables<'categories'>;
type Product = Tables<'products'>;

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'NeuroLink Pro',
    description: 'Advanced neural interface for direct mind-computer connection',
    price: 7999.99,
    image_url: '/product-neurolink.png',
    category_id: '1',
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
];

const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [productToBuy, setProductToBuy] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('categories').select('*');
        if (error) throw error;
        if (data) setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Use sample data as fallback
        setCategories([
          { id: '1', name: 'Neural Implants', description: 'Advanced brain-computer interfaces', image_url: null },
          { id: '2', name: 'Cybernetic Limbs', description: 'Precision-engineered replacement limbs', image_url: null },
          { id: '3', name: 'Sensory Enhancements', description: 'Augmentations for vision, hearing, and other senses', image_url: null },
          { id: '4', name: 'Internal Systems', description: 'Core replacement systems for vital bodily functions', image_url: null },
        ]);
      }
    };

    const fetchProducts = async () => {
      try {
        // In a real app we'd fetch from Supabase
        // For now, use sample data
        setProducts(SAMPLE_PRODUCTS as Product[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === selectedCategory);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: Product) => {
    setProductToBuy(product);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (productToBuy) {
      // Redirect to PayPal checkout or add to cart
      toast({
        title: "Proceeding to checkout",
        description: `You're being redirected to PayPal to complete your purchase.`,
      });
      setTimeout(() => {
        window.open('https://www.paypal.com', '_blank');
      }, 1500);
    }
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-cyborg-dark to-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Premium Enhancements
          </span>
        </h2>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? "default" : "outline"}
            className="hover:bg-blue-700/20 transition-colors"
          >
            All Products
          </Button>
          
          {categories.map((category) => (
            <Button 
              key={category.id} 
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="hover:bg-blue-700/20 transition-colors"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {filteredProducts.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <ProductCard 
                  product={product} 
                  onAddToCart={() => handleAddToCart(product)} 
                  onBuyNow={() => handleBuyNow(product)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
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


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface ProductCarouselProps {
  products: Product[];
  onShowAuthModal: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onShowAuthModal }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent className="-ml-1 md:-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <ProductCard 
                product={product} 
                onAddToCart={() => handleAddToCart(product)} 
                onBuyNow={() => onShowAuthModal(product)}
                onClick={() => handleProductClick(product)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-8 gap-4">
        <CarouselPrevious className="static transform-none" />
        <CarouselNext className="static transform-none" />
      </div>
    </Carousel>
  );
};

export default ProductCarousel;

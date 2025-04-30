
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AuthModal from '@/components/AuthModal';
import { useCart } from '@/context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, subtotal } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  
  const handleCheckout = () => {
    setShowAuthModal(true);
  };
  
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    toast({
      title: "Proceeding to checkout",
      description: "You're being redirected to PayPal to complete your purchase.",
    });
    setTimeout(() => {
      window.open('https://www.paypal.com', '_blank');
    }, 1500);
  };
  
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="bg-black border-l border-blue-900/50 w-full sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl text-white">Your Cart</SheetTitle>
            <SheetDescription className="text-gray-400">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </SheetDescription>
          </SheetHeader>
          
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                {cartItems.map(item => (
                  <div 
                    key={item.id}
                    className="flex items-center gap-4 border-b border-gray-800 pb-4"
                  >
                    <div className="w-20 h-20 bg-gray-900 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <p className="text-blue-400 text-lg">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="mx-2 min-w-[30px] text-center">{item.quantity}</span>
                        
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Tax</span>
                  <span className="font-medium text-white">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-xl mb-6">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-blue-400">${subtotal.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 py-6"
                  onClick={handleCheckout}
                >
                  Checkout with PayPal
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <div className="bg-gray-900 rounded-full p-6 mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-6">Start adding products to your cart</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
      
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          product={null}
        />
      )}
    </>
  );
};

export default Cart;


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category, Product } from '@/types/product';
import { imageExists, parseImageSrc } from '@/utils/imageUtils';

// Define image paths for each product with the newly uploaded images
const productImages = {
  'NeuroLink Pro': '/lovable-uploads/626c19dc-798a-4f67-a4d6-7469fb9c674e.png', // Brain enhancement
  'Titan Arm X1': '/lovable-uploads/e9c5a966-fc47-4c71-b8af-bcfb09d0b4fe.png', // Robotic arm
  'Eagle Eye V5': '/lovable-uploads/a9541d3a-b6b3-4e95-b2e9-5b4f1c660f70.png', // Helmet with display
  'CardioTech Heart': '/lovable-uploads/7de1684e-bc1f-44e0-8b0f-dc758af9a113.png', // Mechanical heart
  'CortexCore Neural Interface': '/lovable-uploads/09eb9f86-36f0-432f-89a4-21f57b2a2fea.png', // AI head profile
  'Precision Hand MK-II': '/lovable-uploads/e34b35e7-416d-4f57-a8d5-18247f1b8a20.png', // Robotic hand
};

export const useProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('categories').select('*');
        if (error) throw error;
        if (data) setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
        // Sample products with correctly mapped image URLs
        const SAMPLE_PRODUCTS: Product[] = [
          {
            id: '1',
            name: 'NeuroLink Pro',
            description: 'Advanced neural interface for direct mind-computer connection',
            price: 7999.99,
            image_url: productImages['NeuroLink Pro'],
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
            image_url: productImages['Titan Arm X1'],
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
            image_url: productImages['Eagle Eye V5'],
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
            image_url: productImages['CardioTech Heart'],
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
            image_url: productImages['CortexCore Neural Interface'],
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
            image_url: productImages['Precision Hand MK-II'],
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
        ];
        
        // Use our imageUtils to verify and handle images
        const productsWithVerifiedImages = await Promise.all(
          SAMPLE_PRODUCTS.map(async (product) => {
            const imageSrc = parseImageSrc(product.image_url, product.name);
            product.image_url = imageSrc;
            
            const imageLoaded = await imageExists(imageSrc);
            
            // Update loaded state
            setImagesLoaded(prev => ({
              ...prev,
              [product.id]: imageLoaded
            }));
            
            console.log(`Image for ${product.name}: ${imageLoaded ? 'loaded successfully' : 'failed to load'}`);
            
            return product;
          })
        );
        
        setProducts(productsWithVerifiedImages);
      } catch (error) {
        console.error('Error preparing products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === selectedCategory);

  return {
    categories,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    imagesLoaded
  };
};

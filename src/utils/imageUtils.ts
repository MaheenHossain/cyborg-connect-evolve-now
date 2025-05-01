
/**
 * Image utility functions for checking and loading images
 */

/**
 * Check if an image exists at the given URL
 * @param url The URL to check
 * @returns Promise that resolves to true if image exists, false otherwise
 */
export const imageExists = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url) {
      console.log('Image URL is empty');
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      console.log(`Image loaded successfully: ${url}`);
      resolve(true);
    };
    img.onerror = () => {
      console.log(`Failed to load image: ${url}`);
      resolve(false);
    };
    img.src = url;
  });
};

/**
 * Get a fallback image URL if the provided one fails
 * @param imageName The name of the product
 * @returns A URL to a fallback image
 */
export const getFallbackImage = (imageName: string): string => {
  // Simplified image name for fallback matching
  const simplifiedName = imageName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Map of product names to the newly uploaded images
  const fallbackMap: Record<string, string> = {
    'neurolinkpro': '/lovable-uploads/626c19dc-798a-4f67-a4d6-7469fb9c674e.png', // Brain image
    'titanarmx1': '/lovable-uploads/e9c5a966-fc47-4c71-b8af-bcfb09d0b4fe.png', // Robotic arm
    'eagleeyev5': '/lovable-uploads/a9541d3a-b6b3-4e95-b2e9-5b4f1c660f70.png', // Helmet with display
    'cardiotechheart': '/lovable-uploads/7de1684e-bc1f-44e0-8b0f-dc758af9a113.png', // Mechanical heart
    'cortexcoreneuralinferface': '/lovable-uploads/09eb9f86-36f0-432f-89a4-21f57b2a2fea.png', // AI head profile
    'cortexcoreneuralinteface': '/lovable-uploads/09eb9f86-36f0-432f-89a4-21f57b2a2fea.png', // Alternate spelling
    'cortexcoreneurainterface': '/lovable-uploads/09eb9f86-36f0-432f-89a4-21f57b2a2fea.png', // Another alternate spelling
    'precisionhandmkii': '/lovable-uploads/e34b35e7-416d-4f57-a8d5-18247f1b8a20.png' // Robotic hand
  };

  return fallbackMap[simplifiedName] || '/placeholder.svg';
};

/**
 * Parse an image source and ensure it's valid
 * @param src The source URL of the image
 * @param productName The name of the product for fallback
 * @returns A valid image URL
 */
export const parseImageSrc = (src: string | null, productName: string): string => {
  if (!src) {
    console.log(`No source for ${productName}, using fallback`);
    return getFallbackImage(productName);
  }
  
  // If src is a full URL, return it
  if (src.startsWith('http')) return src;
  
  // If src contains lovable-uploads, make sure it's properly formatted
  if (src.includes('lovable-uploads')) {
    // Check if it's already properly formatted
    if (src.startsWith('/')) return src;
    // If not, add the leading slash
    return `/${src}`;
  }
  
  // For other cases, check if it's a path without the leading slash
  if (!src.startsWith('/')) {
    return `/${src}`;
  }
  
  // Return the original src if it passes all checks
  return src;
};

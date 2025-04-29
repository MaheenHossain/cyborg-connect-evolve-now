
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
  
  // Map of simplified names to fallback images (now updated with uploaded images)
  const fallbackMap: Record<string, string> = {
    'neurolinkpro': '/lovable-uploads/d343cf65-8e74-4006-ac07-2d711465c17c.png', 
    'titanarmx1': '/lovable-uploads/e40d22d7-6aff-4eaa-b027-8229d240733f.png', 
    'eagleeyev5': '/lovable-uploads/713b0aed-b5be-48fd-98b1-6b0631f35f24.png',
    'cardiotechheart': '/lovable-uploads/b485ed22-6e72-4f38-a1bb-5e9ebc17a884.png',
    'cortexcoreneuralinferface': '/lovable-uploads/86c31ae0-a401-4d9d-85de-bd884578a3e7.png',
    'precisionhandmkii': '/lovable-uploads/2300ed75-7f6d-4ae7-847b-4c89e2107b1c.png'
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
  
  // Check for lovable-uploads path and ensure it starts with '/'
  if (src.includes('lovable-uploads') && !src.startsWith('/')) {
    return `/${src}`;
  }
  
  // If src is a full URL, return it
  if (src.startsWith('http')) return src;
  
  // If src is a relative path, make sure it starts with '/'
  if (!src.startsWith('/')) return `/${src}`;
  
  return src;
};

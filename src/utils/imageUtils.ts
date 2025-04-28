
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
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
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
  
  // Map of simplified names to fallback images
  const fallbackMap: Record<string, string> = {
    'neurolinkpro': '/neuro-link-pro.png',
    'titanarmx1': '/titan-arm.png', 
    'eagleeyev5': '/eagle-eye.png',
    'cardiotechheart': '/cardio-tech.png',
    'cortexcoreneuralinferface': '/cortex-core.png',
    'precisionhandmkii': '/precision-hand.png'
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
  if (!src) return getFallbackImage(productName);
  
  // If src is a full URL, return it
  if (src.startsWith('http')) return src;
  
  // If src is a relative path, make sure it starts with '/'
  if (!src.startsWith('/')) return `/${src}`;
  
  return src;
};

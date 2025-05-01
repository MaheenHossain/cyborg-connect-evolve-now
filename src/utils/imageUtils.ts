
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
  
  // Map of product names to the updated image URLs
  const fallbackMap: Record<string, string> = {
    'neurolinkpro': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/neuro-link-pro.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9uZXVyby1saW5rLXByby5wbmciLCJpYXQiOjE3NDYwOTY3MTEsImV4cCI6MTc0ODY4ODcxMX0.ib7pW6_GXviXl8_yXSWsCyfQJI6lCpUiPg7ZP6eXHew',
    'titanarmx1': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/titan-arm.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy90aXRhbi1hcm0ucG5nIiwiaWF0IjoxNzQ2MDk2NzM3LCJleHAiOjE3NDg2ODg3Mzd9.cuU9W155kGRhnpdfhe1KHogBaR1Wgrgp8yOzN4MOvAA',
    'eagleeyev5': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/eagle-eye.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9lYWdsZS1leWUucG5nIiwiaWF0IjoxNzQ2MDk2NjkzLCJleHAiOjE3NDg2ODg2OTN9.MTFj2x-rssS8pPhk8CqiRaMJtAkx8zvbGJ8rLgYXtxE',
    'cardiotechheart': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/cardio-tech.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9jYXJkaW8tdGVjaC5wbmciLCJpYXQiOjE3NDYwOTY0NDcsImV4cCI6MTc0ODY4ODQ0N30.UC0UGDqhSDdLdQ5RZmUS0JKqOv-ktqomo2w2VAAck8k',
    'cortexcoreneuralinferface': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/cortex-core.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9jb3J0ZXgtY29yZS5wbmciLCJpYXQiOjE3NDYwOTY2NzcsImV4cCI6MTc0ODY4ODY3N30.4OAAIUCqVz2gVfORX-JNnL9Ru2ueavKmLhnB1FYJWV0',
    'cortexcoreneuralinteface': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/cortex-core.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9jb3J0ZXgtY29yZS5wbmciLCJpYXQiOjE3NDYwOTY2NzcsImV4cCI6MTc0ODY4ODY3N30.4OAAIUCqVz2gVfORX-JNnL9Ru2ueavKmLhnB1FYJWV0',
    'cortexcoreneurainterface': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/cortex-core.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9jb3J0ZXgtY29yZS5wbmciLCJpYXQiOjE3NDYwOTY2NzcsImV4cCI6MTc0ODY4ODY3N30.4OAAIUCqVz2gVfORX-JNnL9Ru2ueavKmLhnB1FYJWV0',
    'precisionhandmkii': 'https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/precision-hand.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9wcmVjaXNpb24taGFuZC5wbmciLCJpYXQiOjE3NDYwOTY3MjUsImV4cCI6MTc0ODY4ODcyNX0.07MCDqo82H-5wNaSSTDuqh7ZoQQ756KjKndjOM3QhEQ'
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

/**
 * Enhance image for display by applying a shadow or border for better visibility
 * @param imageElement - The image DOM element to enhance
 */
export const enhanceImageVisibility = (imageElement: HTMLImageElement | null): void => {
  if (!imageElement) return;
  
  // Add shadow and border for better visibility against backgrounds
  imageElement.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
  imageElement.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  imageElement.style.borderRadius = '8px';
};

/**
 * Create a styled container for product images
 * @returns CSS styles for product image containers
 */
export const getProductImageContainerStyle = (): React.CSSProperties => {
  return {
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05))',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  };
};

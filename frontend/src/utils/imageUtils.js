/**
 * Image utility functions for better image handling and optimization
 */

// Fallback image for when doctor images fail to load
export const FALLBACK_DOCTOR_IMAGE =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

// Default doctor image if no image is provided
export const DEFAULT_DOCTOR_IMAGE =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

/**
 * Handle image loading errors with fallback
 * @param {Event} event - Image error event
 * @param {string} [fallbackSrc=FALLBACK_DOCTOR_IMAGE] - Fallback image source
 */
export const handleImageError = (event, fallbackSrc = FALLBACK_DOCTOR_IMAGE) => {
  event.target.src = fallbackSrc;
  event.target.onerror = null; // Prevent infinite loop
};

/**
 * Get optimized image dimensions for different use cases
 * @param {string} useCase - Where the image will be used
 * @returns {{width: number, height: number}} Object with width and height
 */
export const getImageDimensions = (useCase) => {
  const dimensions = {
    "team-card": { width: 400, height: 400 },
    "doctor-profile": { width: 600, height: 800 },
    "experts-card": { width: 400, height: 400 },
    hero: { width: 800, height: 600 },
    thumbnail: { width: 200, height: 200 },
  };

  return dimensions[useCase] || { width: 400, height: 400 };
};

/**
 * Generate optimized image URL with parameters
 * @param {string} imageUrl - Original image URL
 * @param {string} [useCase="team-card"] - Use case for the image
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (imageUrl, useCase = "team-card") => {
  if (!imageUrl) return FALLBACK_DOCTOR_IMAGE;
  if (imageUrl.startsWith("http")) return imageUrl;

  const dimensions = getImageDimensions(useCase);
  return `${imageUrl}?w=${dimensions.width}&h=${dimensions.height}&fit=crop&q=80`;
};

/**
 * Preload image for better performance
 * @param {string} src - Image source URL
 * @returns {Promise<HTMLImageElement>} Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error("Image source is empty"));
      return;
    }

    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Get image loading state
 * @param {string} src - Image source URL
 * @returns {Promise<"loaded" | "error">} Loading state
 */
export const getImageLoadingState = async (src) => {
  if (!src) return "error";

  try {
    await preloadImage(src);
    return "loaded";
  } catch {
    return "error";
  }
};

/**
 * Validate image URL
 * @param {string} url - Image URL to validate
 * @returns {boolean} Whether the URL is valid
 */
export const isValidImageUrl = (url) => {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    // If it's a relative path or local asset, consider it valid
    return url.startsWith("/") || url.startsWith("./") || url.startsWith("../");
  }
};

export default {
  FALLBACK_DOCTOR_IMAGE,
  DEFAULT_DOCTOR_IMAGE,
  handleImageError,
  getImageDimensions,
  getOptimizedImageUrl,
  preloadImage,
  getImageLoadingState,
  isValidImageUrl,
};

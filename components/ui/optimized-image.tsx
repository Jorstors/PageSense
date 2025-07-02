import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "loading"> {
  /**
   * Whether the image is visible in the initial viewport without scrolling.
   * - true: Image is visible when page loads (above the fold)
   * - false: Image is only visible after scrolling (below the fold)
   *
   * Images above the fold will load with priority to improve perceived performance.
   * Images below the fold will be lazy-loaded to improve initial page load time.
   */
  aboveFold?: boolean;

  /**
   * Image quality (1-100). Higher quality means larger file size.
   * - Recommended: 85 for photos, 90 for logos
   * - Default: 85
   */
  quality?: number;
}

/**
 * An optimized image component that implements best practices for image loading and SEO.
 *
 * Features:
 * - Uses next/image for automatic optimization and responsive sizing
 * - Prioritizes above-fold images for faster initial page load
 * - Implements lazy loading for below-fold images to improve performance
 * - Adds consistent quality settings for optimal file size
 * - Ensures alt text for accessibility and SEO
 * - Adds smooth opacity transition when images load
 *
 * Usage:
 * ```tsx
 * // Above-fold image (visible without scrolling)
 * <OptimizedImage
 *   src="/hero.jpg"
 *   alt="Hero section"
 *   aboveFold={true}
 * />
 *
 * // Below-fold image (lazy loaded)
 * <OptimizedImage
 *   src="/content.jpg"
 *   alt="Content section"
 *   aboveFold={false}
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  aboveFold = false,
  quality = 85,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      quality={quality}
      priority={aboveFold}
      loading={aboveFold ? "eager" : "lazy"}
      className={cn("transition-opacity duration-300", className)}
      {...props}
    />
  );
}

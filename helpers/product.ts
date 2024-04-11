import { backendUrl } from "./urls";

export function thumbnail(product: Product) {
  if (!Array.isArray(product.images) || !product.images.length) {
    return "https://placehold.co/400";
  }

  return backendUrl(`files/${product.images[0]}`);
}

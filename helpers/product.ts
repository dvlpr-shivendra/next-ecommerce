import { backendUrl } from "./urls";

export function thumbnail(product: Product) {
  if (!Array.isArray(product.images) || !product.images.length) {
    return "https://placehold.co/400";
  }

  if (product.images[0].startsWith("http")) {
    return product.images[0];
  }

  return backendUrl(`files/${product.images[0]}`);
}

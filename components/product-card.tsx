import { format } from "@/helpers/currency";
import { thumbnail } from "@/helpers/product";
import Link from "next/link";
import React from "react";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      key={`product-card-${product.id}`}
      className="pt-6 w-full border border-accent border-dashed hover:border-solid hover:shadow-lg hover:scale-[1.005] transition duration-500 ease-out"
      title={"Buy - " + product.title}
    >
      <img
        className="mx-auto h-48 w-48 bg-white object-contain"
        src={thumbnail(product)}
        alt="Shoes"
      />
      <div className="p-6 text-center">
        <h2 className="line-clamp-1 mb-4" title={product.title}>
          {product.title}
        </h2>
        <p className="leading-none text-accent font-bold mb-4">
          {format(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;

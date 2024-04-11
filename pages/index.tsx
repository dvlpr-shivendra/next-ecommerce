import ProductCard from "@/components/product-card";
import { format } from "@/helpers/currency";
import { get } from "@/helpers/http";
import { thumbnail } from "@/helpers/product";
import { backendUrl } from "@/helpers/urls";
import Link from "next/link";

type GetProductsRes = {
  products: Product[];
};

export default function Home({ data }: { data: GetProductsRes }) {
  return (
    <div className="mt-14">
      <h1 className="text-4xl font-bold mb-14">Ecommerce</h1>
      <div className="max-w-max mx-auto grid grid-cols-1 lg:grid-cols-4 gap-16 justify-items-center">
        {data.products.map((product) => (
          <ProductCard key={`product-card-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const data: GetProductsRes = await get(backendUrl("products"), false);

  // Pass data to the page via props
  return { props: { data } };
}

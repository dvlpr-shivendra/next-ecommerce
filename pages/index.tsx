import ProductCard from "@/components/product-card";
import { get } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";

type GetProductsRes = {
  products: Product[];
};

export default function Home({ data }: { data: GetProductsRes }) {
  return (
    <div className="mt-14">
      <h1 className="text-4xl font-bold mb-14">Ecommerce</h1>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {data.products.map((product) => (
          <ProductCard key={`product-card-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  
  const data: GetProductsRes = await get(backendUrl("products"), false);

  return { props: { data } };
}

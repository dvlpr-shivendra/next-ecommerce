import ProductCard from "@/components/product-card";
import { get } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";

type GetProductsRes = {
  products: Product[];
};

export default function Home({ data }: { data: GetProductsRes }) {
  return (
    <div className="mt-14">
      <div className="mt-8 mb-12 p-8 border border-accent border-dashed">
        <h1 className="text-3xl font-bold leading-none text-gray-900 mb-4">
          SimplyBuy
        </h1>
        <p className="text-lg">Streamlined shopping, simplified for you.</p>
      </div>

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

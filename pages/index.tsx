import ProductCard from "@/components/product-card";
import { get } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import Link from "next/link";

type GetProductsRes = {
  products: Product[];
  total: number;
  limit: number;
  page: number;
};

export default function Home({ data }: { data: GetProductsRes }) {
  const pageCount = Math.ceil(data.total / data.limit);

  return (
    <div>
      <div className="mb-12 p-4 border border-accent border-dashed lg:p-8 hover:border-solid">
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

      <div className="mt-6 space-x-1">
        {data.page > 1 && (
          <Link
            href={`/?page=${data.page - 1}`}
            className="btn"
            title="Previous page"
          >
            Prev
          </Link>
        )}
        {data.page < pageCount && (
          <Link
            href={`/?page=${data.page + 1}`}
            className="btn"
            title="Next page"
          >
            Next
          </Link>
        )}
      </div>
      <p className="mt-2 text-sm">
        Showing page {data.page} of {pageCount}
      </p>
    </div>
  );
}

export async function getServerSideProps({
  query,
}: {
  query: { page: string };
}) {
  const page = Number(query.page) || 1;
  const data: GetProductsRes = await get(
    backendUrl(`products?limit=48&page=${page}`),
    false
  );

  return { props: { data } };
}

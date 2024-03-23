import { format } from "@/helpers/currency";
import { get } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import Link from "next/link";

type GetProductsRes = {
  products: Product[];
};

function thumbnail(product: Product) {
  if (!Array.isArray(product.images) || !product.images.length) {
    return "https://placehold.co/400";
  }

  return backendUrl(`files/${product.images[0]}`);
}

export default function Home({ data }: { data: GetProductsRes }) {
  return (
    <div className="mt-14">
      <h1 className="text-4xl font-bold mb-14">Ecommerce</h1>
      <div className="max-w-max mx-auto grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 justify-items-center">
        {data.products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={`product-card-${product.id}`}
            className="card w-96 bg-base-100 shadow-xl"
          >
            <figure className="h-72">
              <img
                className="object-cover"
                src={thumbnail(product)}
                alt="Shoes"
              />
            </figure>
            <div className="p-6">
              <h2
                className="line-clamp-1 card-title mb-4"
                title={product.title}
              >
                {product.title}
              </h2>
              <p className="text-xl leading-none text-green-400 mb-4">
                {format(product.price)}
              </p>
              <p className="line-clamp-3 mb-4">{product.description}</p>
            </div>
          </Link>
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

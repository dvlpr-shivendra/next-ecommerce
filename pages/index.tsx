import { get } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import Image from "next/image";

type GetProductsRes = {
  products: Product[];
};

export default function Home({ data }: { data: GetProductsRes }) {
  return (
    <div>
      {data.products.map((product) => (
        <div
          key={`product-card-${product.id}`}
          className="card w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <p className="line-clamp-3 mb-4">{product.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const data: GetProductsRes = await get(backendUrl("products"), false);

  // Pass data to the page via props
  return { props: { data } };
}

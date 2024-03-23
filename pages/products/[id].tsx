import { GetServerSideProps } from "next";
import { get } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import { useRouter } from "next/router";
import { format } from "@/helpers/currency";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (id) {
    const product = await get(backendUrl(`products/${id}`), false);
    return { props: { product } };
  }
  return { props: {} };
};

export default function ProductDetail({ product }: { product?: Product }) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  if (!product) {
    return <div>Could not find product with ID: {router.query.id}</div>;
  }

  return (
    <div className="mt-14">
      <h1 className="text-4xl font-bold mb-14">{product.title}</h1>
      <div className="max-w-max mx-auto grid lg:grid-cols-2 gap-8 justify-items-center">
        <div className="carousel ">
          {product.images.map((image, i) => (
            <div key={`image-${i}`} id={`item${i}`} className="carousel-item ">
              <img src={backendUrl(`files/${image}`)} className="" />
            </div>
          ))}
        </div>
        <div className="flex justify-center  py-2 gap-2">
          {product.images.map((_, i) => (
            <a
              key={`image-link-${i}`}
              href={`#item${i}`}
              className="btn btn-xs"
            >
              {i + 1}
            </a>
          ))}
        </div>
        <div className="p-6">
          <h2 className="line-clamp-1 card-title mb-4" title={product.title}>
            {product.title}
          </h2>
          <p className="text-xl leading-none text-green-400 mb-4">
            {format(product.price)}
          </p>
          <p className="line-clamp-3 mb-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

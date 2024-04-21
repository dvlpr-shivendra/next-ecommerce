import { GetServerSideProps } from "next";
import { get } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import { useRouter } from "next/router";
import { format } from "@/helpers/currency";
import Link from "next/link";
import { useState } from "react";
import ArrowLeftCricle from "@/components/icons/arrow-left-circle";
import ArrowRightCircle from "@/components/icons/arrow-right-circle";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (id) {
    const product = await get(backendUrl(`products/${id}`), false);
    return { props: { product } };
  }
  return { props: {} };
};

export default function ProductDetail({ product }: { product?: Product }) {
  const [imageIndex, setImageIndex] = useState(0);

  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  if (!product) {
    return <div>Could not find product with ID: {router.query.id}</div>;
  }

  const prevImage = () =>
    setImageIndex(
      imageIndex - 1 < 0 ? product.images.length - 1 : imageIndex - 1
    );
  const nextImage = () =>
    setImageIndex(imageIndex + 1 >= product.images.length ? 0 : imageIndex + 1);

  return (
    <div>
      <div className="flex flex-col justify-center gap-12 md:flex-row">
        <div>
          <div className="relative mb-8 p-6 border border-accent border-dashed">
            {product.images.length > 1 && (
              <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-[calc(100%-60px)] flex justify-between">
                <button
                  onClick={prevImage}
                  className="cursor-pointer bg-white w-6 border border-accent border-dashed rounded-full font-bold"
                  title="Previous image"
                >
                  «
                </button>
                <button
                  onClick={nextImage}
                  className="cursor-pointer bg-white w-6 border border-accent border-dashed rounded-full font-bold"
                  disabled={imageIndex === product.images.length - 1}
                  title="Next image"
                >
                  »
                </button>
              </div>
            )}
            <img
              className="h-96 w-96 object-contain mx-auto"
              src={
                product.images[imageIndex].startsWith("http")
                  ? product.images[imageIndex]
                  : backendUrl(`files/${product.images[imageIndex]}`)
              }
              alt={product.title}
            />
          </div>
          <Link
            className="btn btn-primary btn-block"
            href={`/checkout?productId=${product.id}`}
          >
            Buy Now
          </Link>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-8">{product.title}</h1>

          <p className="text-xl leading-none text-accent font-bold mb-8">
            {format(product.price)}
          </p>

          <p className="mb-8 whitespace-pre-wrap">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

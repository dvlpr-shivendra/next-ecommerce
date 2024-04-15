import { get } from "@/helpers/http";
import { thumbnail } from "@/helpers/product";
import { backendUrl } from "@/helpers/urls";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [orders, setOrders] = useState<Order[]>([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/auth/login");
    }

    get(backendUrl("orders")).then((orders: Order[]) => {
      setOrders(orders);
    });
  }, []);

  return (
    <div>
      {id && (
        <div
          role="alert"
          className="alert alert-success fixed w-96 right-4 bottom-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-14">Orders</h1>

      {orders.length === 0 && (
        <p className="text-lg mt-10">You have no orders yet.</p>
      )}

      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-6">
            <div
              className={`flex items-center justify-between p-6 hover:border-solid hover:shadow-lg hover:scale-[1.005] transition duration-500 ease-out ${
                typeof id === "string" && parseInt(id) === order.id
                  ? "border-2 solid border-green-600"
                  : "border border-dashed border-accent"
              }`}
            >
              <div className="flex items-center">
                <img
                  className="h-16 w-16 object-cover"
                  src={thumbnail(order.product)}
                  alt={order.product.title}
                />
                <div className="ml-4">
                  <div className="text-lg font-semibold leading-5 mb-1">
                    {order.product.title}
                  </div>
                  <div className="text-gray-600 capitalize">{order.status}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;

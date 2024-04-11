import { get } from "@/helpers/http";
import { thumbnail } from "@/helpers/product";
import { backendUrl } from "@/helpers/urls";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function index() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    get(backendUrl("orders")).then((orders: Order[]) => {
      setOrders(orders);
    });
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-14">Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-4">
            <Link href={`/orders/${order.id}`}>
              <div className="flex items-center justify-between p-4 rounded-lg shadow-md shadow-violet-300 border border-violet-600">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 object-cover rounded-lg"
                    src={thumbnail(order.product)}
                    alt={order.product.title}
                  />
                  <div className="ml-4">
                    <div className="text-lg font-semibold leading-5">
                      {order.product.title}
                    </div>
                    <div className="text-gray-600 capitalize">
                      {order.status}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default index;

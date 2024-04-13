import { format } from "@/helpers/currency";
import { get, post } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

type PaymentSuccessResponse = {
  razorpay_payment_id: string;
};

function IndexPage() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");

  const [addresses, setAddresses] = useState<Address[]>([]);

  const [shippingAddressId, setShippingAddressId] = useState<number | null>(
    null
  );

  const [product, setProduct] = useState<Product | null>(null);

  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    fetchAndSetAdresses();
  }, []);

  useEffect(() => {
    if (productId) {
      get(backendUrl(`products/${productId}`), false).then(
        (product: Product) => {
          setProduct(product);
        }
      );
    }
  }, [productId]);

  function fetchAndSetAdresses() {
    get(backendUrl("address")).then((addresses: Address[]) => {
      setAddresses(addresses);
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    post(backendUrl("address"), {
      line1,
      line2,
      postalCode,
      landmark,
    }).then((address: Address) => {
      setLine1("");
      setLine2("");
      setPostalCode("");
      setLandmark("");
      setAddresses((old) => [...old, address]);
      setShippingAddressId(address.id);
    });
  }

  function initiatePayment() {
    // Make an API request to your server to get the order ID
    post(backendUrl("orders/init"), {
      productId: parseInt(productId as string),
      shippingAddressId: shippingAddressId,
      billingAddressID: shippingAddressId,
    })
      .then(({ razorpayOrder, order }) => {
        // Once you receive the order ID, use it to create a payment link with Razorpay Checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Your Razorpay API Key
          amount: razorpayOrder.amount_due, // Amount in paise (e.g., 1000 paise = ₹10.00)
          currency: "INR",
          name: "Your Store",
          description: "Payment for your order",
          order_id: razorpayOrder.orderId, // Received from the server
          handler: function (res: PaymentSuccessResponse) {
            // Handle the payment success and update your frontend accordingly
            placeOrder(order.id, res.razorpay_payment_id);
            // You may want to redirect to a thank-you page or update the UI
          },
        };

        // @ts-ignore
        const rzp = new Razorpay(options);
        rzp.open();
      })
      .catch((error) => {
        console.error("Error initiating payment:", error);
      });
  }

  function placeOrder(orderId: number, razorpayPaymentId: string) {
    post(backendUrl("orders/success"), {
      orderId,
      razorpayPaymentId,
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    product && (
      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
          <div className="p-8 border border-accent border-dashed">
            <h3 className="text-2xl font-bold mb-4">{product.title}</h3>

            <div className="my-6">
              <div className="space-y-2">
                <p className="text-xl font-medium mb-4">Shipping address</p>
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-center">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={shippingAddressId === address.id}
                      onChange={() => setShippingAddressId(address.id)}
                      className="mr-2 h-4 w-4"
                    />
                    <label className="text-sm">
                      {address.line1}, {address.postalCode}, {address.landmark}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 mb-6">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Add new address
              </div>
              <div className="collapse-content">
                <form onSubmit={onSubmit}>
                  <div className="space-y-3">
                    <div className="form-control">
                      <label className="label">Line 1</label>
                      <input
                        className="input input-bordered"
                        type="text"
                        value={line1}
                        onChange={(e) => setLine1(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">Line 2</label>
                      <input
                        className="input input-bordered"
                        type="text"
                        value={line2}
                        onChange={(e) => setLine2(e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">Postal code</label>
                      <input
                        className="input input-bordered"
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        maxLength={6}
                        minLength={6}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">Landmark</label>
                      <input
                        className="input input-bordered"
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-block !mt-8"
                      type="submit"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
              <div key={product.id}>
                <div className="col-span-2 lg:col-span-1">
                  <button
                    disabled={!shippingAddressId}
                    className="btn btn-primary font-bold"
                    onClick={initiatePayment}
                  >
                    Pay {format(product.price)} and place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default IndexPage;

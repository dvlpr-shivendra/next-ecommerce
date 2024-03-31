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

  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    fetchAndSetAdresses();
  }, []);

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
      initiatePayment();
    });
  }

  function initiatePayment() {
    // Make an API request to your server to get the order ID
    post(backendUrl("order/init"), {
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
    post(backendUrl("order/success"), {
      orderId,
      razorpayPaymentId,
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Checkout</h1>

      <div className="mt-20 p-8 card bg-base-100 shadow-xl w-2/5 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shipping address</h1>

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-8">
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

            <button className="btn btn-primary btn-block" type="submit">
              Save Address
            </button>
          </div>
        </form>

        <div className="my-6">
          <h2 className="font-bold text-2xl mb-4">Address</h2>
          <div className="space-y-2">
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

        <button disabled={!shippingAddressId} className="btn btn-primary btn-block" onClick={initiatePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default IndexPage;

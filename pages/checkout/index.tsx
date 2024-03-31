import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

function IndexPage() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");

  const router = useRouter();
  const { productId } = router.query;

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(line1, line2);
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
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IndexPage;

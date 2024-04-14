import React, { FormEvent, useLayoutEffect, useState } from "react";
import { post } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    post(backendUrl("auth/signup"), payload).then((res: AuthData) => {
      localStorage.setItem("token", res.token as string);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/");
    });
  }

  useLayoutEffect(() => {
    if (localStorage.token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="mt-20 p-8 border border-accent border-dashed w-2/5 mx-auto hover:border-solid">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-8">
          <div className="form-control">
            <label className="label">Name</label>
            <input
              className="input input-bordered"
              type="text"
              value={payload.name}
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              className="input input-bordered"
              type="email"
              value={payload.email}
              onChange={(e) =>
                setPayload({ ...payload, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Phone</label>
            <input
              className="input input-bordered"
              type="tel"
              value={payload.phone}
              onChange={(e) =>
                setPayload({ ...payload, phone: e.target.value })
              }
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input
              className="input input-bordered"
              type="password"
              value={payload.password}
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
              required
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

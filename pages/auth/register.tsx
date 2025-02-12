import React, { FormEvent, useContext, useEffect, useState } from "react";
import { post } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function CreateProduct() {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  const { login } = useContext(AuthContext) as AuthContextType;

  const params = useSearchParams();

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    post(backendUrl("auth/signup"), payload).then((data: AuthData) => {
      login(data);
      router.push(params.get("from") || "/");
    });
  }

  useEffect(() => {
    if (localStorage.token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="p-4 border border-accent border-dashed mx-auto w-full md:w-4/5 lg:p-8 lg:w-3/4 xl:w-1/2 hover:border-solid">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={onSubmit} className="space-y-1 lg:space-y-4">
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
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Phone</label>
          <input
            className="input input-bordered"
            type="tel"
            value={payload.phone}
            onChange={(e) => setPayload({ ...payload, phone: e.target.value })}
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
        <div>
          <button className="btn btn-primary btn-block mt-4" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { FormEvent, useContext, useEffect, useState } from "react";
import { post } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function CreateProduct() {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext) as AuthContextType;

  const router = useRouter();
  const params = useSearchParams();

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    post(backendUrl("auth/login"), payload).then((data: AuthData) => {
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
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-1 lg:space-y-4">
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

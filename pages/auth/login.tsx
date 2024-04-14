import React, { FormEvent, useLayoutEffect, useState } from "react";
import { post } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    post(backendUrl("auth/login"), data).then((res: AuthData) => {
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
            <label className="label">Email</label>
            <input
              className="input input-bordered"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input
              className="input input-bordered"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

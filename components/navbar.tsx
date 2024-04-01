import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";

function Navbar() {
  const { data } = useContext(AuthContext) as AuthContextType;

  const items = [
    { name: "Home", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            {process.env.NEXT_PUBLIC_APP_TITLE}
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {items.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
            <li>
              {data?.user && (
                <details>
                  <summary>{data?.user?.name}</summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    <li>
                      <a>Account</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </details>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

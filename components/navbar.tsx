import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";

function Navbar() {
  const { data } = useContext(AuthContext) as AuthContextType;

  const items = [
    { name: "Home", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "Cart", href: "/cart" },
    { name: "My Account", href: "/my-account" },
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {items.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost text-xl">
          Simple Ecommerce
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {items.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Logout</a>
      </div>
    </div>
  );
}

export default Navbar;

import "@/styles/globals.css";
import Navbar from "@/components/navbar";
("@/components/navbar");
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}

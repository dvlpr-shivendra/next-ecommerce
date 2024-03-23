import "@/styles/globals.css";
import Navbar from "@/components/navbar";
("@/components/navbar");
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-stretch">
        <Navbar />
        <div className="container mx-auto p-4 flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

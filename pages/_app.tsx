import "@/styles/globals.css";
import Navbar from "@/components/navbar";
("@/components/navbar");
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-stretch">
        <AuthProvider>
          <Navbar />
          <div className="container mx-auto flex-1">
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </div>
    </>
  );
}

import { Html, Head, Main, NextScript } from "next/document";
import { useEffect, useState } from "react";

export default function Document() {
  
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const [theme, setTheme] = useState("");

  return (
    <Html lang="en" data-theme={theme}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Head, Html, Main, NextScript } from "next/document";

//
export default function Document() {
  return (
    <Html className="h-full w-full" lang="en">
      <Head />
      <body className="h-full overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

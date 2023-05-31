import "@/styles/globals.css";

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider {...pageProps} localization={esES}>
        <Component {...pageProps} />
      </ClerkProvider>
      <Analytics />
    </>
  );
}

import "@/styles/globals.css";

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ErrorBoundary } from '@highlight-run/react';
import { HighlightInit } from '@highlight-run/next/highlight-init'
import { esES } from "@clerk/localizations";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HighlightInit
        projectId={'xdn62me0'}
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
      />
      <ErrorBoundary>
        <ClerkProvider {...pageProps} localization={esES}>
          <Component {...pageProps} />
        </ClerkProvider>
      </ErrorBoundary>
      <Analytics />
    </>
  );
}

import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} localization={esES}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

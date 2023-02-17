import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { localization } from "@/utils/localization";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} localization={localization}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

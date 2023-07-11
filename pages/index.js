import { AppRoot } from "@/components/AppRoot";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>WEG INSURANCE</title>
        <meta name="description" content="Weg Insurance SMS app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <AppRoot />
      </main>
    </>
  );
}

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { ChatWrapper } from "./components/chat-wrapper";
import { Suspense } from "react";
import { getAuthenticatedAppForUser } from "@/_lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";
import { getSingleFirebaseUser } from "@/_lib/firebase/firestore";
import { getTwilioMessages } from "@/_lib/twilio/server-actions";
import { notFound } from "next/navigation";

interface MessagesPageProps {
  searchParams: {
    userId?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function MessagesPage({
  searchParams,
}: MessagesPageProps) {
  // Validate required parameters
  if (!searchParams.userId || typeof searchParams.userId !== "string") {
    notFound();
  }

  try {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes
        },
      },
    });

    const { firebaseServerApp } = await getAuthenticatedAppForUser();
    const db = getFirestore(firebaseServerApp);

    const selectedFirebaseUser = await getSingleFirebaseUser(
      searchParams.userId,
      db
    );

    if (!selectedFirebaseUser?.user?.personal_info?.phone) {
      notFound();
    }

    const phone = selectedFirebaseUser.user.personal_info.phone;

    await queryClient.prefetchQuery({
      queryKey: ["firebase-user", searchParams.userId],
      queryFn: () => selectedFirebaseUser,
    }),
      await queryClient.prefetchQuery({
        queryKey: ["twilio-messages", searchParams.userId],
        queryFn: async () => {
          const { messages } = await getTwilioMessages(phone);
          return messages;
        },
      });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading chat...</div>}>
          <ChatWrapper userId={searchParams.userId} />
        </Suspense>
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Error loading messages page:", error);
    notFound();
  }
}

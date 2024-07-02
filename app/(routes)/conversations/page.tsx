"use client";

import { useEffect, useState } from "react";

import { createTwilioConversationToken } from "../../actions";

// import { Client as ConversationsClient } from "@twilio/conversations";

const ConversationsApp = () => {
  const [token, setToken] = useState<string>("");


  const getToken = async () => {
    const token = await createTwilioConversationToken();
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="flex-wrap">THIS IS THE NEW CONVERSATIONS TOKEN</p>
      <code>{token}</code>
    </div>
  );
};

export default ConversationsApp;

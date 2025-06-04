"use client";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const RefreshBtn = ({ fn }: { fn: () => Promise<void> }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <button
      onClick={async () => {
        setIsRefreshing(true);
        await fn();
        setIsRefreshing(false);
      }}
    >
      <ArrowPathIcon
        className={
          isRefreshing
            ? "animate-spin mr-1 text-blue-400 h-6 w-6 shadow-xs"
            : "mr-1 text-gray-400 h-6 w-6 shadow-xs hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        }
      />
    </button>
  );
};

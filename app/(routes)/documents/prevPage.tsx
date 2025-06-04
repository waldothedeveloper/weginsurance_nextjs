"use client";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const PreviousPageButton = ({ page }: { page: number }) => {
  return (
    <Link
      aria-disabled={page === 1 ? true : false}
      tabIndex={page === 1 ? -1 : undefined}
      scroll={false}
      href={page > 2 ? `/documents/?page=${page - 1}` : `/documents/?page=1`}
      className={
        page === 1
          ? "pointer-events-none inline-flex items-center gap-x-1.5 rounded-md bg-gray-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs"
          : "inline-flex items-center gap-x-1.5 rounded-md bg-gray-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      }
    >
      {" "}
      <ArrowLongLeftIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
    </Link>
  );
};

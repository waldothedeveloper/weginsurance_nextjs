"use client";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const NextPageButton = ({ page, items }: { page: number, items: number | undefined }) => {
  return (
    <Link
      scroll={false}
      aria-disabled={items && items === 0 ? false : true}
      tabIndex={items && items === 0 ? -1 : undefined}
      href={`/documents/?page=${page + 1}`}
      className={items && items !== 0 ? "inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" : "pointer-events-none inline-flex items-center gap-x-1.5 rounded-md bg-gray-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm"
      }
    >
      <ArrowLongRightIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
    </Link >
  );
};

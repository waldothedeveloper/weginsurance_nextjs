"use server";

import { revalidatePath } from "next/cache";

//
export const refreshSignedDocuments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  revalidatePath("/documents?page=1", "page");
};

import {
  IdentifiedUser,
  InsuranceCompany,
  RealUser,
  UploadedFile,
  VirtualizedConversationType,
} from "@/interfaces/index";

import { DocumentData } from "firebase/firestore";
import { Editor } from "@tiptap/core";
import { atom } from "jotai";
import dayjs from "dayjs";

//
export const userPhoneAtom = atom("");
export const userIdAtom = atom<string | null>(null);
export const selectedUserAtom = atom<RealUser | null>(null);
export const sendingSMSAtom = atom(true);
export const incomingSMSUserToIdentifyAtom = atom<IdentifiedUser | null>(null);
export const messagesListAtom = atom<VirtualizedConversationType | null>(null);
export const messagesAtom = atom<DocumentData | VirtualizedConversationType>(
  []
);
export const weeksAtom = atom(4);
export const toDateAtom = atom(dayjs());
export const fromDateAtom = atom((get) => {
  return get(toDateAtom).subtract(get(weeksAtom), "week");
});

export const editorAtom = atom<Editor | null>(null);
export const editorAtomwithImages = atom<Editor | null>(null);
export const progressPercentageAtom = atom(0);
export const numberOfFilesUploadedAtom = atom(0);
export const uploadedFilesAtom = atom<UploadedFile[]>([]);

export const selectedInsuranceCompanyAtom = atom<InsuranceCompany | null>(null);
export const isSubmittingAtom = atom<boolean>(false);
export const openModalAtom = atom<boolean>(false);

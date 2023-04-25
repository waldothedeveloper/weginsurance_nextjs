import {
  IdentifiedUser,
  RealUser,
  VirtualizedConversationType,
} from "@/interfaces/index";

import { Editor } from "@tiptap/core";
import { atom } from "jotai";
import dayjs from "dayjs";

//
export const userPhoneAtom = atom("");
export const selectedUserAtom = atom<RealUser | null>(null);
export const sendingSMSAtom = atom(true);
export const incomingSMSUserToIdentifyAtom = atom<IdentifiedUser | null>(null);
export const messagesListAtom = atom<VirtualizedConversationType | null>(null);
export const weeksAtom = atom(4);
export const toDateAtom = atom(dayjs());
export const fromDateAtom = atom((get) => {
  return get(toDateAtom).subtract(get(weeksAtom), "week");
});

export const editorAtom = atom<Editor | null>(null);
export const editorAtomwithImages = atom<Editor | null>(null);

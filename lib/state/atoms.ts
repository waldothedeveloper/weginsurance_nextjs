import { Conversation } from "@/interfaces/index";
import { atom } from "jotai";
//
export const userPhoneAtom = atom("");
export const selectedUserAtom = atom(null);
export const sendingSMSAtom = atom(true);
export const incomingSMSUserToIdentifyAtom = atom(null);
export const messagesListAtom = atom<Conversation | null>(null);

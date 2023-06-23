import { Message } from "@/interfaces/index";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

const filterProperties = (obj: Message, regex: RegExp) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !regex.test(key))
  );
};

export const addPropertiesToTwilioMessages = (message: MessageInstance) => {
  const newMessage = message as unknown as Message;
  newMessage.mediaUrl = [];
  newMessage.documentUrl = [];
  const filteredProperties = filterProperties(newMessage, /^_/) as Message;

  return filteredProperties;
};

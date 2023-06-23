import { Message } from "@/interfaces/index";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { addPropertiesToTwilioMessages } from "@/utils/addPropertiesToTwilioMessages";
import { getContentTypeFromUrl } from "@/utils/getContentTypeFromUrl";
import { nanoid } from "nanoid";

export const findMessagesWithMedia = async (
  arrayOfTwilioMessages: MessageInstance[]
): Promise<Message[] | Error> => {
  if (!Array.isArray(arrayOfTwilioMessages) || !arrayOfTwilioMessages.length) {
    return new Error(`Please provide a valid array of Twilio messages`);
  }

  try {
    // looping over the messages received from Twilio
    const upperPromises = arrayOfTwilioMessages.map(async (message) => {
      // copying the message object and removing the (private) properties that start with lower dash (_)
      const twilioMessages = addPropertiesToTwilioMessages(message);

      // if the message has no media, return the message as is
      if (!message?.numMedia?.length) {
        return twilioMessages;
      }

      // if the message has media, fetch the media and add the mediaUrl and documentUrl properties to the message object
      const media = await message.media().list();
      const mediaUrls = media.map(
        (m) => `https://api.twilio.com${m.uri.replace(".json", "")}`
      );

      // looping over the mediaUrls returned from Twilio
      const promises = mediaUrls.map(async (url) => {
        // find if messages have media (images or documents)
        const mediaHeaders = await getContentTypeFromUrl(url);

        // if the mediaHeaders is an Error, return the Error
        if (mediaHeaders instanceof Error) {
          return new Error(`Error fetching content type: ${mediaHeaders}`);
        }

        // if the mediaHeaders is an image, add the url to the mediaUrl property
        if (mediaHeaders && mediaHeaders.startsWith("image/")) {
          if (!twilioMessages?.mediaUrl) {
            twilioMessages.mediaUrl = [url];
          } else {
            twilioMessages.mediaUrl = [...twilioMessages.mediaUrl, url];
          }
          return twilioMessages;
          // if the mediaHeaders is a document, add the url to the documentUrl property
        } else if (mediaHeaders && mediaHeaders.startsWith("application/")) {
          if (!twilioMessages?.documentUrl) {
            twilioMessages.documentUrl = [
              {
                url,
                type: mediaHeaders,
                name: `Documento ${nanoid()}`,
              },
            ];
          } else {
            twilioMessages.documentUrl = [
              ...twilioMessages.documentUrl,
              {
                url,
                type: mediaHeaders,
                name: `Documento ${nanoid()}`,
              },
            ];
          }
          return twilioMessages;
        } else {
          return twilioMessages;
        }
      });

      await Promise.all(promises);
      return twilioMessages;
    });

    const allMessages = await Promise.all(upperPromises);
    return allMessages;
  } catch (error) {
    return new Error(`Error fetching messages: ${error}`);
  }
};

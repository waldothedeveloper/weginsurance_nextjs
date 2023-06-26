/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable quote-props */
import { InboundMessage, document } from "./types";

import { getContentTypeFromUrl } from "./getContentTypeFromUrl";

export const returnIncomingMedia = async (
  numMedia: string,
  message: InboundMessage,
  mediaType: string
) => {
  // if the message has no media, return the message as is
  if (!numMedia.length) {
    return [];
  }

  const mediaUrls: (string | document)[] = [];
  const numMediaInt = parseInt(numMedia, 10);

  for (let i = 0; i < numMediaInt; i++) {
    const mediaUrl = message[`MediaUrl${i}` as keyof typeof message];

    if (mediaUrl !== undefined) {
      const mediaHeaders = await getContentTypeFromUrl(mediaUrl);

      if (!(mediaHeaders instanceof Error)) {
        if (
          mediaHeaders.startsWith(mediaType) &&
          mediaType.includes("image/")
        ) {
          mediaUrls.push(mediaUrl);
        }

        if (
          mediaHeaders.startsWith(mediaType) &&
          mediaType.includes("application/")
        ) {
          mediaUrls.push({
            url: mediaUrl,
            type: mediaHeaders,
            name: "Documento",
          });
        }
      }
    }
  }

  return mediaUrls;
};

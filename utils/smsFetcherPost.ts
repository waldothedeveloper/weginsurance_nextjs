export const smsFetcherPost = async (
  url: string,
  message: string,
  phone: string,
  attachmentsArray: string[] | null
) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message_body: message,
      user_phone: phone,
      attachments: attachmentsArray,
    }),
  }).then((response) => response.json());

  return result;
};

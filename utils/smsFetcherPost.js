export const smsFetcherPost = async (url, message, phone) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message_body: message,
      user_phone: phone,
    }),
  }).then((response) => response.json());

  return result;
};

//  message_body, user_phone

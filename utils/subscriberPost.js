export const subscriberPost = async (url, subscriberId) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscriberId,
    }),
  }).then((response) => response.json());

  return result;
};

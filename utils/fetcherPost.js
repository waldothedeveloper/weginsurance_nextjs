export const fetcherPost = async (
  url,
  message,
  subscriberId,
  notificationName
) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      subscriberId,
      notificationName,
    }),
  }).then((response) => response.json());

  return result;
};

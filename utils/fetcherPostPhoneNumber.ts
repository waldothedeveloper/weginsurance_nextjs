export const fetcherPostPhoneNumber = async (
  url: string,
  phone: string | null
) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_phone: phone,
    }),
  }).then((res) => res.json());
};

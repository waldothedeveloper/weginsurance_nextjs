export const fetcherPostPhoneNumber = async (
  url: string,
  { arg }: { arg: string }
) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_phone: arg,
    }),
  }).then((res) => res.json());
};

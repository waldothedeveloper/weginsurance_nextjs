/* eslint-disable object-curly-spacing */
export const getContentTypeFromUrl = async (
  url: string
): Promise<string | Error> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response?.headers?.get("content-type") || "";
    return contentType;
  } catch (error) {
    return new Error(`Error fetching content type: ${error}`);
  }
};

export const runtime = "edge";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
  const requestHeaders = new Headers(request.headers);
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  const encodedToken = Buffer.from(
    `${process.env.ANVIL_PRODUCTION}`,
    "ascii"
  ).toString("base64");

  if (!url) {
    return Response.json({ message: "Please provide a URL" });
  }
  const res = await fetch(url, {
    headers: {
      redirect: "follow",
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
      Authorization: `Basic ${encodedToken}`,
    },
  });
  const data = await res.blob();

  return new Response(data, {
    status: 200,
    headers: requestHeaders,
  });
}

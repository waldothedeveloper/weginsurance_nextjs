import { Novu } from "@novu/node";
import { novuAPIKEY } from "@/utils/novuAPI";
const novu = new Novu(novuAPIKEY);

//
export default async function handler(req, res) {
  const { subscriberId } = req?.body || null;

  if (!subscriberId) {
    return res.status(404).json({ message: `A valid user ID is required!` });
  }
  try {
    const result = await novu.subscribers.identify(subscriberId, {});

    const { status, statusText } = result;

    if (status === 201 && statusText === "Created") {
      return res.status(200).json({
        message: statusText,
        status,
        subscriberId,
      });
    } else {
      return res.status(400).json({
        message: { status, message: statusText, subscriberId },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Our system has detected an unexpected error.`,
      status: error?.status || 500,
      subscriberId,
    });
  }
}

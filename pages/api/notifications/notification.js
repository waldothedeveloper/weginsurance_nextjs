import { Novu } from "@novu/node";
import { novuAPIKEY } from "@/utils/novuAPI";

const novu = new Novu(novuAPIKEY);

//
export default async function handler(req, res) {
  const { message, subscriberId, notificationName } = req?.body || null;

  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ message: "This endpoint requires a POST request!" });
  }

  if (!message) {
    return res.status(404).json({ message: "A valid message is required!" });
  }

  if (!subscriberId) {
    return res
      .status(404)
      .json({ message: "A valid subscriberId is required!" });
  }

  if (!notificationName) {
    return res
      .status(404)
      .json({ message: "A valid notificationName is required!" });
  }

  try {
    const result = await novu.trigger(notificationName, {
      to: {
        subscriberId,
      },
      payload: {
        message,
      },
    });

    const { data } = result?.data || null;

    if (!data) {
      return res.status(500).json({
        message: "Hemos detectado un error inesperado. Intentelo nuevamente.",
        status: 500,
      });
    }

    if (data?.acknowledged && data?.status === "processed") {
      return res.status(200).json({ message, status: data?.status });
    } else {
      return res.status(500).json({
        message: "Hemos detectado un error inesperado. Intentelo nuevamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Hemos detectado un error inesperado. Intentelo nuevamente.",
      status: error?.status || 500,
      error: error,
    });
  }
}

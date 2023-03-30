export default function handler(req, res) {
  if (req.method !== `POST`) {
    return res
      .status(404)
      .json({ message: `This endpoint requires a POST request!` });
  }

  try {
    const { SmsStatus, MessageStatus, To, From } = req?.body || null;

    if (!SmsStatus || !MessageStatus || !To || !From) {
      return res.status(404).json({
        message: `A valid SMS status is required!`,
        status: 400,
      });
    } else {
      return res.status(200).json({
        messageStatus: MessageStatus,
        smsStatus: SmsStatus,
        to: To,
        from: From,
      });
    }
  } catch (error) {
    // console.log("ERROR ON CALLBACK SMS MESSAGE: ", error);
    return res.status(500).json({
      message: `Our system has detected an unexpected error.`,
      status: error?.status || 500,
      error: error,
    });
  }
}

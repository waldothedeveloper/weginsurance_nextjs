import { Day, TwilioAPIMessage } from "@/interfaces/index";
export const transformMessages = (
  userId: string | null,
  originalArray: (TwilioAPIMessage & Day)[]
) => {
  const conversation = originalArray.map((obj) => {
    if (obj.type !== "day") {
      return {
        mediaUrl: [],
        from: obj.from,
        direction: obj.direction,
        body: obj.body,
        delivery: {
          state: obj.status,
          startTime: {
            seconds: obj.dateSent,
            nanoseconds: 0,
          },
          info: {
            dateSent: new Date(obj.dateSent),
            numSegments: obj.numSegments,
            dateUpdated: {
              seconds: new Date(obj.dateUpdated).getTime() / 1000,
              nanoseconds: 0,
            },
            numMedia: obj.numMedia,
            status: obj.status,
            messagingServiceSid: null,
            messageSid: obj.sid,
            dateCreated: {
              seconds: new Date(obj.dateUpdated).getTime() / 1000,
              nanoseconds: 0,
            },
          },
          errorCode: obj.errorCode,
          leaseExpireTime: null,
          endTime: {
            seconds: new Date(obj.dateUpdated).getTime() / 1000,
            nanoseconds: 0,
          },
          errorMessage: obj.errorMessage,
        },
        to: obj.to,
        sid: obj.sid,
        userId: obj.direction === "outbound-api" ? userId : null,
        dateCreated: new Date(obj.dateCreated).toISOString(),
      };
    } else {
      return obj;
    }
  });

  return conversation;
};

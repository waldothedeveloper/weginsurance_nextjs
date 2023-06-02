import { Message } from "@/interfaces/index";
import dayjs from "dayjs";

export const excludeRepeatedDateHeaders = (data: Message[]) => {
  return data.reduce((result, current) => {
    const formattedDate = dayjs(current.dateCreated).format("YYYY-MM-DD");
    if (!result.includes(formattedDate as never)) {
      result.push(formattedDate as never);
    }
    return result;
  }, []);
};

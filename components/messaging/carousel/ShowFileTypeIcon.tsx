type ShowFileTypeIconProps = {
  fileType: string | undefined;
  classString: string;
};

import {
  BsFiletypeCsv,
  BsFiletypeDoc,
  BsFiletypePdf,
  BsFiletypePptx,
  BsFiletypePsd,
  BsFiletypeTiff,
  BsFiletypeTxt,
} from "react-icons/bs";

import { DocumentIcon } from "@heroicons/react/24/outline";

/*
https://www.twilio.com/docs/sms/accepted-mime-types
*/

export const ShowFileTypeIcon = ({ fileType, classString }: ShowFileTypeIconProps) => {
  if (!fileType) return null;
  switch (fileType) {
    case "txt":
      return <BsFiletypeTxt className={classString} />;
    case "application/pdf":
      return <BsFiletypePdf className={classString} />;
    case "csv":
      return <BsFiletypeCsv className={classString} />;
    case "application/msword":
      return <BsFiletypeDoc className={classString} />;
    case "application/vnd.ms-powerpoint":
      return <BsFiletypePptx className={classString} />;
    case "psd":
      return <BsFiletypePsd className={classString} />;
    case "tiff":
      return <BsFiletypeTiff className={classString} />;
    case "text/vcard":
    case "text/x-vcard":
    case "text/csv":
    case "text/rtf":
    case "text/richtext":
    case "text/calendar":
    case "text/directory":
    case "application/vcard":
    case "application/vnd.apple.pkpass":
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <BsFiletypeDoc className={classString} />;
    default:
      return <DocumentIcon className={classString} />;
  }
};



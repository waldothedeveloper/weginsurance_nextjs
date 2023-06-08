type ShowFileTypeIconProps = {
  fileType: string | undefined;
  classString: string;
};

import {
  BsFiletypeCsv,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePdf,
  BsFiletypePpt,
  BsFiletypePptx,
  BsFiletypePsd,
  BsFiletypeTiff,
  BsFiletypeTxt,
} from "react-icons/bs";

import { DocumentIcon } from "@heroicons/react/24/outline";

export const ShowFileTypeIcon = ({
  fileType,
  classString,
}: ShowFileTypeIconProps) => {
  if (!fileType) return null;
  switch (fileType) {
    case "txt":
      return <BsFiletypeTxt className={classString} />;
    case "pdf":
      return <BsFiletypePdf className={classString} />;
    case "csv":
      return <BsFiletypeCsv className={classString} />;
    case "doc":
      return <BsFiletypeDoc className={classString} />;
    case "docx":
      return <BsFiletypeDocx className={classString} />;
    case "ppt":
      return <BsFiletypePpt className={classString} />;
    case "pptx":
      return <BsFiletypePptx className={classString} />;
    case "psd":
      return <BsFiletypePsd className={classString} />;
    case "tiff":
      return <BsFiletypeTiff className={classString} />;
    default:
      return <DocumentIcon className={classString} />;
  }
};

import Image from "next/image";

export const LocalImage = ({
  files,
  getRootProps,
  getInputProps,
  isDragActive,
  isDragReject,
  isDragAccept,
}) => {
  const ifUserUploadsImageOrDocument =
    !isDragActive &&
    files &&
    files.length > 0 &&
    files.map((file) => (
      <span className="relative aspect-[3/2]" key={file.name}>
        <Image
          className="rounded-2xl object-cover"
          src={file.preview}
          alt="file preview"
          height={400}
          width={600}
          onLoadingComplete={() => URL.revokeObjectURL(file.preview)}
        />
      </span>
    ));

  return (
    <div className="isolate ml-3 flex max-w-xs -space-x-32 overflow-hidden">
      {ifUserUploadsImageOrDocument}
    </div>
  );
};

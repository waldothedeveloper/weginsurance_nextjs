import { failureNotification } from "../components/notifications/failureNotification";
import { fetcherPost } from "../utils/fetcherPost";
import { handleUploadErrors } from "../utils/handleUploadErrors";
import { useUploadFilesWithProgressFeedback } from "../hooks/fileUploader/useUploadFilesWithProgressFeedback";

describe("useUploadFilesWithProgressFeedback", () => {
  it("should upload files to cloud storage", async () => {
    const files = [
      new File(["hello"], "hello.txt", { type: "text/plain", id: "1" }),
      new File(["world"], "world.txt", { type: "text/plain", id: "2" }),
    ];
    const refPath = "test";
    const uploadTask = {
      on: jest.fn(),
      snapshot: {
        ref: {
          fullPath: "test/hello.txt",
        },
      },
    };
    const getDownloadURL = jest.fn().mockResolvedValue("https://example.com");
    const uploadBytesResumable = jest.fn().mockReturnValue(uploadTask);
    const handleProgressUpload = jest.fn();
    const handleUploadErrors = jest.fn();

    const { uploadFilesToCloudStorage } = useUploadFilesWithProgressFeedback();

    const result = await uploadFilesToCloudStorage(files, refPath);

    expect(uploadBytesResumable).toHaveBeenCalledTimes(2);
    expect(uploadBytesResumable).toHaveBeenCalledWith(
      expect.any(Object),
      files[0],
      { contentType: files[0].type }
    );
    expect(uploadBytesResumable).toHaveBeenCalledWith(
      expect.any(Object),
      files[1],
      { contentType: files[1].type }
    );
    expect(uploadTask.on).toHaveBeenCalledTimes(2);
    expect(uploadTask.on).toHaveBeenCalledWith(
      "state_changed",
      handleProgressUpload
    );
    expect(getDownloadURL).toHaveBeenCalledTimes(2);
    expect(getDownloadURL).toHaveBeenCalledWith(uploadTask.snapshot.ref);
    expect(handleUploadErrors).not.toHaveBeenCalled();
    expect(result).toEqual([
      { ...files[0], url: "https://example.com" },
      { ...files[1], url: "https://example.com" },
    ]);
  });
});

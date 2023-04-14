import { useAtom } from "jotai";
import { useRetrieveConversation } from "@/hooks/messaging/useRetrieveConversation";
import { weeksAtom } from "@/lib/state/atoms";

export const GetMessagesListButton = () => {
  const [intervalWeeks, setIntervalWeeks] = useAtom(weeksAtom);

  const { dataFromApp, setSizeFromApp, errorFromApp, sizeFromApp } =
    useRetrieveConversation();

  return (
    <div className="flex min-h-screen flex-col items-center">
      <button
        onClick={() => {
          setSizeFromApp(1);
        }}
        className="mt-2 rounded-xl bg-gray-200 p-4"
        type="button"
      >
        <h4>Waldo Lavaut</h4>
        <span> +17865213075</span>
      </button>
      <button
        className="mt-2 rounded-xl bg-gray-200 p-4"
        // disabled={isLoadingMore || isReachingEnd}
        onClick={() => {
          setSizeFromApp(sizeFromApp + 1);
          setIntervalWeeks(intervalWeeks + 4);
        }}
      >
        Load more
      </button>
    </div>
  );
};

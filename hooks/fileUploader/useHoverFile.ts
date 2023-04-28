import { useCallback, useState } from "react";

export const useHoverFile = () => {
  const [isCurrentHoveredFile, setIsCurrentHoveredFile] = useState(-1);

  const handleMouseOver = useCallback((index: number) => {
    setIsCurrentHoveredFile(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsCurrentHoveredFile(-1);
  }, []);

  return { isCurrentHoveredFile, handleMouseOver, handleMouseLeave };
};

import { useEffect, useState } from "react";

export const useIsPc = () => {
  const [isPc, setIsPc] = useState(true);
  useEffect(() => {
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      setIsPc(false);
    } else {
      setIsPc(true);
    }
  }, []);
  return isPc;
};

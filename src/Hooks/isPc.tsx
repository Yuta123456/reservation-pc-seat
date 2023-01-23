"use client";
import { useEffect, useState } from "react";

export const useIsPc = (initState: boolean | undefined) => {
  const [isPc, setIsPc] = useState<boolean | undefined>(initState);
  useEffect(() => {
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      setIsPc(false);
    } else {
      setIsPc(true);
    }
  }, []);
  return isPc;
};

"use client";
import { useCallback, useEffect, useState } from "react";
export const useTime = (interval: number) => {
  const getTime = useCallback(() => {
    return Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000;
  }, []);
  const [time, updateTime] = useState(getTime());
  useEffect(() => {
    const timeoutId = setTimeout(() => updateTime(getTime()), interval);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

  return time;
};

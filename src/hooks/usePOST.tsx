"use client";
import { useState, useEffect } from "react";

export default function usePOST() {
  const [data, setData] = useState<Record<string, string> | null>(null);
  const [isError, setIsError] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const fetchPOST = async (url: string, SentData: FormData | object) => {
    if (controller) {
      controller.abort();
    }
    const newController = new AbortController();
    setController(newController);

    setIsLoading(true);
    setIsError(null);
    setData(null)

    try {
      const isFormData = SentData instanceof FormData;
      const response = await fetch(`/api/${url}`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: isFormData ? SentData : JSON.stringify(SentData),
        signal: newController.signal,
      });

      const resData = await response.json();

      if (!response.ok) {
        setIsLoading(null);
        setIsError(resData);
        return;
      }

      setIsLoading(null);
      setIsError(null);
      setData(resData);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.error("Fetching failed", error);
        setIsError({ error: "Failed to fetch API abort" });
        setIsLoading(null);
        return false;
      } else {
        console.error("Fetching failed", error);
        setIsError({ error: "Internal Server error" });
        setIsLoading(null);
        return false;
      }
    }
  };
  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  return { isError, isLoading, data, fetchPOST };
}

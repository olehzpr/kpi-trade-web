"use client";

import { useLayoutEffect } from "react";

type LoadingSpinnerProps = {
  description: string;
};

export default function LoadingSpinner({ description }: LoadingSpinnerProps) {
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="container my-auto min-h-[calc(100vh - 5rem)]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-neutral-500">{description}</p>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

type LoadingSpinnerProps = {
  description: string;
};

export default function LoadingSpinner({ description }: LoadingSpinnerProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100dvh-5rem)]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-neutral-500">{description}</p>
      </div>
    </div>
  );
}

'use client'; 

import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-white text-black">
      <RiAlarmWarningFill size={60} className="animate-flicker text-red-500" />
      <h1 className="mt-4 text-4xl md:text-6xl">Oops, something went wrong!</h1>
      <button
        onClick={() => {
          reset();
          window.location.reload();
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try Again
      </button>
    </main>
  );
}

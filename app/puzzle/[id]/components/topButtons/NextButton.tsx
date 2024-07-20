'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TransitionStartFunction } from "react";

const NextButton: React.FC<{
  nextId: string;
  disabled: boolean;
  startLoadingNextTransition: TransitionStartFunction;
}> = ({ nextId, disabled, startLoadingNextTransition }) => {
  const router = useRouter();

  // Link for preloading, nested button for easier disabled styling
  return <Link
    href={nextId}
    onClick={() => startLoadingNextTransition(() => {
      router.push(nextId);
    })}
  >
    <button
      className="rounded-full border border-transparent py-1 px-3 text-white flex items-center bg-gray-900 [&:not(:disabled)]:active:bg-gray-600 [&:not(:disabled)]:hover:bg-gray-600 disabled:opacity-50 font-medium text-base transition-colors"
      disabled={disabled}
    >
      Next
      <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
      </svg>
    </button>
  </Link>
}

export default NextButton;

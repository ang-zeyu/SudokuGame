'use client'

import Link from "next/link";

const NextButton: React.FC<{ nextId: string }> = ({ nextId }) => {
  return <Link
    className="rounded-full border border-transparent py-1 px-3 text-white flex items-center bg-gray-900 active:bg-gray-600 hover:bg-gray-600 font-medium text-base transition-colors"
    href={nextId}
  >
    Next
    <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
    </svg>
  </Link>
}

export default NextButton;

'use client'

const ResetButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => {
  return <button
    className="rounded-full border border-gray-300 py-1 px-3 text-red-500 disabled:text-gray-500 flex items-center bg-white active:bg-gray-200 hover:bg-gray-200 disabled:bg-gray-50 font-medium text-base transition-colors"
    onClick={onClick}
    disabled={disabled}
  >
    <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
    Reset
  </button>
}

export default ResetButton;

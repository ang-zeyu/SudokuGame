'use client';

const EraseButton: React.FC<{
  erasable: null | boolean;
  onClick: () => void;
}> = ({ erasable, onClick }) => {
  return (
    <button
      className={
        'rounded-full h-10 px-3 ml-3 flex self-start items-center font-medium text-base transition-colors' +
        (erasable
          ? ' bg-gray-200 active:bg-gray-400 hover:bg-gray-400'
          : ' text-gray-400 bg-gray-300 cursor-default')
      }
      onClick={onClick}
      disabled={!erasable}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-5 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      Erase
    </button>
  );
};

export default EraseButton;

'use client';

const NumberButton: React.FC<{
  num: number;
  isEditableCellSelected: boolean;
  onClick: (num: number) => void;
}> = ({ num, isEditableCellSelected, onClick }) => {
  return (
    <button
      className={
        'flex items-center justify-center w-10 h-10 rounded-full text-center align-middle transition-colors' +
        (isEditableCellSelected
          ? ' text-black bg-gray-200 active:bg-gray-400 hover:bg-gray-400'
          : ' text-gray-400 bg-gray-300 cursor-default')
      }
      onClick={() => onClick(num)}
      disabled={!isEditableCellSelected}
    >
      {num}
    </button>
  );
};

export default NumberButton;

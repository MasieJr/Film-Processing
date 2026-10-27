type StepperProps = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
};
export default function Strepper({
  quantity,
  increment,
  decrement,
}: StepperProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center w-full">
        <button
          type="button"
          onClick={decrement}
          className="px-5 py-3 bg-ffblue dark:bg-ffgreen rounded-l-xl border border-ffblue dark:border-ffgreen"
        >
          <span className="text-xl font-bold text-gray-700 dark:text-white">
            −
          </span>
        </button>

        <div className="min-w-20 flex-grow flex items-center justify-center py-3 border-y border-ffblue dark:border-ffgreen bg-white dark:bg-[#1a1a1a] text-xl font-bold">
          {quantity}
        </div>
        <button
          type="button"
          onClick={increment}
          className="px-5 py-3 bg-ffblue dark:bg-ffgreen rounded-r-xl border border-ffblue dark:border-ffgreen"
        >
          <span className="text-xl font-bold text-white">+</span>
        </button>
      </div>
    </div>
  );
}

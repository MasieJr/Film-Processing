type RadioProps = {
  isSelected: boolean;
  option: string;
  description: string;
  select: () => void;
};
export default function Radio({
  isSelected,
  option,
  description,
  select,
}: RadioProps) {
  return (
    <div
      role="button"
      onClick={select}
      className="flex flex-row gap-3 p-2 border border-ffgreen items-center rounded-md active:bg-red-500 active:scale-95"
    >
      <div className="flex w-6 h-6 rounded-full border border-ffgreen items-center justify-center">
        {isSelected && <div className="rounded-full w-3 h-3 bg-ffgreen" />}
      </div>
      <div>
        <p>{option}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}

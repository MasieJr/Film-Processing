import { ArrowLeft, ArrowRight } from "lucide-react";

type SectionButtonProps = {
  currentSection: number;
  changeSection: (newSection: number) => void;
};

export default function SectionButton({
  currentSection,
  changeSection,
}: SectionButtonProps) {
  return (
    <div className="flex flex-row items-center justify-around">
      {currentSection > 1 && (
        <button
          type="button"
          className="flex flex-row gap-1 text-xl items-center active:scale-90"
          onClick={() => changeSection(currentSection - 1)}
        >
          <ArrowLeft /> Back
        </button>
      )}

      {currentSection < 4 ? (
        <button
          type="button"
          className="flex flex-row gap-1 ml-auto bg-ffgreen dark:bg-ffblue p-4 text-xl text-bold rounded-xl items-center active:scale-90"
          onClick={() => changeSection(currentSection + 1)}
        >
          Continue
          <ArrowRight />
        </button>
      ) : (
        <button
          type="button"
          className="flex flex-row gap-1 ml-auto bg-ffgreen dark:bg-ffblue p-4 text-xl text-bold rounded-xl items-center"
          onClick={() => changeSection(currentSection + 1)}
        >
          Continue
          <ArrowRight />
        </button>
      )}
    </div>
  );
}

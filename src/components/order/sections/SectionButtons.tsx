import { ArrowLeft, ArrowRight } from "lucide-react";

type SectionButtonProps = {
  currentSection: number;
  changeSection: (newSection: number) => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
};

export default function SectionButton({
  currentSection,
  changeSection,
  onNext,
  onSubmit,
  isSubmitting = false,
}: SectionButtonProps) {
  const handleContinue = () => {
    if (onNext) {
      onNext(); // Let the active section validate first, then call changeSection
    } else {
      changeSection(currentSection + 1);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between pt-4">
      {currentSection > 1 && (
        <button
          type="button"
          disabled={isSubmitting}
          className="flex flex-row gap-1 text-xl items-center active:scale-90 disabled:opacity-50"
          onClick={() => changeSection(currentSection - 1)}
        >
          <ArrowLeft /> Back
        </button>
      )}

      {currentSection < 4 ? (
        <button
          type="button"
          className="flex flex-row gap-1 ml-auto bg-ffgreen dark:bg-ffblue p-4 text-xl font-bold rounded-xl items-center active:scale-90"
          onClick={handleContinue}
        >
          Continue
          <ArrowRight />
        </button>
      ) : (
        <button
          type="button"
          disabled={isSubmitting}
          className="flex flex-row gap-1 ml-auto bg-ffgreen dark:bg-ffblue p-4 text-xl font-bold rounded-xl items-center active:scale-90 disabled:opacity-50"
          onClick={onSubmit}
        >
          {isSubmitting ? "Placing order..." : "Place order"}
          <ArrowRight />
        </button>
      )}
    </div>
  );
}

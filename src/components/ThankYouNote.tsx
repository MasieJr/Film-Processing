import { ElementType, ReactNode } from "react";

type ThankYouNoteProps = {
  icon: ElementType;
  heading: string;
  text: ReactNode;
};

export default function ThankYouNote({
  icon: Icon,
  heading,
  text,
}: ThankYouNoteProps) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <Icon className="w-5 h-5 text-[#41B544]" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">{heading}</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{text}</p>
      </div>
    </div>
  );
}

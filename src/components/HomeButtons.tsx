import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ElementType } from "react";

type HomeButtonProp = {
  link: string;
  heading: string;
  text: string;
  action: string;
  icon: ElementType;
};

export default function HomeButton({
  link,
  heading,
  text,
  action,
  icon: Icon,
}: HomeButtonProp) {
  return (
    <Link
      href={link}
      className="group relative bg-[#F3F4F6] dark:bg-[#2c2c2c] p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-blue-500 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-gray-700 dark:text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {heading}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 flex-grow">
          {text}
        </p>
        <div className="flex items-center text-[#41B544] font-bold">
          {action}
          <MoveRight className="w-5 h-5 ml-2" />
        </div>
      </div>
    </Link>
  );
}

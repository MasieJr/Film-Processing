import { ElementType } from "react";

type IconTextProps = {
  text: string;
  icon: ElementType;
};

export default function IconText({ text, icon: Icon }: IconTextProps) {
  return (
    <div className="flex flex-row gap-5">
      <Icon className="w-5 h-5 text-ffgreen" />
      <p className="text-sm ">{text}</p>
    </div>
  );
}

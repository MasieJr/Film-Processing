import Image from "next/image";
import Strepper from "./options/stepper";
import RadioGroup from "../RadioGroup";
import Radio from "./options/radio";
import { useState } from "react";
import SectionButton from "./SectionButtons";

type FilmOptionsProps = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  currentSection: number;
  changeSection: (section: number) => void;
};

export default function FilmOptions({
  quantity,
  increment,
  decrement,
  currentSection,
  changeSection,
}: FilmOptionsProps) {
  const [isHalfFrame, setIsHalfFrame] = useState(false);
  const [keepNegatives, setKeepNegatives] = useState(false);
  return (
    <div className="min-h-screen mt-2 max-w-lg mx-auto p-5 space-y-3">
      <h1 className="text-4xl font-bold">2. Film Options</h1>
      <p className="text-xs text-gray-400">
        How many rolls are you developing and select your films options.
      </p>
      <div className="flex flex-row items-center justify-around">
        <Image
          alt="film canister"
          src={"/images/colourplus.webp"}
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-2">
          <p>How many rolls?</p>
          <Strepper
            quantity={quantity}
            decrement={decrement}
            increment={increment}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xl font-bold">Is Your film half frame?</p>
        <p className="text-xs text-gray-400">
          Please note if you select no and your film is indeed half frame it
          will be processed or printed as a single frame i.e two prints on one
          frame
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Radio
            isSelected={isHalfFrame}
            option="Yes"
            description="Half-frame exposures(~72)"
            select={() => setIsHalfFrame(true)}
          />
          <Radio
            isSelected={!isHalfFrame}
            option="No"
            description="Standard exposures(~36)"
            select={() => setIsHalfFrame(false)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xl font-bold">Do you want your negatives back?</p>
        <div className="grid grid-cols-2 gap-3">
          <Radio
            isSelected={keepNegatives}
            option="Yes"
            description="Half-frame exposures(~72)"
            select={() => setKeepNegatives(true)}
          />
          <Radio
            isSelected={!keepNegatives}
            option="No"
            description="Standard exposures(~36)"
            select={() => setKeepNegatives(false)}
          />
        </div>
      </div>
      <SectionButton
        changeSection={changeSection}
        currentSection={currentSection}
      />
    </div>
  );
}

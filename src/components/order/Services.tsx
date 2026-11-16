import { useState } from "react";
import RadioGroup from "../RadioGroup";
import SectionButton from "./sections/SectionButtons";
import {
  services,
  prices,
  printPrices,
  printsSizes,
  finishes,
  surcharges,
  devSurcharge,
} from "@/lib/services";
import SectionHeader from "./sections/SectionHeader";

type ServicesProps = {
  quantity: number;
  halfFrameQuantity?: number;
  handleSubmit: (service: string, size: string, finish: string) => void;
  isSubmitting: boolean;
  currentSection: number;
  changeSection: (section: number) => void;
};
export default function Services({
  quantity,
  halfFrameQuantity,
  handleSubmit,
  isSubmitting,
  currentSection,
  changeSection,
}: ServicesProps) {
  const [selectedServiceIndex, setSelectedServicesIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);

  const size = printsSizes[selectedSizeIndex];
  const finish = finishes[selectedFinishIndex];
  const service = services[selectedServiceIndex];
  const isPrintService =
    service === "Print Only" || service === "Print and email";
  // Derived price: automatically updates whenever service, print size, or quantities change
  const calculateTotalPrice = () => {
    const qty = quantity || 0;
    const hfQty = halfFrameQuantity || 0;
    if (isPrintService) {
      const printUnitPrice = printPrices[selectedSizeIndex] ?? 0;
      const extraPrints = hfQty * (surcharges[selectedSizeIndex] ?? 0);
      return printUnitPrice * qty + extraPrints;
    }
    if (service === "Develop only") {
      const devPrice = prices[selectedServiceIndex];
      return devPrice * quantity;
    }
    const devUnitPrice = prices[selectedServiceIndex] ?? 0;
    return devSurcharge * hfQty + devUnitPrice * qty;
  };
  const price = calculateTotalPrice();

  return (
    <div className="min-h-screen mt-2 max-w-lg mx-auto p-5 space-y-3">
      <SectionHeader
        heading="3. Services"
        subHeading="
        Please selected the services you want us to do."
      />
      {/* redo the radio buttons into cards after  */}
      <div className="space-y-3">
        <RadioGroup
          label="Select Service"
          options={services}
          selectedIndex={selectedServiceIndex}
          onChange={setSelectedServicesIndex}
          price={prices}
        />
        {/* Prints Sizes */}
        {(service === "Print Only" || service === "Print and email") && (
          <RadioGroup
            label="Print Size"
            options={printsSizes}
            selectedIndex={selectedSizeIndex}
            onChange={setSelectedSizeIndex}
            price={printPrices}
          />
        )}
        {/** --- Paper Finish --- **/}
        {(service === "Print Only" || service === "Print and email") && (
          <RadioGroup
            label="Paper Finish"
            options={finishes}
            selectedIndex={selectedFinishIndex}
            onChange={setSelectedFinishIndex}
          />
        )}
      </div>
      <div className="fixed w-[90%] bottom-0 z-10 py-3 border-t bg-white dark:bg-[#1e1e1e] ">
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-red-500">R{price}</span>
        </div>
        <SectionButton
          changeSection={changeSection}
          currentSection={currentSection}
        />
      </div>
    </div>
  );
}

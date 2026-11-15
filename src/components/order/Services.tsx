import { useState } from "react";
import RadioGroup from "../RadioGroup";
import SectionButton from "./SectionButtons";
import {
  services,
  prices,
  printPrices,
  printsSizes,
  finishes,
  surcharges,
  devSurcharge,
} from "@/lib/services";

type ServicesProps = {
  quantity: number;
  halfFrameQuantity?: number;
  handleSubmit: () => void;
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
  const [service, setSelectedService] = useState(services[0]);
  const [size, setSize] = useState(printsSizes[1]);
  const [finish, setFinish] = useState(finishes[0]);
  const isPrintService =
    service === "Print Only" || service === "Print and email";

  // Derived price: automatically updates whenever service, print size, or quantities change
  const calculateTotalPrice = () => {
    const qty = quantity || 0;
    const hfQty = halfFrameQuantity || 0;

    if (isPrintService) {
      const baseServicePrice = (prices[selectedServiceIndex] ?? 0) * qty;
      const printUnitPrice = printPrices[selectedSizeIndex] ?? 0;
      const extraPrints = hfQty * (surcharges[selectedSizeIndex] ?? 0);
      return baseServicePrice + printUnitPrice * qty + extraPrints;
    }

    const devUnitPrice = prices[selectedServiceIndex] ?? 0;
    return devSurcharge * hfQty + devUnitPrice * qty;
  };

  const price = calculateTotalPrice();

  return (
    <div className="min-h-screen mt-2 max-w-lg mx-auto p-5 space-y-3">
      <h1 className="text-4xl font-bold">3. Services</h1>
      <p className="text-xs text-gray-400">
        Please selected the services you want us to do.
      </p>
      <div>
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
      <div className="sticky bottom-0 z-10 py-3 border-t">
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

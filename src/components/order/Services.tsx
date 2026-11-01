import SectionButton from "./SectionButtons";

type ServicesProps = {
  price: number;
  handleSubmit: () => void;
  isSubmitting: boolean;
  currentSection: number;
  changeSection: (section: number) => void;
};
export default function Services({
  price,
  handleSubmit,
  isSubmitting,
  currentSection,
  changeSection,
}: ServicesProps) {
  return (
    <div className="min-h-screen mt-2 max-w-lg mx-auto p-5 space-y-3">
      <h1 className="text-4xl font-bold">3. Services</h1>
      <p className="text-xs text-gray-400">
        Please selected the services you want us to do.
      </p>
      <div></div>
      <div className="flex items-baseline space-x-2">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-2xl font-bold text-red-500">R{price}</span>
      </div>
      <SectionButton
        changeSection={changeSection}
        currentSection={currentSection}
      />
    </div>
  );
}

type EditSectionProps = {
  title: string;
  goToSection: () => void;
};

export default function EditSection({ title, goToSection }: EditSectionProps) {
  return (
    <div className="flex flex row justify-between">
      <h4 className="font-bold text-xl">{title}</h4>
      <button
        type="button"
        className="text-lg text-ffblue dark:text-ffgreen"
        onClick={goToSection}
      >
        edit
      </button>
    </div>
  );
}

type headerProps = {
  heading: string;
  subHeading: string;
};

export default function SectionHeader({ heading, subHeading }: headerProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold">{heading}</h1>
      <p className="text-xs text-gray-400">{subHeading}</p>
    </div>
  );
}

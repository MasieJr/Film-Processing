type sectionsProps = {
  selectedSection: number;
};

export default function Sections({ selectedSection }: sectionsProps) {
  return (
    <div className="flex flex-row items-center gap-2 justify-center text-xs text-black dark:text-white sticky top-0 backdrop-blur-lg">
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border border-ffgreen ${selectedSection > 1 ? "bg-ffblue dark:bg-ffgreen text-white" : "bg-ffblue"}`}
      >
        1
      </div>
      <div
        className={`w-15 bg-ffgreen h-[1px] ${selectedSection > 1 ? "h-[4px] bg-ffgreen" : "h-[1px] bg-gray-300"}`}
      />
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border border-ffgreen ${selectedSection === 2 ? "bg-ffgreen dark:bg-ffblue text-white" : selectedSection > 2 ? "bg-ffblue dark:bg-ffgreen text-white" : ""}`}
      >
        2
      </div>
      <div
        className={`w-15 h-[1px] ${selectedSection >= 2 ? "h-[4px] bg-ffgreen" : "h-[1px] bg-gray-300"}`}
      />
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border border-ffgreen  ${selectedSection === 3 ? "bg-ffgreen dark:bg-ffblue text-white" : selectedSection > 2 ? "bg-ffblue dark:bg-ffgreen text-white" : ""}`}
      >
        3
      </div>
      <div
        className={`w-15 h-[1px] ${selectedSection >= 3 ? "h-[4px] bg-ffgreen" : "h-[1px] bg-gray-300"}`}
      />
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border border-ffgreen  ${selectedSection === 4 ? "bg-ffgreen dark:bg-ffblue text-white" : selectedSection > 2 ? "bg-ffblue dark:bg-ffgreen text-white" : ""}`}
      >
        4
      </div>
    </div>
  );
}

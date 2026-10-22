type sectionsProps = {
  selectedSection: number;
};

export default function Sections({ selectedSection }: sectionsProps) {
  return (
    <div className="flex flex-row items-center gap-2 justify-center">
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border text-white border-ffgreen ${selectedSection >= 1 ? "bg-ffgreen" : ""}`}
      >
        1
      </div>
      <div
        className={`w-15 bg-ffgreen h-[1px] ${selectedSection >= 1 ? "h-[2px]" : "h-[1px"}`}
      />
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border text-white border-ffgreen ${selectedSection >= 2 ? "bg-ffgreen" : ""}`}
      >
        2
      </div>
      <div
        className={`w-15 h-[1px] ${selectedSection >= 2 ? "h-[px]  bg-ffgreen" : "h-[1px"}`}
      />
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border text-white border-ffgreen ${selectedSection >= 3 ? "bg-ffgreen" : ""}`}
      >
        3
      </div>
      <div
        className={`w-15 bg-ffgreen h-[1px] ${selectedSection >= 3 ? "h-[4px]" : "h-[1px"}`}
      />
      <div
        className={`flex rounded-full h-8 w-8 items-center justify-center text-xs leading-none border text-white border-ffgreen ${selectedSection >= 4 ? "bg-ffgreen" : ""}`}
      >
        4
      </div>
    </div>
  );
}

import { forwardRef } from "react";
import Image from "next/image";

type OrderPdfProps = {
  order: any;
};

const OrderPdfTemplate = forwardRef<HTMLDivElement, OrderPdfProps>(({ order }, ref) => {
  if (!order) return null;

  // Helper component for the square checkboxes
  const Checkbox = ({ label, checked = false }: { label: string, checked?: boolean }) => (
    <div className="flex items-center space-x-2 mr-6">
      <div className="w-5 h-5 border-[1.5px] border-black flex items-center justify-center">
        {checked && <div className="w-3 h-3 bg-black" />}
      </div>
      <span className="text-black">{label}</span>
    </div>
  );

  return (
    // The A4 paper container
    <div ref={ref} className="p-12 bg-white text-black w-[210mm] min-h-[297mm] mx-auto font-sans">
      
      {/* Title */}
      <h1 className="text-[2.5rem] font-bold text-black tracking-tight mb-8">
        FILM DEVELOPMENT ORDER
      </h1>

      {/* Meta Info Row */}
      <div className="flex justify-between items-end mb-6 text-lg">
        <p>
          Date In: <span className="font-bold border-b border-black pb-1">{order.date || new Date().toLocaleDateString()}</span>
        </p>
        <p className="flex items-end">
          Date Out: <span className="inline-block border-b border-black w-48 ml-2"></span>
        </p>
      </div>

      {/* Customer Info */}
      <div className="space-y-4 mb-8 text-lg">
        <p>
          Customer Name: <span className="font-bold border-b border-black pb-1">{order.name}</span>
        </p>
        <p>
          Email: <span className="font-bold border-b border-black pb-1">{order.email}</span>
        </p>
        <p>
          Phone: <span className="font-bold border-b border-black pb-1">{order.phone}</span>
        </p>
      </div>

      {/* Film Details Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-black mb-6">Film Details:</h2>
        
        <div className="space-y-6 text-lg ml-2">
          {/* Film Type Line */}
          <div className="flex items-center">
            <span className="mr-4">- Film Type:</span>
            <div className="flex">
              <Checkbox label="35mm" />
              <Checkbox label="120" />
              <div className="flex items-end">
                <Checkbox label="Other:" />
                <span className="inline-block border-b border-black w-32 -ml-4"></span>
              </div>
            </div>
          </div>

          <p>
            - Number of Rolls: <span className="font-bold italic">{order.quantity}</span>
          </p>

          <p>
            - Scans: <span className="font-bold italic">{order.service}</span>
          </p>

          {/* Conditional rendering for Print sizing */}
          {(order.service === "Print Only" || order.service === "Print and email") ? (
            <p>
              - Prints Size: <span className="font-bold italic">{order.selectedSize} {order.selectedFinish}</span>
            </p>
          ) : (
            <p>
              - Prints Size: <span className="italic text-gray-400">N/A</span>
            </p>
          )}

          <p>
            - Keep : <span className="font-bold italic">{order.keepNegatives ? "Yes" : "No"}</span>
          </p>

          <p className="flex items-end">
            - Special Instructions: <span className="inline-block border-b border-black flex-grow ml-2"></span>
          </p>

          <div className="flex items-center pt-2">
            <span className="mr-4">Paid:</span>
            <Checkbox label="Yes" />
            <Checkbox label="No" />
          </div>

          <p className="flex items-end pt-2">
            Staff Notes: <span className="inline-block border-b border-black flex-grow ml-2"></span>
          </p>
        </div>
      </div>

      {/* Footer Logo Area */}
      <div className="mt-auto pt-8">
        {/* If you have the actual logo, use the Next.js Image tag here. 
            For now, I've styled it to match the colors and layout in your screenshot. */}
        <div className="mb-2">
          <Image 
            src="/logo.png" 
            alt="Foto First Logo" 
            width={400} 
            height={100} 
            // Fallback just in case the image path isn't perfectly matched yet
            className="w-auto h-24 object-contain"
          />
        </div>
        
        {/* Fallback stylized text if the image is missing */}
        {!order && (
            <div className="w-[400px]">
                <div className="flex text-5xl font-black italic tracking-tighter">
                <span className="text-[#41B544] drop-shadow-md border-[3px] border-[#2B3990] px-2 rounded-xl">FOTO</span>
                <span className="text-[#41B544] drop-shadow-md border-[3px] border-[#2B3990] px-2 rounded-xl ml-2">FIRST</span>
                </div>
                <p className="text-[#2B3990] text-xs font-bold tracking-widest mt-1">PHOTOGRAPHIC AND DIGITAL PRINTING PROFESSIONALS</p>
                <div className="bg-[#2B3990] text-white text-center py-2 mt-4 font-bold tracking-widest uppercase">
                Welcome to the bigger picture
                </div>
            </div>
        )}
      </div>

    </div>
  );
});

OrderPdfTemplate.displayName = "OrderPdfTemplate";
export default OrderPdfTemplate;
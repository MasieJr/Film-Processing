import { Camera, ShieldCheck, Zap } from "lucide-react";

const services = [
  {
    id: 1,
    service: "Email in High Resolution",
    description:
      "High-resolution digital images from your film or slides suitable for large-format printing.",
    price: "R200",
  },
  {
    id: 2,
    service: "Email in Low Resolution",
    description:
      "Digital images from your film or slides optimized for social media sharing and small prints.",
    price: "R180",
  },
  {
    id: 3,
    service: "Print and Email in High Resolution",
    description:
      "Get both high-resolution printed photos and digital scans at a discounted combo price.",
    price: "R329",
  },
  {
    id: 4,
    service: "Print Only",
    description:
      "High-resolution physical prints produced in your preferred size.",
    price: "R329",
  },
  {
    id: 5,
    service: "Develop Only",
    description:
      "Chemical processing of your film roll only. Receive developed negatives ready for personal scanning.",
    price: "R95",
  },
  {
    id: 6,
    service: "Mounted slides",
    description:
      "Prints or digital scans processed directly from positive slide film or mounted frames.",
    price: "R25",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 border-y border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#41B544]">
            Services Offered
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 hover:border-neutral-700 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#41B544]/10 text-[#41B544] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {service.service}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500">From</span>
                <span className="text-lg font-bold text-black dark:text-white">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

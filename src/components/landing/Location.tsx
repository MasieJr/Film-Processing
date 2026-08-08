import { Clock, MapPin } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="py-24 border-t border-[#41B544] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#41B544]">
              Drop-Off Location
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white mt-2 mb-6">
              Visit Foto First Cresta
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed mb-8">
              Drop off your rolls in person or post them directly to our lab
              inside Cresta Shopping Centre. We notify you the moment your
              digital scans are ready for cloud download.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#41B544] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    Address
                  </p>
                  <p>
                    Shop Cresta Shopping Centre, Beyers Naudé Dr, Randburg,
                    2194, South Africa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#41B544] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    Trading Hours
                  </p>
                  <p>Monday – Saturday: 09:00 – 19:00</p>
                  <p>Sunday & Public Holidays: 09:00 – 17:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-80 lg:h-96 rounded-3xl bg-neutral-900 border border-[#41B544] overflow-hidden relative">
            <iframe
              title="Foto First Cresta Location"
              src="https://maps.google.com/maps?q=Foto%20First%20Cresta%2C%20Cresta%20Shopping%20Centre&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

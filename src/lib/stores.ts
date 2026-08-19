export const stores = {
  cresta: {
    id: "1",
    name: "Foto First Cresta",
    slug: "cresta",
    location: "Cresta Shopping Centre",
    address:
      "U222, Beyers Naudé Dr, Cresta, Johannesburg South, 2194, South Africa",
    mapUrl:
      "https://maps.google.com/maps?q=Foto%20First%20Cresta%2C%20Cresta%20Shopping%20Centre&t=&z=16&ie=UTF8&iwloc=&output=embed",
    salesPersons: [
      "Masie Seremu",
      "Nithian Chetty",
      "Prudence Ndlovu",
      "Hloni Smith",
      "Luisa Gravito",
      "Thabang Mohlakoana",
    ],
  },

  clearwater: {
    id: "2",
    name: "Foto First Clearwater",
    slug: "clearwater",
    location: "Clearwater Mall",
    address:
      "Shop Number LM176, Clearwater Mall Cnr Hendrik Potgieter Drive &, Christiaan de Wet Rd, Strubens Valley, Roodepoort, 1709, South Africa",
    mapUrl:
      "https://maps.google.com/maps?q=Foto%20First%20Clearwater%2C%20Clearwater%20Shopping%20Centre&t=&z=16&ie=UTF8&iwloc=&output=embed",
    salesPersons: ["Yanga Bululu", "Bradley", "Gloria"],
  },
};

export function getStore(slug: string) {
  return stores[slug as keyof typeof stores] ?? null;
}
export type Store = (typeof stores)[keyof typeof stores];

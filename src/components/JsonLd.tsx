export default function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Foto First Cresta",
    image: "https://film-process.masieseremu.co.za/logo.png",
    "@id": "https://film-process.masieseremu.co.za",
    url: "https://film-process.masieseremu.co.za",
    telephone: "+2711479580",
    priceRange: "R75+",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cresta Shopping Centre, Beyers Naudé Dr",
      addressLocality: "Randburg",
      addressRegion: "Gauteng",
      postalCode: "2194",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -26.1265,
      longitude: 27.9712,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Film Processing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "35mm C-41 Color Developing & High-Res Scanning",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "120 Medium Format Processing",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

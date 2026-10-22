import React from "react";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Services from "@/components/landing/Services";
import Hero from "@/components/landing/Hero";
import Location from "@/components/landing/Location";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { getStore } from "@/lib/stores";

type Props = {
  params: Promise<{
    store: string;
  }>;
};

export default async function StorePage({ params }: Props) {
  const { store: slug } = await params;

  const store = getStore(slug);

  if (!store) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] font-sans scroll-smooth relative">
      <JsonLd />
      <Header store={store} />
      <main>
        <section id="hero">
          <Hero store={store} />
        </section>

        <section id="services" className="animate-section-reveal">
          <Services />
        </section>

        <section id="location" className="animate-section-reveal">
          <Location store={store} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

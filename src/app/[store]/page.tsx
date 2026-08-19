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
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-800 z-50 pointer-events-none">
        <div className="h-full bg-blue-600 dark:bg-blue-400 animate-scroll-progress" />
      </div>

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

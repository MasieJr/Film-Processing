import React from "react";
import JsonLd from "@/components/JsonLd";
import Services from "@/components/landing/Services";
import Hero from "@/components/landing/Hero";
import Location from "@/components/landing/Location";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] font-sans scroll-smooth relative">
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-800 z-50 pointer-events-none">
        <div className="h-full bg-blue-600 dark:bg-blue-400 animate-scroll-progress" />
        Hello
      </div>
      <JsonLd />
      {/* <Header />
      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="services" className="animate-section-reveal">
          <Services />
        </section>

        <section id="location" className="animate-section-reveal">
          <Location />
        </section>
      </main> */}
      <Footer />
    </div>
  );
}

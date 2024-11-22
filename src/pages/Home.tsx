import React from 'react';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import PartnersSection from '../components/PartnersSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <NewsSection />
      <PartnersSection />
    </main>
  );
}
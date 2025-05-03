import React, { useEffect, useState } from 'react';
import { Header } from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PartnersSection from "./components/PartnersSection";
import Footer from "./components/Footer";

function App() {
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHeaderSolid(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Header className={headerSolid ? 'solid' : 'transparent'} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}

export default App;

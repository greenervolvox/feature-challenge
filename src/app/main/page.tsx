// src/app/main/page.tsx
'use client';

import NavBar from '../components/NavBar';
import PromoCarousel from '../components/PromoCarousel';
import ProductCarousel from '../components/ProductCarousel';
import BlockOne from '../components/blockone';
import BlockTwo from '../components/blocktwo';

const MainPage = () => {
  return (
    <div>
      <BlockOne />
      <NavBar />
      <PromoCarousel />
      <BlockTwo />
      <ProductCarousel />
    </div>
  );
};

export default MainPage;

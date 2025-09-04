
import * as React from 'react';
import HeroSlider from '../../components/hero/HeroSlider';
import BrandGallery from '../../components/brand/BrandGallery';
import Categories from '../../components/category/Categories';
import ProductList from '../../components/product/ProductList';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <BrandGallery maxItems={4} />
      <Categories />
      <ProductList  />
    </>
  );
}

import React from 'react';
import './ShopByCategory.scss';
import { CategoriesList } from '../../CategoriesList/CategoriesList';

export const ShopByCategory: React.FC = () => {
  return (
    <section className="shopByCategory">
      <CategoriesList />
    </section>
  );
};

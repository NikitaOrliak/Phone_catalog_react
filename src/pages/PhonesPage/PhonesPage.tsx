import React, { useContext } from 'react';
import { ProductsPage } from '../../components/ProductsPage/ProductsPage';
import './PhonesPage.scss';
import { StateStore } from '../../store/StoreContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';

export const PhonesPage: React.FC = () => {
  const { products } = useContext(StateStore);

  const phonesProducts = getProductsByCategory(products, 'phones');

  return (
    <div className="phonesPage">
      <ProductsPage
        title="Mobile phones"
        products={phonesProducts}
      />
    </div>
  );
};

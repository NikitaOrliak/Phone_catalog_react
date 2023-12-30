import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { UpgradedProduct } from '../../types/UpgradedProduct';
import { ICONS } from '../../images/icons/icons';
import './ProductsPage.scss';
import { SortByDropdown } from '../Dropdowns/SortByDropdown';
import { ItemsOnPageDropdown } from '../Dropdowns/ItemsOnPageDropdown';
import { ProductsList } from '../ProductsList/ProductsList';
import { getTrimmedProducts } from '../../helpers/getTrimmedProducts';
import { SortBy } from '../../types/SortBy';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { Pagination } from '../Pagination/Pagination';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

type Props = {
  title: string,
  products: UpgradedProduct[],
};

export const ProductsPage: React.FC<Props> = ({ title, products }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const itemsOnPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [trimmedProducts, count] = getTrimmedProducts(
    products,
    query,
    sortBy as keyof typeof SortBy,
    itemsOnPage as ItemsOnPage,
    +page,
  );

  useEffect(() => {
    setPage(1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [query, itemsOnPage]);

  const navigationPath = pathname.slice(1);

  const paginationCounter = Math.ceil(count / +itemsOnPage) || 1;

  return (
    <div className="productsPage">
      <section className="productsPage__navigation">
        <Link to="/" className="productsPage__navigation--link">
          <img src={ICONS.home} alt="Home" />
        </Link>
        <img
          src={ICONS.arrowRightDisabled}
          alt="Arrow right"
        />
        <p className="smallText productsPage__navigation--path">
          {navigationPath}
        </p>
      </section>

      <section className="productsPage__description">
        <h1 className="productsPage__description--title">
          {title}
        </h1>
        <p className="smallText productsPage__description--models">
          {`${count} models`}
        </p>
      </section>

      <section className="productsPage__content">
        <div className="productsPage__content--sort">
          <SortByDropdown />
          <ItemsOnPageDropdown />
        </div>
        <div className="productsPage__content--table" data-cy="productList">
          <ProductsList products={trimmedProducts} />
        </div>
      </section>

      {
        paginationCounter > 1 && (
          <Pagination
            total={paginationCounter}
            page={page}
            setPage={setPage}
          />
        )
      }

      {
        !trimmedProducts.length && (
          <NoSearchResults category={navigationPath} />
        )
      }
    </div>
  );
};

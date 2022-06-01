import React from "react";
import { useFilterContext } from "../context/filterContext";
import { FilterContextType } from "../reducers/ActionTypes/ActionFilter";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_Products: products, grid_view }: FilterContextType =
    useFilterContext();
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default ProductList;

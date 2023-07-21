import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsData = () => {
  const [productsTable, setProductsTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/product/get"
        );
        setProductsTable(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { productsTable, isLoading };
};

const getProductData = (id) => {
  const { productsTable, isLoading } = ProductsData();

  if (isLoading) {
    console.log("Products data is still loading...");
    return undefined;
  }

  if (!Array.isArray(productsTable)) {
    console.log("Products data is not available or not an array.");
    return undefined;
  }

  let productData = productsTable.find((product) => product.Id === id);

  if (productData === undefined) {
    console.log("Product data does not exist for Id " + id);
    return undefined;
  }

  return productData;
};

export { ProductsData, getProductData };
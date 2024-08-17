import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  const {
    data: products = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/products`
      );
      return res.data;
    },
  });

  console.log(products);

  return (
    <div>
      <div className="space-y-2 mb-3">
        <h3 className="text-center text-2xl font-bold text-secondary">
          Our Products
        </h3>
        <p className="text-center w-3/4 mx-auto"></p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {
            products.map((product, _id) => <ProductCard key={_id} product={product}/>)
        }
      </div>
    </div>
  );
};

export default Products;

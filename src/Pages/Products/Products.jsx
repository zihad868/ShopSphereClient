import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from "../../Provider/AuthProvider";

const Products = () => {
    const {loading} = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
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

  if(loading || isLoading){
    return <div className="text-center"><progress className="progress w-56"></progress></div>
  }

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

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from "../../Provider/AuthProvider";

const Products = () => {
  const { loading } = useContext(AuthContext);
  const [sortOrder, setSortOrder] = useState(""); // State for sorting
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const fetchProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/products?sortBy=${sortOrder}&search=${searchQuery}`
    );
    return res.data;
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", sortOrder, searchQuery],
    queryFn: fetchProducts,
  });

  const handleLowToHigh = () => {
    setSortOrder("priceLowToHigh");
    refetch();
  };

  const handleHighToLow = () => {
    setSortOrder("priceHighToLow");
    refetch();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    refetch();
  };

  if (loading || isLoading) {
    return (
      <div className="text-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div>
      {/* Title of Product */}
      <div className="space-y-2 mb-3">
        <h3 className="text-center text-2xl font-bold text-secondary">
          Our Products
        </h3>
        <p className="text-center w-3/4 mx-auto"></p>
      </div>
      
      {/* Search Product */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search product ..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-5xl"
        />
      </div>

      {/* Sorting Product */}
      <div className="mb-5 text-center">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            Sort Product Price
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1]  p-2 shadow"
          >
            <li>
              <button onClick={handleLowToHigh}>Price Low to High</button>
            </li>
            <li>
              <button onClick={handleHighToLow}>Price High to Low</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Product Card */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

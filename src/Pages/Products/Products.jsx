import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from "../../Provider/AuthProvider";

const Products = () => {
  const { loading } = useContext(AuthContext);
  const [sortOrder, setSortOrder] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  const fetchProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/products`, {
        params: {
          sortBy: sortOrder || undefined,
          search: searchQuery || undefined,
          brand: selectedBrand || undefined,
          category: selectedCategory || undefined,
          priceMin: priceRange.min || undefined,
          priceMax: priceRange.max || undefined,
          page: currentPage, 
          limit: itemsPerPage 
        }
      }
    );
    return res.data;
  };

  const { data: productsData = {}, isLoading, refetch } = useQuery({
    queryKey: ["products", sortOrder, searchQuery, selectedBrand, selectedCategory, priceRange, currentPage],
    queryFn: fetchProducts,
  });

  const { products, totalPages } = productsData; 

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
    refetch();
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1); 
    refetch();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); 
    refetch();
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange({
      ...priceRange,
      [e.target.name]: e.target.value
    });
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

      {/* Filter by Brand */}
      <div className="text-center mb-4">
        <select onChange={handleBrandChange} value={selectedBrand} className="select select-bordered w-full max-w-xs">
          <option value="">All Brands</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Reebok">Reebok</option>
        </select>
      </div>

      {/* Filter by Category */}
      <div className="text-center mb-4">
        <select onChange={handleCategoryChange} value={selectedCategory} className="select select-bordered w-full max-w-xs">
          <option value="">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      {/* Filter by Price Range */}
      <div className="text-center mb-4">
        <div className="flex justify-center space-x-2">
          <input
            type="number"
            placeholder="Min Price"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
            className="input input-bordered w-1/3"
          />
          <input
            type="number"
            placeholder="Max Price"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            className="input input-bordered w-1/3"
          />
        </div>
      </div>

      {/* Sorting Product */}
      <div className="mb-5 text-center">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            Sort Product Price
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
          >
            <li>
              <button onClick={() => { setSortOrder("priceLowToHigh"); refetch(); }}>Price Low to High</button>
            </li>
            <li>
              <button onClick={() => { setSortOrder("priceHighToLow"); refetch(); }}>Price High to Low</button>
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

      {/* Pagination Controls */}
      <div className="mt-5 text-center">
        <button 
          className="btn mr-2" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          className="btn ml-2" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

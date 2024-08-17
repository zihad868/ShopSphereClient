import React from 'react';

const ProductCard = ({ product }) => {
  const { name, image, description, price, category, brand, rating, createdAt } = product;

  // Format the createdAt date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl mx-auto mb-6">
        <figure>
          <img src={image} alt="Product" />
        </figure>
        <div className="card-body">
          <div className="badge badge-secondary p-4">{formattedDate}</div>
          <h2 className="card-title">
            {name}
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">Price: {price}</div>
            <div className="badge badge-outline">Rating: {rating}</div>
          </div>
          <div className="card-actions justify-between">
            <div className="badge">Brand: {brand}</div>
            <div className="badge">Category: {category}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

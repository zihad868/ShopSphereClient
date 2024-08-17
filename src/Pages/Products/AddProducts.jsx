import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

const AddProducts = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_BB_API
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      const imgURL = result.data.display_url;

      const { name, description, price, category, brand, rating } = data;
      const product = {
        name,
        image: imgURL,
        description,
        price,
        category,
        brand,
        rating,
      };

      console.log(product);

      // Inset Data Backend
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/product`, product)
        if(res?.data?.success){
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Post Add Success",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Product Add to Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }

      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error?.message || "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "An error occurred",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="space-y-2 mb-3">
        <h3 className="text-center text-2xl font-bold text-secondary">
          Add Product
        </h3>
        <p className="text-center w-3/4 mx-auto"></p>
      </div>
      <div className="border-2 p-4 ml-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="title"
            >
              Product Name
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Name"
              {...register("name", { required: "Name field is required" })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Image</span>
            </label>
            <input
              type="file"
              className="file:border file:border-solid ..."
              {...register("image", { required: "Image field is required" })}
            />
            {errors.image && (
              <span className="text-red-400">{errors.image.message}</span>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="description"
            >
              Product Description
            </label>
            <textarea
              className="textarea textarea-bordered textarea-lg w-full max-w-full"
              placeholder="Description"
              {...register("description", {
                required: "Description field is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="price"
            >
              Product Price
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Price"
              step="0.01" // This allows for float numbers with two decimal places
              {...register("price", {
                required: "Price field is required",
                valueAsNumber: true, // Converts the input value to a number
                validate: (value) => {
                  return !isNaN(value) && value > 0
                    ? true
                    : "Price must be a positive number";
                },
              })}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="title"
            >
              Product Category
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Category"
              {...register("category", {
                required: "Category field is required",
              })}
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="title"
            >
              Product Brand
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Brand"
              {...register("brand", { required: "Brand field is required" })}
            />
            {errors.brand && (
              <span className="text-red-500">{errors.brand.message}</span>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="rating"
            >
              Product Rating
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Rating (0-5)"
              {...register("rating", {
                required: "Rating field is required",
                min: { value: 0, message: "Rating must be at least 0" },
                max: { value: 5, message: "Rating must be at most 5" },
              })}
            />
            {errors.rating && (
              <span className="text-red-500">{errors.rating.message}</span>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

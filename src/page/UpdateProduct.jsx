import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams(); // Ambil ID produk dari URL
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Product ID is invalid or missing.");
      return;
    }

    // Ambil detail produk berdasarkan ID
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const product = response.data.data.product;
        if (product) {
          setName(product.name || "");
          setPrice(product.price || "");
          setStock(product.stock || "");
        } else {
          setError("Product data is unavailable.");
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/api/v1/products/${id}`,
        { name, price, stock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        setSuccess("Product updated successfully.");
        setError(null);
        setTimeout(() => {
          navigate("/products"); // Navigasi ke halaman produk setelah update
        }, 2000);
      } else {
        setError(response.data.message || "Failed to update product.");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (!id) {
    return <p className="text-red-500 font-semibold">Invalid product ID.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Update Product</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium text-gray-700">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-medium text-gray-700">
            Price:
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="mb-2 font-medium text-gray-700">
            Stock:
          </label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Update
          </button>
        </div>
      </form>
      {error && (
        <p className="mt-4 text-center text-red-500 bg-red-100 p-2 rounded-md">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 text-center text-green-500 bg-green-100 p-2 rounded-md">
          {success}
        </p>
      )}
    </div>
  );
};

export default UpdateProduct;

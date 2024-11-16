import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [shopId, setShopId] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/products",
        { name, stock, price, shopId },
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        setSuccess("Product created successfully");
        setError(null);
        setName("");
        setStock("");
        setPrice("");
        setShopId("");

        navigate(`/products/${newProduct.id}`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
          {/* Filter Section */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-6">Search Product By</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md flex-grow"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md flex-grow"
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border border-gray-300 p-2 rounded-md flex-grow"
          />
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </section>
      
    <div className="min-h-screen w-full p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Create Product</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="product_name">Product Name</label>
                    <input
                      id="product_name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="stock">Stock</label>
                    <input
                      id="stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="shopId">Shop ID</label>
                    <input
                      id="shopId"
                      type="text"
                      value={shopId}
                      onChange={(e) => setShopId(e.target.value)}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="flex justify-between gap-10 mt-8">
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
                      Create
                    </button>
                  </div>
                </form>
                {error && (
                  <p className="mt-4 text-red-500 bg-red-100 p-2 rounded-md">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="mt-4 text-green-500 bg-green-100 p-2 rounded-md">
                    {success}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateProduct;

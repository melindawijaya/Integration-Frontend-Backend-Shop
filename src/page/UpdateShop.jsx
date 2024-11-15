import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateShop = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Navigasi untuk tombol back
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Shop ID is invalid or missing.");
      return;
    }

    const fetchShop = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/v1/shops/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const shop = response.data.data.Shop;
        if (shop) {
          setName(shop.name || "");
          setAdminEmail(shop.adminEmail || "");
        } else {
          setError("Shop data is unavailable.");
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchShop();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/api/v1/shops/${id}`,
        { name, adminEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        setSuccess("Shop updated successfully.");
        setError(null);
      } else {
        setError(response.data.message || "Failed to update shop.");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (!id) {
    return <p className="text-red-500 font-semibold">Invalid shop ID.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Update Shop</h1>
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
          <label htmlFor="adminEmail" className="mb-2 font-medium text-gray-700">
            Admin Email:
          </label>
          <input
            id="adminEmail"
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
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

export default UpdateShop;

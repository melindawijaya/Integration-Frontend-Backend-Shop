import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DetailProduct() {
  const { id } = useParams(); // Ambil ID dari URL
  const [shop, setShops] = useState(null); // State untuk produk
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);

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

        const data = response.data;
        if (data.isSuccess) {
          setShops(data.data.product); // Update state dengan data produk
        } else {
          setError("Failed to fetch product details.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:3000/api/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        alert("Product successfully deleted.");
        navigate("/products");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto mt-12 p-6 border rounded-md bg-white shadow-md">
      {shop ? (
        <>
          <div className="flex flex-col md:flex-row gap-6 ml-5">
            <img
              src={shop.images?.[0] || "https://via.placeholder.com/200"}
              alt={shop.name}
              className="w-full md:w-48 h-48 object-cover border rounded-md"
            />

            {/* Detail produk */}
            <div className="text-left ml-5">
            <h1 className="text-2xl font-bold mt-4 mb-6 text-center">{shop.name}</h1>
              <p className="text-gray-500 mb-2">
                <strong>Price:</strong> ${shop.price}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Stock:</strong> {shop.stock}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Shop Name:</strong> {shop.shop?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <button
              className="w-32 px-4 py-2 ms-2 me-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className="w-32 px-4 py-2 ms-2 me-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md"
              onClick={() => navigate(`/update-product/${id}`)}
            >
              Edit Product
            </button>
            <button
              className="w-30 px-4 py-2 ms-2 me-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
              onClick={handleDelete}
            >
              Delete Product
            </button>
          </div>
        </>
      ) : (
        <p>No product details available.</p>
      )}
    </div>
  );
}

export default DetailProduct;

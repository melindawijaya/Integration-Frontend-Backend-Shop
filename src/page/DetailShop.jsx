import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DetailShop() {
  const { id } = useParams(); 
  const [shop, setShop] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopDetails = async () => {
      setLoading(true);

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

        const data = response.data;
        if (data.isSuccess) {
          setShop(data.data.Shop);
        } else {
          setError("Failed to fetch shop details.");
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shop?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:3000/api/v1/shops/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        alert("Shop successfully deleted.");
        navigate("/shops"); 
      } else {
        alert("Failed to delete shop.");
      }
    } catch (error) {
      console.error("Error deleting shop:", error);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto mt-12 p-6 border rounded-md bg-white shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">{shop?.name}</h1>
      {shop ? (
        <>
          <div className="flex flex-col md:flex-row gap-6 ml-5">
            <img
              src={
                shop.products?.[0]?.images?.[0] || "https://via.placeholder.com/200"
              }
              alt={shop.name}
              className="w-full md:w-48 h-48 object-cover border rounded-md"
            />

            {/* Detail toko */}
            <div className="text-left ml-5 ">
              <p className="text-gray-500 mb-2">
                <strong>Admin Email:</strong> {shop.adminEmail || "N/A"}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Owner:</strong> {shop.user?.name || "N/A"}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Shop ID:</strong> {shop.id}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Created At:</strong>{" "}
                {new Date(shop.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-500">
                <strong>Updated At:</strong>{" "}
                {new Date(shop.updatedAt).toLocaleString()}
              </p>

              <h2 className="text-xl font-semibold mb-2 mt-8 text-left">
                Products
              </h2>
              <p className="text-gray-500">
                <strong>Name:</strong> {shop.products?.[0]?.name}
              </p>
              <p className="text-gray-500">
                <strong>Stock:</strong> {shop.products?.[0]?.stock}
              </p>
              <p className="text-gray-500">
                <strong>Price:</strong> {shop.products?.[0]?.price}
              </p>
            </div>
          </div>

          <div className="mt-10 ">
            <button
              className="w-32 px-4 py-2 ms-2 me-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              onClick={() => navigate(-1)} 
            >
              Back
            </button>
            <button
              className="w-32 px-4 py-2 ms-2 me-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md"
              onClick={() => navigate(`/update-shop/${id}`)} 
            >
              Edit Shop
            </button>
            <button
              className="w-32 px-4 py-2 ms-2 me-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
              onClick={handleDelete} 
            >
              Delete Shop
            </button>
          </div>
        </>
      ) : (
        <p>No shop details available.</p>
      )}
    </div>
  );
}

export default DetailShop;

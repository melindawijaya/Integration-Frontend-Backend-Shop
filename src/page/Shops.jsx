import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Shops() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async (page = 1) => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/v1/shops?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        if (data.isSuccess) {
          setShops(data.data.shops);
          setTotalPages(data.data.pagination.totalPages);
          setCurrentPage(data.data.pagination.page);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <main className="text-center">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.length === 0 ? (
                <p className="text-gray-500">No Data Available.</p>
              ) : (
                shops.map((shop, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-md bg-white shadow-md"
                  >
                    <h3 className="font-bold text-xl mb-5">
                      {shop.name}
                    </h3>

                    <img
                      src={shop.images}
                      alt={shop.name}
                      className="w-full h-40 object-cover mb-4"
                    />

                    <div className="text-gray-500 text-sm mt-4">
                      <div className="flex ">
                        <span>Product: {shop.products[0]?.name || "N/A"}</span>
                      </div>
                      <div className="flex ">
                        <span>Admin Email: {shop.adminEmail || "N/A"}</span>
                      </div>
                    </div>

                    <button
                      className="w-full px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                      onClick={() => navigate(`/shops/${shop.id}`)}
                    >
                      Lihat Shop
                    </button>
                  </div>
                ))
              )}
            </section>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Shops;
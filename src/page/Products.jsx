import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async (page = 1) => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:3000/api/v1/products?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        if (data.isSuccess) {
          setProducts(data.data.products);
          setTotalPages(data.data.pagination.totalPages);
          setCurrentPage(data.data.pagination.page);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {/* header */}
      <main className="text-center">
        {loading && <p> loading... </p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <p className="text-gray-500">No Data Avalilable.</p>
              ) : (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-md bg-white shadow-md"
                  >
                    <h3 className="font-bold text-xl mb-5">{products.name}</h3>
                    <img
                      src={product.images}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-4"
                    />
                    <p className="text-blue-500 font-bold text-xl">
                      Rp {product.price}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                      <span>Stok: {product.stock}</span>
                      <span>Toko: {product.name}</span>
                    </div>
                    <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                      onClick={() => navigate(`/products/${product.id}`)}>
                      Lihat Product
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

export default Products;
import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";

function HomeView() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [shopName, setShopName] = useState("");
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [size, setSize] = useState(10);  
  const [page, setPage] = useState(1);   

  const fetchShops = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const params = {
        shopName,
        productName,
        stock,
        size,
        page,
      };

      const response = await axios.get("http://localhost:3000/api/v1/shops", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      const data = response.data;
      if (data.isSuccess) {
        setShops(data.data.shops);
      } else {
        console.log(response);
        setError("Error fetching shops.");
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    setPage(1); 
  };

  useEffect(() => {
    fetchShops();
  }, [shopName, productName, stock, size, page]); 
  
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

      <main className="max-w-6xl mx-auto mt-12 text-center">
        {loading && <p className="text-gray-700">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.length === 0 ? (
                <p className="text-gray-500">No Data Available.</p>
              ) : (
                shops.map((shop, index) => (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-bold text-xl mb-2">
                      {shop.products[0]?.name}
                    </h3>

                    <img
                      src={shop.products[0]?.images[0]}
                      alt={shop.products[0]?.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <p className="text-gray-700 font-bold">
                      Rp {shop.products[0]?.price} / pcs
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex justify-between items-center text-gray-500 text-sm mt-4">
                      <span>Stok: {shop.products[0]?.stock}</span>
                      <span>Shop: {shop.name}</span>
                    </div>
                    <button className="w-full px-4 py-2 mt-4 bg-blue-400 text-white rounded-md hover:bg-blue-700">
                      Pilih Product
                    </button>
                  </div>
                ))
              )}
            </section>

            {/* Pagination Section */}
            <div className="flex justify-center items-center mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-3 py-2 bg-blue-400 text-white rounded-md mr-2 text-sm"
              >
                Previous
              </button>
              <span className="text-gray-700 mx-5 text-lg font-semibold">
                Page {page}
              </span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-5 py-2 bg-blue-400 text-white rounded-md ml-2 text-sm"
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

export default HomeView;

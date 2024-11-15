import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function HomeView() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3000/api/v1/shops", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        const data = response.data;
        if (data.isSuccess) {
          setShops(data.data.shops);
        } else {
          console.log(response);
          setError("error");
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3 tex">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Welcome to FunShop 🙌
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm/6 font-semibold text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* header */}
      <main className="text-center">
        {loading && <p> loading... </p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.length === 0 ? (
              <p className="text-gray-500">No Data Avalilable.</p>
            ) : (
              shops.map((shop, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-white shadow-md"
                >
                  <h3 className="font-bold text-xl mb-5">{shop.products[0].name}</h3>
                  <img
                    src={shop.products[0].images[0]}
                    alt={shop.products[0].name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <p className="text-blue-500 font-bold text-xl">
                    Rp {shop.products[0].price}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                    <span>Stok: {shop.products[0].stock}</span>
                    <span>Toko: {shop.name}</span>
                  </div>
                  <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                    Pilih Product
                  </button>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default HomeView;
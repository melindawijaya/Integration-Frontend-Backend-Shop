import { useNavigate } from "react-router-dom";
import "../App.css";

function HomeView() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md mt-8 text-center w-1000">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Store</h1>
        <p className="text-gray-700 mb-4">
          Discover the best products and shops tailored just for you!
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
          >
            Explore Products
          </button>
          <button
            onClick={() => navigate("/shops")}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 w-full md:w-auto"
          >
            View Shops
          </button>
        </div>
      </section>

      {/* Additional Content */}
      <main className="max-w-xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Us?</h2>
        <p className="text-gray-600 mb-8">
          We provide a wide variety of high-quality products from trusted
          vendors. Start your shopping journey today!
        </p>
      </main>
    </>
  );
}

export default HomeView;

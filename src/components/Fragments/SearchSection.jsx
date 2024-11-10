import React, { useState } from 'react';
import axios from 'axios';

export const SearchSection = ({ driverType, setDriverType, date, setDate, time, setTime, numberOfPassengers, setNumberOfPassengers, setCars }) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const availableDriver = driverType === "true";
  
    if (!date || !time) {
      console.error("Date or time is missing or invalid");
      setLoading(false);
      return;
    }

    const dateTime = new Date(`${date}T${time}:00`);
    if (isNaN(dateTime.getTime())) {
      console.error("Invalid date and time combination:", `${date}T${time}:00`);
      setLoading(false);
      return;
    }
  
    const localDateTime = new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000);
  
    try {
      const response = await axios.get('http://localhost:3000/api/v1/cars', {
        params: {
          availableDriver: availableDriver,
          date: localDateTime.toISOString(),
          numberOfPassengers: numberOfPassengers || undefined
        }
      });
  
      console.log(response.data);
      if (response.data && response.data.data && response.data.data.cars) {
        setCars(response.data.data.cars);  // Corrected typo here
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 bg-white shadow-md rounded-lg mx-auto mt-4 max-w-6xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between bg-white p-6 rounded-lg">
          <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
            <label className="flex text-gray-600 mb-2">Tipe Driver</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-500"
              value={driverType} 
              onChange={(e) => setDriverType(e.target.value === "true")}
            >
              <option value="" disabled>Pilih Tipe Driver</option>
              <option value="true">Dengan Supir</option>
              <option value="false">Tanpa Supir (Lepas Kunci)</option>
            </select>
          </div>

          <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
            <label className="flex text-gray-600 mb-2">Tanggal</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-500"
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>

          <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
            <label className="flex text-gray-600 mb-2">Pilih Waktu</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-500"
              value={time} 
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="" disabled>Pilih Waktu</option>
              <option value="08:00">08.00 WIB</option>
              <option value="09:00">09.00 WIB</option>
              <option value="10:00">10.00 WIB</option>
              <option value="11:00">11.00 WIB</option>
              <option value="12:00">12.00 WIB</option>
            </select>
          </div>

          <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
            <label className="flex text-gray-600 text-sm mb-2">Jumlah Penumpang (optional)</label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-gray-500"
                placeholder="Jumlah Penumpang"
                value={numberOfPassengers} 
                onChange={(e) => setNumberOfPassengers(e.target.value)}
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
                <img src="images/fi_users.png" width="20px" alt="Users Icon" />
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto px-2 mt-4 md:mt-0">
            <button
              className="w-full md:w-auto bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-200"
              id="load-btn" 
              onClick={handleSearch}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Mencari..." : "Cari Mobil"} {/* Menampilkan teks sesuai status loading */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
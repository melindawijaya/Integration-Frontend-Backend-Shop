export const CarsSection = ({ cars = [] }) => {
  console.log('Cars data diterima di CarsSection:', cars);
  return (
    <>
      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <div key={index} className="card px-2 py-4 border rounded-lg shadow-lg">
            <img
              src={car.image}
              alt={car.model}
              className="card-img-top mt-4 rounded"
            />
            <h3 className="text-sm font-semibold">{car.model}</h3>
            <p className="text-lg font-bold">{car.rentPerDay} / hari</p>
            <p className="text-sm text-gray-600">{car.description}</p>
            <div className="flex items-center mt-4">
              <img src="images/fi_users1.png" className="w-5 h-5" alt="" />
              <span className="ml-2 text-sm">{car.capacity} orang</span>
            </div>
            <div className="flex items-center mt-2">
              <img src="images/fi_settings.png" className="w-5 h-5" alt="" />
              <span className="ml-2 text-sm">{car.transmission}</span>
            </div>
            <div className="flex items-center mt-2 mb-4">
              <img src="images/fi_calendar.png" className="w-5 h-5" alt="" />
              <span className="ml-2 text-sm">Tahun {car.year}</span>
            </div>
            <button className="bg-green-500 text-white text-center py-2 w-full rounded hover:bg-green-600 transition duration-300">
              Pilih Mobil
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

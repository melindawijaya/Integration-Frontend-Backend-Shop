export const Header = () => {
  return (
    <>
      <section className="mobil py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">

            <div className="w-full lg:w-5/12 xl:w-5/12 2xl:w-5/12 lg:pl-20 pt-12">
              <h2 className="font-bold text-2xl lg:text-3xl mb-4 pr-2">
                Sewa & Rental Mobil Terbaik di kawasan Semarang
              </h2>
              <p className="text-gray-700 mb-6 pr-10">
                Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded">
                Mulai Sewa Mobil
              </button>
            </div>

            <div className="w-full lg:w-5/12 xl:w-6/12 2xl:w-6/12 mt-6 lg:mt-0 pt-12 lg:pt-20">
              <img className="w-full" src="images/img_car.png" alt="Car Image"/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export const Footer = () => {
  return (
    <>
      <footer className="mt-5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            
            <div className="w-full md:w-1/4 px-4 text-center md:text-left mb-6 md:mb-0">
              <p className="text-gray-600">Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
              <p className="text-gray-600">binarcarrental@gmail.com</p>
              <p className="text-gray-800">081-233-334-808</p>
            </div>

            <div className="w-full md:w-1/4 px-4 text-center md:text-left mb-6 md:mb-0">
              <p className="font-semibold text-gray-800">Our Services</p>
              <p className="text-gray-600">Why Us</p>
              <p className="text-gray-600">Testimonial</p>
              <p className="text-gray-600">FAQ</p>
            </div>

            <div className="w-full md:w-1/4 px-4 text-center md:text-left mb-6 md:mb-0">
              <p className="font-semibold text-gray-800">Connect With Us</p>
              <div className="flex justify-center md:justify-start space-x-2 mt-2">
                <img src="images/icon_facebook.svg" alt="Facebook" className="w-5 h-5" />
                <img src="images/icon_instagram.svg" alt="Instagram" className="w-5 h-5" />
                <img src="images/icon_twitter.svg" alt="Twitter" className="w-5 h-5" />
                <img src="images/icon_mail.svg" alt="Mail" className="w-5 h-5" />
                <img src="images/icon_twitch.svg" alt="Twitch" className="w-5 h-5" />
              </div>
            </div>

            <div className="w-full md:w-1/4 px-4 text-center md:text-left">
              <p className="text-gray-600">&copy; Binar 2022</p>
              <img src="images/logo.png" alt="Binar Logo" className="w-24 mt-2 mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

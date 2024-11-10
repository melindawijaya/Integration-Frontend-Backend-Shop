export const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="">
        {/* Bagian Judul dan Deskripsi */}
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold text-black">{title}</h1>
          <p className="text-gray-400 mt-4 mb-5">
            Welcome, please enter your details
          </p>
        </div>

        {/* Form atau Konten Lainnya */}
        {children}
      </div>
    </div>
  );
};

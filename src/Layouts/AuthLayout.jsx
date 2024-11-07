export const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-neon-blue">
        {/* Bagian Judul dan Deskripsi */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-neon-blue">{title}</h1>
          <p className="text-gray-400 mt-2">
            Welcome back, please enter your details
          </p>
        </div>

        {/* Form atau Konten Lainnya */}
        {children}
      </div>
    </div>
  );
};

export const FormLogin = () => {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-neon-blue">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 bg-gray-800 text-neon-blue border border-neon-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
        />
      </div>
      <div>
        <label className="block text-neon-blue">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 bg-gray-800 text-neon-blue border border-neon-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-neon-blue text-white rounded-lg shadow hover:bg-neon-blue-dark transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

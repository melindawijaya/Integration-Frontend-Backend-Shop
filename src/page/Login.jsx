import { Link } from "react-router-dom";
import { FormLogin } from "../components/Fragments/FormLogin";
import { AuthLayout } from "../Layouts/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg border border-neon-blue">
        <h1 className="text-2xl font-bold text-neon-blue text-center mb-6">
          Welcome Back
        </h1>
        <FormLogin />
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-neon-blue hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

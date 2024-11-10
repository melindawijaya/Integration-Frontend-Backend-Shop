import { Link } from "react-router-dom";
import { FormRegister } from "../components/Fragments/FormRegister";
import { AuthLayout } from "../Layouts/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg border border-neon-blue">
        <h1 className="text-2xl font-bold text-neon-blue text-center mb-6">
          Create Account
        </h1>
        <FormRegister />
        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-neon-blue hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

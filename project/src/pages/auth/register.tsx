import { Link } from "react-router-dom";
import { RegisterForm } from "../../components/auth/register-form";

export function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="mt-2 text-neutral-600">
          Already have an account?{" "}
          <Link to="/login" className="text-neutral-900 underline">
            Login
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}

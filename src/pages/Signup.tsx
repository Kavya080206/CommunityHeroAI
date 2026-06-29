import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/auth";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signupUser(data.email, data.password);

      alert("Account created successfully!");

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-900 p-8 rounded-xl w-[420px] space-y-5"
      >
        <h1 className="text-3xl text-white font-bold text-center">
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          className="w-full p-3 rounded bg-slate-800 text-white"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 text-white"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-800 text-white"
          {...register("password", {
            required: "Password is required",
            minLength: 6,
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">
            Password must be at least 6 characters.
          </p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded bg-slate-800 text-white"
          {...register("confirmPassword", {
            required: "Confirm your password",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-semibold transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
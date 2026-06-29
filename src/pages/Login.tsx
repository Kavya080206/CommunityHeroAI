import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.email, data.password);

      alert("Login Successful!");

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
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 text-white"
          {...register("email", { required: true })}
        />

        {errors.email && (
          <p className="text-red-400 text-sm">Email is required</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-800 text-white"
          {...register("password", { required: true })}
        />

        {errors.password && (
          <p className="text-red-400 text-sm">Password is required</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
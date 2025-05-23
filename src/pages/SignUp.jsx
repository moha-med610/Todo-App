import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/signup`, {
        fullName,
        email,
        password,
      });
      toast.success(response?.data?.message);
      navigate("/");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center text-white bg-zinc-900">
      <ToastContainer />
      <section className="flex w-[30rem] flex-col space-y-10 mx-20">
        <div className="text-center text-4xl font-medium">Register</div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            required
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            required
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            required
          />
        </div>

        <button
          className="transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 text-white hover:bg-indigo-400"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            "REGISTER"
          )}
        </button>

        <p className="text-center text-lg">
          Already have an account?
          <Link
            to="/"
            className="ml-2 font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUp;

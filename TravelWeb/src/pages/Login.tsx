import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {  FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";


interface FormData {
  email: string;
  password: string;

}


const SigninPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate=useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const apiCall = useMutation<void, Error, FormData>({
    mutationKey: ['POST_Authenticate'],
    mutationFn: async (FormData) => {
        try {
            const response = await axios.post('http://localhost:8082/authenticate', FormData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error:any) {
            throw new Error(error.response?.data || error.message);
        }
    },
    onError: (error) => {
        toast.error(`Error: ${error.message}`);
    },
});

const { register, handleSubmit } = useForm<FormData>();

const onSubmit = async (data: FormData) => {
  try {
    const response = await apiCall.mutateAsync(data);


    
    const token = response.token; 
    localStorage.setItem('token', token);
    toast.success('Login successful!');
    navigate("/");
    console.log('Registration successful');
  } catch (error) {
    console.error('Error during login', error);
    if (error instanceof Error) {
      toast.error(`Error during login: ${error.message}`);
      console.error('Error details:', error); // Log the entire error object
    } else {
      toast.error('An unknown error occurred during login.');
      console.error('Unknown error details:', error); // Log the entire error object
    }
  }
};

  
  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center relative">
      <img
        src="src/assets/sanjay-hona-2Q2dpVPY6XU-unsplash(1).jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="bg-slate-50 rounded p-12 z-10 border border-l-black w-[28%] h-auto flex flex-col gap-3 justify-center items-center">
        <h2 className="text-4xl text-black font-bold mt-4 mb-4">Log in</h2>

        <form className="w-full flex flex-col gap-4"onSubmit={handleSubmit(onSubmit)}>

          <div className="relative">
            <input
              type="email"
              id="email"
              className="placeholder-slate-700 p-2 pl-6 block w-full h-12 bg-slate-100 rounded shadow-sm focus:outline-none focus:ring-white focus:border-blue-500  focus:border-2  text-black"
              placeholder="Email"
              {...register("email")}
              
            />
            <FaEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="placeholder-slate-700 p-2 pl-6 block w-full h-12 bg-slate-100 rounded shadow-sm focus:outline-none focus:ring-white focus:border-blue-500  focus:border-2  text-black"
              placeholder="Password"
              {...register("password")}
            />
            {passwordVisible ? (
              <FaEye
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <div className="w-2/5 self-center mt-8">
            <button
              type="submit"
              className="bg-blue-300  min-w-full h-16 rounded text-black text-center text-2xl px-4 py-2 mb-6 cursor-pointer hover:bg-blue-400"
            >
              Log In
              <Toaster className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out" richColors />
            </button>
          </div>
        </form>
        <div className="text-blue-500 mb-4 -mt-4">
          Don't have an account? {""}
          <a href="/register" className="underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
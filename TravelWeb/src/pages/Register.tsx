import { useState } from "react";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import {toast, Toaster} from 'sonner';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 

interface FormData {
  username: string;
  password: string;
  fullname: string;
  email: string;
}


const SignupPage = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const apiCall = useMutation<void, Error, FormData>({
    mutationKey: ['POST_USER_REGISTER'],
    mutationFn: async (FormData) => {
        try {
            const response = await axios.post('http://localhost:8082/user/signup', FormData, {
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
      await apiCall.mutateAsync(data);
      toast.success('Register Successful!');
      navigate("/login");
      console.log('Registration successful');
      //
  } catch (error) {
      console.error('Error during registration', error);
      if (error instanceof Error) {
          toast.error(`Couldnot Login`);
          console.error('Error details:', error); // Log the entire error object
      } else {
          toast.error('An unknown error occurred during registration.');
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
        <h2 className="text-4xl text-black font-bold mt-4 mb-4">Sign Up</h2>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className=" relative">
            <input
              type="text"
              id="fullname"
              className="placeholder-slate-700 p-2 pl-6 block w-full h-12 bg-slate-100 rounded shadow-sm focus:outline-none focus:ring-white focus:border-blue-500  focus:border-2  text-black"
              placeholder="Full Name"
              {...register("fullname")}
            />
            <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
          <div className=" relative">
            <input
              type="text"
              id="username"
              className="placeholder-slate-700 p-2 pl-6 block w-full h-12 bg-slate-100 rounded shadow-sm focus:outline-none focus:ring-white focus:border-blue-500  focus:border-2  text-black"
              placeholder="User Name"
              {...register("username")}
            />
            <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
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
          <div className="w-64 self-center mt-8">
            <button
              type="submit"
              className="bg-blue-300  min-w-full h-16 rounded text-black text-center text-2xl px-4 py-2 mb-6 cursor-pointer hover:bg-blue-400"
            >
              Sign Up
              <Toaster className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out" richColors />
            </button>
          </div>
        </form>
        <div className="text-blue-500 mb-4 -mt-4">
          Already have an account? {""}
          <a href="/login" className="underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;


// "use client"
// import React, { useState } from "react";
// import axios from "axios";
// import {toast, Toaster} from 'sonner';
// import Navbar from "../components/navbar";


// const SignupForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     fullname: '',
//     password: '',
//     email: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8082/user/signup', formData);
//       console.log(response.data);
//       toast.success(`Signup Successful!`, {
//         position: "top-right",
//         duration: 2000,
//         style: {
//           minWidth: "300px",
//           maxWidth: "400px",
//           minHeight: "80px",
//           fontSize: "18px",
//           transform: "translateX(0%)", 
//         },
//       });
      
//     } catch (error) {
//       console.error('Signup failed:', error);
//       toast.error("An error occurred during signup"
//         , {
//           position: "top-right",
          
//           style: {
//             minWidth: "300px",
//             maxWidth: "400px",
//             minHeight: "80px",
//             fontSize: "18px",
//             transform: "translateX(0%)", 
//           },
//         });
      
//     }
//   };

//   return (
//     <>
//     <Navbar/>
// <div className="max-w-md mx-auto mt-8">
  
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="username" className="block mb-1">Username</label>
//           <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
//         </div>
//         <div>
//           <label htmlFor="fullName" className="block mb-1">Full Name</label>
//           <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
//         </div>
//         <div>
//           <label htmlFor="password" className="block mb-1">Password</label>
//           <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
//         </div>
//         <div>
//           <label htmlFor="email" className="block mb-1">Email</label>
//           <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign Up
//         <Toaster className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out" richColors />
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default SignupForm;
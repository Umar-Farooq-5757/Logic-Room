import React, { useState, } from "react";
import api from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../services/authService";

const UserLogin = ({ setMethod }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginUser = async()=>{
     try {
      const response = await api.post('/login', {  email, password })
      if (!response.data.success) {
        toast.error(response.data.message)
      }else{
        localStorage.setItem('token',response.data.token)
        toast.success(response.data.message)
      }
      console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <> <div className="min-h-1/2 w-3/8 border-2 rounded-lg shadow-sm border-gray-300 bg-white py-7 px-5 flex flex-col justify-center gap-7">
      <div>
        <h1 className="font-extrabold text-3xl text-center">
          Welcome Back!
        </h1>
        <p className="text-center text-sm">
          Please sign in to your account
        </p>
      </div>
      <div>
        <div className="input my-3">
          <p className="text-sm font-semibold">Email Address</p>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-sm w-full outline-none pl-3 py-2.5 my-1"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="input my-3">
          <p className="text-sm font-semibold">Password</p>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-sm w-full outline-none pl-3 py-2.5 my-1"
            type="text"
            placeholder="Enter your password"
          />
        </div>
      </div>
      <button
      onClick={loginUser}
        className={`bg-[#6b1eb9] text-white w-full rounded-md py-2 hover:opacity-85`}
      >
        Login
      </button>
      <p className="text-end text-sm">
        Don't have an account?{" "}
        <span onClick={() => setMethod('signup')} className="font-semibold text-blue-500 cursor-default hover:underline">
          Sign up
        </span>
      </p>
    </div></>
  )
}
const UserSignup = ({ setMethod }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const createAccount = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    try {
      const response = await api.post('/register', { username, email, password })
      if (!response.data.success) {
        toast.error(response.data.message)
      }else{
        toast.success(response.data.message)
      }
      console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <> <div className="min-h-1/2 w-3/8 border-2 rounded-lg shadow-sm border-gray-300 bg-white py-7 px-5 flex flex-col justify-center gap-7">
      
      <div>
        <h1 className="font-extrabold text-3xl text-center">
          Create Account
        </h1>
        <p className="text-center text-sm">
          Enter your details to get started
        </p>
      </div>
      <div>
        <div className="input my-3">
          <p className="text-sm font-semibold">Full Name</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-sm w-full outline-none pl-3 py-2.5 my-1"
            type="text"
            placeholder="Enter your full name"
          />
        </div>
        <div className="input my-3">
          <p className="text-sm font-semibold">Email Address</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-sm w-full outline-none pl-3 py-2.5 my-1"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="input my-3">
          <p className="text-sm font-semibold">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-sm w-full outline-none pl-3 py-2.5 my-1"
            type="text"
            placeholder="Create a strong password"
          />
        </div>
        <div className="input my-3">
          <p className="text-sm font-semibold">Confirm Password</p>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-sm w-full outline-none pl-3 py-2.5 my-1"
            type="text"
            placeholder="Re enter your password"
          />
        </div>
      </div>
      <button
        onClick={createAccount}
        className={`bg-[#6b1eb9] text-white w-full rounded-md py-2 hover:opacity-85`}
      >
        Create Account
      </button>
      <p className="text-end text-sm">
        Already have an account?{" "}
        <span onClick={() => setMethod('login')} className="font-semibold text-blue-500 cursor-default hover:underline">
          Login
        </span>
      </p>
    </div></>
  )
}

const Login = () => {
  const [method, setMethod] = useState("login");
  return (
    <div className="bg-[#ebf2ff] text-black h-screen flex justify-center items-center select-none">
      <Toaster position="top-center"
        reverseOrder={false} />
      {method == "login" ? (
        <UserLogin setMethod={setMethod} />
      ) : <UserSignup setMethod={setMethod} />}
    </div>
  );
};

export default Login;

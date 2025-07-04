import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { signUp, login, googleLogin } from "../../functions/userFunctions"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (isSignUp) {
        await dispatch(signUp({ name, email, password }, navigate));
      } else {
        await dispatch(login({ email, password }, navigate));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login/Signup Failed")
    }
  };

  const handleGoogleLogin = async (decoded) => {
    try {
      await dispatch(googleLogin(decoded, navigate));
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Login Failed")
    }
  };

  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
      <div className='sm:p-8 p-4 bg-white rounded shadow border-gray-500 flex flex-col gap-8'>
        <h1 className='text-xl font-semibold text-center'>{isSignUp ? 'Sign Up' : 'Log In'} With</h1>
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              handleGoogleLogin(decoded);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {isSignUp && (
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-sm'>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='bg-gray-100 p-2 sm:w-80 rounded border border-gray-300 focus:outline-none'
              />
            </div>
          )}
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-sm'>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='bg-gray-100 p-2 sm:w-80 rounded border border-gray-300 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password" className='text-sm'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='bg-gray-100 p-2 sm:w-80 rounded border border-gray-300 focus:outline-none'
              />
              {showPassword ? (
                <FaEyeSlash
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
          <button type="submit" className='bg-black text-white p-2 rounded cursor-pointer'>{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </form>
        {isSignUp ? (
          <p className='text-sm text-center'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => setIsSignUp(false)}>Log In</span></p>
        ) : (
          <p className='text-sm text-center'>Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={() => setIsSignUp(true)}>Sign Up</span></p>
        )}
      </div>
    </div>
  )
}

export default LoginPage
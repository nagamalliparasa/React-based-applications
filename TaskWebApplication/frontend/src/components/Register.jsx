import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {register,registerError}=useContext(AuthContext);
  

  const navigate=useNavigate();

  // Error state
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log({ username, email, password });
      register(username,email,password);
      alert('Form Submitted Successfully!');
      // Here you can add the fetch request to send data to your backend
    } else {
      setErrors(newErrors);
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } 
    else if (!emailRegex.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } 
    
    else if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password must contain at least 1 lowercase, 1 uppercase, 1 number, and be 8+ characters';
    }

    return newErrors;
  };


  const handleLogin =()=>{
    navigate('/login');
  }

  return (
    <div>
      <Navbar />

      <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-4xl font-bold mb-4 text-center'>Register</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Username Input */}
        <div>
          <label className=" block text-gray-700 mb-2 ">Username</label>
          <input
            type="text"
            value={username}
            className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className=" block text-gray-700 mb-2 ">Email</label>
          <input
            type="email"
            value={email}
            className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className=" block text-gray-700 mb-2 ">Password</label>
          <input
            type="password"
            value={password}
            className="w-full px-3 py-2  my-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password}</p>
          )}
        </div>

        {/* Error message */}
        {registerError && <p style={{ color: 'red' }}>{registerError}</p>}

        {/* Submit Button */}
        
        <div className='grid grid-cols-2 gap-4 '>
          <div></div>
          <div className='rounded-lg shadow-lg text-white'>
          <p style={{ color: 'red' }}>Already existing user?</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-5'>
        <button type="submit"
        className="w-full text-center py-2 px-4 bg-custom-purple text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >Register</button>

        <div className='rounded-lg shadow-lg text-white'>
        <button onClick={handleLogin}
        className="w-full text-center py-2 px-4 bg-custom-purple text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >Login</button>
        </div>
        </div>

        <div className='border mx-20'>
          <div className='mx-20'>
            <button onClick={() =>{ navigate('/')}} className='w-full text-xl border bg-red-500 text-l = my-5 text-white hover:bg-red-700 hover:text-white px-3 py-2 rounded'>Back</button>
          </div>
        </div>

      </form>
    </div>
    </div>
  );
};

export default Register;

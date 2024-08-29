import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/Oauth';
import { Alert } from 'flowbite-react';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.confirmPassword) {
      return setErrorMessage('Please fill out all fields.');
    }

    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage('Passwords do not match.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20 flex items-center flex-col'>
      <h1 className='mr-60 text-2xl font-bold text-blue-500'>Signup</h1>

      <div className='w-[300px] h-[450px] mt-2 border-2 shadow-md rounded-md border-blue-500 mx-auto sm:w-[400px] sm:h-[300px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[450px]'>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center gap-3 mt-10'>
            <input type="text" placeholder='First Name' className='h-10 w-[90%] border-2 p-2 shadow-sm rounded-md' id='firstname' onChange={handleChange} />
            <input type="text" placeholder='Last Name' className='h-10 w-[90%] border-2 p-2 shadow-sm rounded-md' id='lastname' onChange={handleChange} />
            <input type="email" placeholder='Email' className='h-10 w-[90%] border-2 p-2 shadow-sm rounded-md' id='email' onChange={handleChange} />
            <input type="password" placeholder='Password' className='h-10 w-[90%] border-2 p-2 shadow-sm rounded-md' id='password' onChange={handleChange} />
            <input type="password" placeholder='Confirm Password' className='h-10 w-[90%] border-2 p-2 shadow-sm rounded-md' id='confirmPassword' onChange={handleChange} />
            <button type='submit' className='h-10 w-[90%] text-white font-semibold border-2 p-2 shadow-sm bg-blue-500 rounded-md'>Signup</button>
          </div>
        </form>

        <p className='text-center mt-2 font-semibold '>Don't have an account? <span onClick={() => navigate('/login')} className='text-blue-500 font-semibold cursor-pointer'>Login</span></p>
        <button className='h-10 w-[50%] mt-2 text-white flex mx-auto font-semibold border-2 p-2 shadow-sm bg-blue-500 rounded-md'><OAuth /></button>
      </div>
      {errorMessage && (
        <Alert className='mt-5' color='failure'>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}

export default Signup;

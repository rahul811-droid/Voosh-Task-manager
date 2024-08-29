import OAuth from '../components/Oauth';

import  { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import { useDispatch ,useSelector} from 'react-redux'
import { Alert } from 'flowbite-react';
const Signin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  

  const dispatch = useDispatch() ;

  const {loading,error:errorMessage} = useSelector(state=>state.user)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    console.log(formData)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }
    try {
     dispatch(signInStart());
      const res = await fetch('/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false) {
      dispatch(signInFailure(data.message))
      }
      
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/dash');
      }
    } catch (error) {
    
    dispatch(signInFailure(error.message))
    }

  }



  return (
    <div className='min-h-screen mt-20 flex items-center flex-col'>
      <h1 className='mr-60 text-2xl font-bold text-blue-500'>Login</h1>

      <div className='w-[300px] h-[300px] mt-2 border-2 shadow-md rounded-md border-blue-500 mx-auto sm:w-[400px] sm:h-[250px] md:w-[350px] md:h-[275px] lg:w-[400px] lg:h-[300px]'>

      <form onSubmit={handleSubmit}>
    
    <div className='flex flex-col  items-center gap-3 mt-10'>
    <input type="email" placeholder='Email' className='h-10 w-[90%] border-2 p-2 shadow-sm rounded-md' id='email' onChange={handleChange}/>
    <input type="password" placeholder='Password' className='h-10 w-[90%] border-2 p-2 shadow-sm rounded-md' id='password' onChange={handleChange}/>
    <button type='submit' className='h-10 w-[90%] text-white font-semibold border-2 p-2 shadow-sm bg-blue-500 rounded-md'>Login</button>
    </div>
     
      </form>

      <p className='text-center mt-2 font-semibold '>Don't have an account?    <span onClick={()=>navigate('/signup')} className='text-blue-500 font-semibold cursor-pointer'>Signup</span></p>
      <button className='h-10  w-[50%] mt-2 text-white  flex mx-auto  font-semibold border-2 p-2 shadow-sm bg-blue-500 rounded-md'><OAuth/></button>
      </div>

      {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
    </div>
  )
}

export default Signin


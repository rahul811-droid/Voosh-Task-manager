import React from 'react';
import { FaTasks } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {signoutSuccess} from '../redux/user/userSlice'

const Header = () => {

  const { currentUser, error, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  console.log(currentUser)

const navigate = useNavigate()

const handleSignOut = async()=>{
  try {
    const res = await fetch('/api/user/signout',{
      method:"POST",
    });
    const data = res.json();
    if(!res.ok){
      console.log(data.message);
    }else{
      dispatch(signoutSuccess());
      // navigate('/login')
    }
  } catch (error) {
    console.log(error.message);
  }
  
  }

  return (
    <div className='h-[80px] max-w-full mx-auto bg-blue-500 flex justify-between'>
      <h2 className='flex gap-3 items-center ml-5 text-white text-2xl'>
        Task Manager 
        <span>
          <CgNotes className='text-2xl' />
        </span>
      </h2>

      <div className='flex gap-2 mr-2  items-center '>
      {currentUser ? (
  <button 
    onClick={handleSignOut} 
    className='text-xl font-semibold bg-white h-10 w-20 rounded-lg cursor-pointer hover:bg-slate-200 active:bg-slate-300 md:text-lg md:w-20 md:h-9 sm:text-base sm:w-16 sm:h-8'>
    Signout
  </button>
) : (
  <>
    <button 
      onClick={() => navigate('/login')} 
      className='text-xl font-semibold bg-white h-10 w-20 rounded-lg cursor-pointer hover:bg-slate-200 active:bg-slate-300 md:text-lg md:w-20 md:h-9 sm:text-base sm:w-16 sm:h-8'>
      Login
    </button>
    <button 
      onClick={() => navigate('/signup')} 
      className='text-xl font-semibold bg-white h-10 w-20 rounded-lg cursor-pointer hover:bg-slate-200 active:bg-slate-300 md:text-lg md:w-20 md:h-9 sm:text-base sm:w-16 sm:h-8'>
      Signup
    </button>
  </>
)}


       
       
      </div>
    </div>
  );
};

export default Header;

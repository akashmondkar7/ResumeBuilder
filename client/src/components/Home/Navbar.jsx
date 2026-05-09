import React, {  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/fetures/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const Navbar = () => {
    const{user} = useSelector (state => state.auth)
    const dispatch = useDispatch ()

    const navigate = useNavigate()
    const logoutUser = () => {
        navigate('/')
        dispatch(logout)

    }

  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px py-3.5 text-slate-800 transition-all'>
            <Link to="/">
            <img src="/logo.svg" alt=" Logo" className="w-auto h-11" />
            </Link>
            <div className=' flex items-center justify-center gap-4'>
                <p>Hi,{user.name}</p>
                <button onClick={logoutUser} className=' bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
      
    </div>
  )
   }
   


export default Navbar;


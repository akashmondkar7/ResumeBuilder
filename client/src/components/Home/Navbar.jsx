import React, {  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const user ={name: "John Doe"}
    const navigate = useNavigate()
    const logoutUser = () => {
        navigate('/')
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


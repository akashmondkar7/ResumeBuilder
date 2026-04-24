import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Home/Navbar.jsx'

const Layout = () => {
  return (
    <div>
        <div>
          <Navbar/>
            <Outlet />
        </div>
      
    </div>
  )
}

export default Layout

import React from 'react'
import './Navbar.css'
// import icon from '../../assets/admin-logo.jpeg';
import icon  from '../../assets/profile.gif';


const Navbar = () => {
  return (
    <div className='admin-navbar'>
        <h2>FlashFeast</h2>
        <img src={icon} alt='' className='admin-logo'></img>
    </div>
  )
}

export default Navbar;
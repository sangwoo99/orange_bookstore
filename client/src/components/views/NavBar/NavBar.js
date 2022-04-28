import React from 'react';
import RightMenu from './Sections/RightMenu.js';
import LeftMenu from './Sections/LeftMenu.js';

const NavBar = () => {
  return (
    <div style={{display: 'flex'}}>
      <LeftMenu/>
      <RightMenu/>
    </div>
  )
};

export default NavBar;
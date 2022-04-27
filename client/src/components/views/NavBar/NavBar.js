import React from 'react';
import RightMenu from './Sections/RightMenu.js';
import LeftMenu from './Sections/LeftMenu.js';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const NavBar = () => {
  return (
    <div style={{display: 'flex'}}>
      <LeftMenu/>
      <RightMenu/>
    </div>
  )
};

export default NavBar;
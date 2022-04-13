import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const NavBar = () => {
  return (
    <Box sx={{  width: '100%'  }}>
      <Tabs
        value
        onChange
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="국내 도서" />
        <Tab value="two" label="외국 도서" />
        <Tab value="three" label="중고 도서" />
        <Tab value="four" label="문구" />
      </Tabs>
    </Box>
  )
};

export default NavBar;
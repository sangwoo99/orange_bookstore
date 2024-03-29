import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const LeftMenu = () => {
  const navigator = useNavigate();

  const handleMovePage = (e, value) => {
    console.log(value);
    navigator(value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleMovePage}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="/" label="홈"/>
        <Tab value="/list/domestic" label="국내 도서" />
        <Tab value="/list/foreign" label="외국 도서" />
        <Tab value="/list/used" label="중고 도서" />
        <Tab value="/list/stationery" label="문구" />
      </Tabs>
    </Box>
  )
}

export default LeftMenu
import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const RightMenu = () => {
    function LinkTab(props) {
        return (
            <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
            />
        );
        }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value onChange aria-label="nav tabs example">
            <LinkTab label="로그인" href="/login" />
            <LinkTab label="회원 가입" href="/register" />
            </Tabs>
        </Box>
    );
}

export default RightMenu
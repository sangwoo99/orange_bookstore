import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../_actions/user_actions';
// import withRouter from 'react-router-dom'

const RightMenu = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user); // 리덕스에서 state를 가져옴
    
    const handleLogout = () => {
        dispatch(logoutUser()).then( res => {
            if(res.payload.status === 200) {
                props.history.push('/');
            } else {
                alert('로그아웃 실패');
            }
        })
    };

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
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs onChange aria-label="nav tabs example">
            {
                user.userData && user.userData.isAuth 
                ? <LinkTab label="로그아웃" onClick={handleLogout} />    
                : <>
                    <LinkTab label="로그인" href="/login" />
                    <LinkTab label="회원 가입" href="/register" />
                  </>
                    
            }
            </Tabs>
        </Box>
    );
}

export default RightMenu;
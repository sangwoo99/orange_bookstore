import React from 'react';
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

    // 부모 태그로 묶으면 href 안되는 현상 해결방법
    if( user.userData && user.userData.isAuth ) {
        return (
            <Box sx={{ width: '100%' }}>
                <Tabs onChange aria-label="nav tabs example">
                    <LinkTab label="로그아웃" onClick={handleLogout} />    
                </Tabs>
            </Box>
        );
    } else {
        return (
            <Box sx={{ width: '100%' }}>
                <Tabs onChange aria-label="nav tabs example">
                    <LinkTab label="로그인" href="/login" /> 
                    <LinkTab label="회원 가입" href="/register" />
                </Tabs>
            </Box>
        );
    }

    // return (
    //     <Box sx={{ width: '100%' }}>
    //         <Tabs onChange aria-label="nav tabs example">
    //             {
    //                 user.userData && user.userData.isAuth 
    //                 ? <LinkTab label="로그아웃" onClick={handleLogout} />    
    //                 : <>
    //                     <LinkTab label="로그인" href="/login" /> 
    //                     <LinkTab label="회원 가입" href="/register" />
    //                 </>
    //                 // 눌러도 해당 url로 이동이 안됨, JSX 내부에서는 부모로 묶으면 href가 안되나?
    //             }
    //         </Tabs>
    //     </Box>
    // );
    
}

export default RightMenu;
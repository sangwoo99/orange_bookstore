/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function (SpecificComponent, option, adminRoute = null) {
    console.log('AuthenticationCheck')
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
          dispatch(auth()).then(res => {
              // 로그인 하지 않는 상태
              if(!res.payload.isAuth) {
                  if(option) { // 로그인한 사람만 들어올 수 있는 경우
                    props.history.push('/login'); // useNavigate() 써도 됨
                  }
                  return;
              } else { // 로그인 한 상태
                // // 어드민 계정이 아닌 경우
                // if(adminRoute && !res.payload.isAdmin) {
                //     props.history.push('/');
                // } else { // 어드민 계정
                    if(option === false) { // 로그인 안한 사람만 들어올 수 있는 경우
                        props.history.push('/');
                    }
                // }
              }
          })
        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }

    // react-router-dom v5에서는 component 안에 함수를 넣는다.
    // return AuthenticationCheck; 

    // react-router-dom v6에서는 element안에 함수가 아닌 컴포넌트를 넣어야한다.
    return <AuthenticationCheck/>;  
}
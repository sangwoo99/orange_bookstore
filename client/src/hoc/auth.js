import { useEffect } from 'react';
import auth from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
          dispatch(auth()).then(res => {
              // 로그인 하지 않는 상태
              if(!res.payload.isAuth) {
                  if(option) {
                    props.history.push('/login'); // useNavigate() 써도 됨
                  }
                  return;
              } else { // 로그인 한 상태

                if(adminRoute && !res.payload.isAdmin) {
                    props.history.push('/');
                }

                if(option === false) {
                    props.history.psuh('/');
                }
              }

          })
        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }

    return AuthenticationCheck;
}
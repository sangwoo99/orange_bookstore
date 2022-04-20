import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';

const LoginPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch(); // 리덕스의 액션을 디스패치함

  const [ID, setID] = useState('');
  const [Password, setPassword] = useState('');

  const handleID = (e) => {
    setID(e.target.value);
    console.log(ID);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(Password);
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    let body = {
      id: ID,
      password: Password
    };

    dispatch(loginUser(body))
      .then(res => {
        if(res.payload.loginSuccess) {
          console.log(res.payload.loginSuccess);
          navigator('/');
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 700 }}>
      <form onSubmit={handleOnsubmit}>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>로그인</h2>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="ID"
              value={ID}
              onChange={handleID}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={Password}
              onChange={handlePassword}
            />
          </div>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type='submit'>로그인</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
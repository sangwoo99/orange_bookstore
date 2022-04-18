import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigator = useNavigate();
  const [Name, setName] = useState('');
  const [ID, setID] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordCheck, setPasswordCheck] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
    console.log(Name);
  };

  const handleID = (e) => {
    setID(e.target.value); 
    console.log(ID);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };


  const handleOnSubmit = (e) => {
    e.preventDefault(); // form태그에서 submit을 하면 페이지가 새로 고침되는데 이것을 막음

    if(Password !== PasswordCheck) {
      return alert('비밀번호와 비밀번호 체크가 일치하지 않습니다. 다시 확인해주세요.');
    }

    let body = {
      id : ID,
      name: Name,
      password: Password
    };

    console.log('body:', body);

    axios.post('/api/users/register', body)
      .then( res => {
        if(res.success) {
          navigator('/login');
        }

        alert('400 error');
      })
      .fail(alert('API Failed'))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleOnSubmit}>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>회원 가입</h2>
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
              label="Name"
              value={Name}
              onChange={handleName}
            />
          </div>
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
          <div>
            <TextField
              id="outlined-password-input"
              label="PasswordCheck"
              type="password"
              autoComplete="current-password"
              value={PasswordCheck}
              onChange={handlePasswordCheck}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="email"
            />
          </div>
          <div>
            <TextField
              id="outlined-required"
              label="sex"
            />
          </div>
        </Box>
        <button type='submit'>회원 가입</button>
      </form>
    </div>
  )
};

export default RegisterPage;
import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
      id: ID,
      name: Name,
      password: Password
    };

    // 서로 다른 두 포트를 가지고 있는 서버는 그냥 request를 보낼 수 없어 에러남(by CORS정책)
    // https://create-react-app.dev/docs/proxying-api-requests-in-development 참고
    // => proxy 설정
    axios.post('/api/users/register', body)
      .then( res => {
        console.log(res);
        if(res.data.success) {
          navigator('/login'); //해당 url로 이동
        } else {
          alert('400 error:', res.data.err);
        }
      })
      .catch(console.log('API Failed'))
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
        <Button variant="contained" type='submit'>회원 가입</Button>
      </form>
    </div>
  )
};

export default RegisterPage;
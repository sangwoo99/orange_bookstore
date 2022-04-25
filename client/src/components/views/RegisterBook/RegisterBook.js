import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../utils/FileUpload';

const RegisterBook = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <FileUpload/>
      <form onSubmit>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>도서 등록</h2>
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
            //   value={Name}
            //   onChange={handleName}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="ID"
            //   value={ID}
            //   onChange={handleID}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            //   value={Password}
            //   onChange={handlePassword}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="PasswordCheck"
              type="password"
              autoComplete="current-password"
            //   value={PasswordCheck}
            //   onChange={handlePasswordCheck}
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type='submit'>등록하기</Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterBook;
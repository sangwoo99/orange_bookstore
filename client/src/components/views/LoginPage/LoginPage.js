import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 700 }}>
      <div>
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
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
        </Box>
      </div>
    </div>
  )
}

export default LoginPage
import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import FileUpload from '../utils/FileUpload';

const RegisterBook = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <form onSubmit>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>도서 등록</h2>
        <FileUpload/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                id="outlined-required"
                label="책 이름"
                //   value={Title}
                //   onChange={handleTitle}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="저자"
                //   value={Writer}
                //   onChange={handleWriter}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="출판사"
                //   value={Publisher}
                //   onChange={handlePublisher}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="가격"
                //   value={Price}
                //   onChange={handlePrice}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="판매 권수"
                //   value={Stock}
                //   onChange={handleStock}
                />
            </div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={category}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="카테고리" />}
            />
            <div>
                <TextField
                required
                id="outlined-required"
                label="책 내용"
                />
            </div>
            <div>
                <TextField
                id="outlined-required"
                label="중고책"
                />
            </div>
            </Box>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type='submit'>등록하기</Button>
        </div>
      </form>
    </div>
  )
}

const category = [
  { label: '문학' },
  { label: '역사' },
  { label: '과학' },
  { label: '컴퓨터' },
  { label: '수험서' },
  { label: "사회과학" },
];

export default RegisterBook;
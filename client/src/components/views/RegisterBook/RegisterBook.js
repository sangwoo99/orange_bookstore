import { React, useState } from 'react';
import axios from 'axios';
import FileUpload from '../utils/FileUpload';
import { BOOK_SERVER } from '../../Config';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { apiReqLog, apiResLog } from '../utils/logHelper';
import { useNavigate } from 'react-router-dom';

const RegisterBook = () => {
  const navigator = useNavigate();
  const [Title, setTitle] = useState('');
  const [Writer, setWriter] = useState('');
  const [Publisher, setPublisher] = useState('');
  const [Price, setPrice] = useState(0);
  const [Stock, setStock] = useState(0);
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [Used, setUsed] = useState(false);
  const [Images, setImages] = useState([]);

  const handleTitle = (e) => {
    console.log(e.currentTarget.value);
    setTitle(e.currentTarget.value);
  };

  const handleWriter = (e) => {
    console.log(e.currentTarget.value);
    setWriter(e.currentTarget.value);
  };

  const handlePublisher = (e) => {
    console.log(e.currentTarget.value);
    setPublisher(e.currentTarget.value);
  };

  const handlePrice = (e) => {
    console.log(e.currentTarget.value);
    setPrice(e.currentTarget.value);
  };

  const handleStock = (e) => {
    console.log(e.currentTarget.value);
    setStock(e.currentTarget.value);
  };

  // Autocomplete는 onChange에 등록한 핸들러함수 두번째 인수에 value값이 들어온다.
  const handleCategory = (e, value) => { 
    console.log(value.value);
    setCategory(value.value);
  };

  const handleDescription = (e) => {
    console.log(e.currentTarget.value);
    setDescription(e.currentTarget.value);
  };

  const handleUsed = (e) => {
    console.log(e.currentTarget.value);
    setUsed(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  }

  const handleSubmit = (e) => {
    // 이걸 쓰지 않으면 submit후 새로고침 되서 다음 코드들이 실행되지 않는다.
    e.preventDefault(); 
    
    // 값들 유효성 체크(조건문에서 0과 ''도 false로 평가됨)
    if(!Title || !Writer || !Publisher || !Price || !Category || !Stock || !Description || !Images) {
      return alert('모든 값을 넣어주세요.');
    }

    let body = {
      title: Title,
      writer: Writer,
      publisher: Publisher,
      price: Price,
      category: Category,
      stock: Stock,
      description: Description,
      used: Used,
      images: Images
    };

    apiReqLog('/register', 'RegisterBook', body);
    axios.post(`${BOOK_SERVER}/register`, body)
      .then(res => {
        apiResLog('/register', 'RegisterBook', res.data);
        if(res.data.success) {
          navigator('/');
        } else {
          alert('도서 등록에 실패 했습니다.');
        }

      }
    )
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>도서 등록</h2>
        <FileUpload refreshFunction={updateImages}/>
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
                value={Title}
                onChange={handleTitle}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="저자"
                value={Writer}
                onChange={handleWriter}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="출판사"
                value={Publisher}
                onChange={handlePublisher}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="가격"
                value={Price}
                onChange={handlePrice}
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-required"
                label="판매 등록 권수"
                value={Stock}
                onChange={handleStock}
                />
            </div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categories}
                sx={{ width: 300 }}
                renderInput={(params) => 
                  <TextField {...params} label="카테고리"/>
                }
                onChange={handleCategory}
              />
            <div>
                <TextField
                required
                id="outlined-required"
                label="책 설명"
                value={Description}
                onChange={handleDescription}
                />
            </div>
            <div>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">중고책 여부</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={Used}
                  onChange={handleUsed}
                >
                  <FormControlLabel value="false" control={<Radio />} label="새 것" />
                  <FormControlLabel value="true" control={<Radio />} label="중고" />
                </RadioGroup>
              </FormControl>
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

const categories = [
  { label: '문학', value: 'literature' },
  { label: '역사', value: 'history' },
  { label: '과학', value: 'science'},
  { label: '컴퓨터', value: 'computerScience' },
  { label: '수험서', value: 'testBook' },
  { label: '사회과학', value: 'socialScience' },
];

export default RegisterBook;
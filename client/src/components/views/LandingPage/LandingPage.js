import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { requestGetAPI } from '../utils/apiHelper';
import BookList from '../utils/BookList';

const LandingPage = () => {
  const [Books, setBooks] = useState([]);
  const [CategoryBooks, setCategoryBooks] = useState({});

  useEffect(() => {
    // apiReqLog('/list', 'LandingPage');
    // axios.get(`${BOOK_SERVER}/list`)
    //   .then(res => {
    //     apiResLog('/list', 'LandingPage', res.data);
    //     setBooks(res.data.books);
    //   })

    // api 로그, 호출 실패시 alert이 계속 중복되어 공통함수로 만듬
    // (url, component, params, callback)
    requestGetAPI('/list', 'LandingPage', null, (data) => {
      setBooks(data.books);

      let newObject = {};
      data.books.forEach((book) => {
        if( book.category === 'computerScience' ) {
          // 현상: useState에 object를 바로 넣으면 인식 못함
          // 원인: object의 참조값을 기준으로 비교하기 때문에
          // 해결: useState에 object를 변경할땐 새 object를 만들어 넣는다.
          // [참고] https://lovemewithoutall.github.io/it/react-usestate-object/
          newObject = { ...newObject, computerScience: book };
          
        } else if( book.category === 'testBook' ) {
          newObject = { ...newObject, testBook: book };
          
        } else if( book.category === 'literature' ) {
          newObject = { ...newObject, literature: book };
        }
        
        console.log('category', book.category);
        console.log('newObject', newObject);

      })
      setCategoryBooks(newObject)
      console.log('CategoryBooks', CategoryBooks);

    })
    

  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // 책 리스트가 반복되므로 컴포넌트화 함
  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <h3>컴퓨터 서적</h3>
              <BookList books={CategoryBooks.computerScience}/>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>수험서 서적</h3>
              <BookList books={CategoryBooks.testBook}/>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>문학 서적</h3>
              <BookList books={CategoryBooks.literature}/>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>문학 서적</h3>
              <BookList books={CategoryBooks.literature}/>
            </Item>
          </Grid>
        </Grid>
      </Box>  
    </div>
  )
}

export default LandingPage
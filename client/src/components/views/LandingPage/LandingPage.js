import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { requestGetAPI } from '../utils/apiHelper';
import BookList from '../utils/BookList';

const LandingPage = () => {
  // const [Books, setBooks] = useState([]);
  const [ComputerScienceList, setComputerScienceList] = useState([]);
  const [TestBookList, setTestBookList] = useState([]);
  const [LiteratureList, setLiteratureList] = useState([]);
  const [ScienceList, setScienceList] = useState([]);

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
      // let newArr = [];
      // data.books.forEach((book) => {
      //   if( book.category === 'computerScience' ) {
      //     // 현상: useState에 object를 바로 넣으면 인식 못함
      //     // 원인: object의 참조값을 기준으로 비교하기 때문에
      //     // 해결: useState에 object를 변경할땐 새 object를 만들어 넣는다.
      //     // [참고] https://lovemewithoutall.github.io/it/react-usestate-object/
      //     let computerScienceList = [ book ];
      //     setComputerScienceList(computerScienceList);
          
      //   } else if( book.category === 'testBook' ) {
      //     let TestBookList = [ book ];
      //     setTestBookList(TestBookList);

      //   } else if( book.category === 'literature' ) {
      //     let literatureList = [ book ];
      //     setLiteratureList(literatureList);

      //   } else if( book.category === 'science' ) {
      //     let scienceList = [ book ];
      //     setScienceList(scienceList);

      //   }
        
      //   console.log('category', book.category);
      //   console.log('newObject', newArr);

      // });

      // setBooks(newArr);

      let noComputerScienceList = [];
      let noTestBookList = [];
      let noLiteratureList = [];
      let noScienceList = [];

      let computerScienceList = data.books.filter((book) => {
        // return book.category === 'computerScience'
        if( book.category === 'computerScience' ) {
          return book;
        } else {
          noComputerScienceList.push(book); // 컴퓨터 카테고리가 아닌 책들로 다음 검색대상을 줄임
        }
      });
      
      let TestBookList = noComputerScienceList.filter((book) => {
        // return book.category === 'testBook'
        if( book.category === 'testBook' ) {
          return book;
        } else {
          noTestBookList.push(book); // 수험서 카테고리가 아닌 책들로 다음 검색대상을 줄임
        }
      })
      
      let literatureList = noTestBookList.filter((book) => {
        // return book.category === 'literature'
        if( book.category === 'literature' ) {
          return book;
        } else {
          noLiteratureList.push(book); // 문학 카테고리가 아닌 책들로 다음 검색대상을 줄임
        }
      })

      let scienceList = noLiteratureList.filter((book) => {
        // return book.category === 'literature'
        if( book.category === 'science' ) {
          return book;
        } else {
          noScienceList.push(book); // 문학 카테고리가 아닌 책들로 다음 검색대상을 줄임
        }
      })
      
      setComputerScienceList(computerScienceList);
      setTestBookList(TestBookList);
      setLiteratureList(literatureList);
      setScienceList(scienceList);

      console.log('useEffect 안의 ComputerScienceList', ComputerScienceList); 
      // useEffect 내에선 useState가 바로 안바뀌고 useEffect밖에서 바뀜
    })    

  }, []);

  console.log('useEffect 밖의 ComputerScienceList', ComputerScienceList);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // 책 리스트가 반복되므로 컴포넌트화 함
  // 리스트를 뽑아야하는 컴포넌트에는 객체가아닌 배열로 props를 던져주는게 좋다.
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <h3>컴퓨터 서적</h3>
              <BookList books={ComputerScienceList}/>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>수험서 서적</h3>
              <BookList books={TestBookList}/>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>문학 서적</h3>
              <BookList books={LiteratureList}/>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>과학 서적</h3>
              <BookList books={ScienceList}/>
            </Item>
          </Grid>
        </Grid>
      </Box>  
    </div>
  )
}

export default LandingPage
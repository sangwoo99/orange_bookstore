import React, { useEffect, useState } from 'react'
import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import { requestGetAPI } from '../utils/apiHelper';
import BookList from '../utils/BookList';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BOOK_SERVER } from '../../Config';
// import { apiReqLog, apiResLog } from '../utils/logHelper';

const LandingPage = () => {
  // const navigator = useNavigate();
  const [Books, setBooks] = useState([]);

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
    })

  }, []);

  const handleMoveDetail = (e) => {
    let value = e.currentTarget.value;
    console.log(value);
    navigator(`/detail/${value}`);
  };

  // 책 리스트가 반복되므로 컴포넌트화 함
  return (
    <div >
      <h3>컴퓨터 서적</h3>
        <BookList books={Books} category={'computerScience'}/>
      <h3>수험서 서적</h3>
        <BookList books={Books} category={'testBook'}/>
      <h3>문학 서적</h3>
        <BookList books={Books} category={'literature'}/>
    </div>
  )
}

export default LandingPage
import React, { useState, useEffect } from 'react';
import { requestGetAPI } from '../../utils/apiHelper';
import BookList from '../../utils/BookList';
// import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
// import axios from 'axios';
// import { BOOK_SERVER } from '../../../Config';
// import { apiReqLog, apiResLog } from '../../utils/logHelper';

const UsedPage = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    // apiReqLog('/list/detail', 'Used', 'used=true');
    // axios.get(`${BOOK_SERVER}/list/detail?used=true`)
    //   .then(res => {
    //     apiResLog('/list/detail', 'Used', res.data);
    //     if(res.data.success) {
    //       setBooks(res.data.books);
    //     }
    //   })

    requestGetAPI('/list/detail', 'UsedPage', 'used=true', (data) => {
      setBooks(data.books);
    })
  }, [])

  return (
    <div>
      <BookList books={Books}/>

      {/* <ImageList sx={{ width: 1500, height: 350 }} style={{ display: 'flex'}}>
      { 
        Books.map((book) => (
          <ImageListItem key={book.images[0]}>
          <img
            style={{width: 300, height: 150}}
            src={`http://localhost:5000/${book.images[0]}`}
            // srcSet={`http://localhost:5000/${book.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={book.title}
            loading="lazy"
          />
            <ImageListItemBar
              title={book.title}
              subtitle={<span>written by: {book.writer}</span>}
              position="below"
            />
          </ImageListItem>
        ))
      }
      </ImageList> */}
    </div>
  )
}

export default UsedPage

// 고민1(추후에도 전부 가져오진 않을듯)
// 처음에 전체 목록 가져온걸 리덕스에 등록하고
// 세부 목록 가져오기 할때 리덕스에서 가져와 해당 도서만 뽑아올지

// 고민2(결정)
// 세부 목록 가져오기 api를 만들어 해당 도서목록만 가져올지

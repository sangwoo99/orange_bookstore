import React, { useState, useEffect } from 'react';
import { requestGetAPI } from '../../utils/apiHelper';
import BookList from '../../utils/BookList';
// import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
// import axios from 'axios';
// import { BOOK_SERVER } from '../../../Config';
// import { apiReqLog, apiResLog } from '../../utils/logHelper';

const StationeryPage = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    // 문구류는 나중에 업데이트
    // apiReqLog('/list/detail', 'Used', 'foreignBook=true');
    // axios.get(`${BOOK_SERVER}/list/detail?foreignBook=true`)
    //   .then(res => {
    //     apiResLog('/list/detail', 'Used', res.data);
    //     if(res.data.success) {
    //       setBooks(res.data.books);
    //     }
    //   })

    requestGetAPI('/api/books/list/detail', 'StationeryPage', 'foreignBook=true', (data) => {
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

export default StationeryPage
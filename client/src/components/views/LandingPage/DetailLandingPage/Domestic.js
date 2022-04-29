import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BOOK_SERVER } from '../../../Config';
import { apiReqLog, apiResLog } from '../../utils/logHelper';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const Domestic = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    apiReqLog('/list/detail', 'Used', 'foreignBook=false');
    axios.get(`${BOOK_SERVER}/list/detail?foreignBook=false`)
      .then(res => {
        apiResLog('/list/detail', 'Used', res.data);
        if(res.data.success) {
          setBooks(res.data.books);
        }
      })
  }, [])

  return (
    <div>
      <ImageList sx={{ width: 1500, height: 350 }} style={{ display: 'flex'}}>
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
      </ImageList>
    </div>
  )
}

export default Domestic
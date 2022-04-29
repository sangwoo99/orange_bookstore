import React, { useEffect, useState } from 'react'
import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import axios from 'axios';
import { BOOK_SERVER } from '../../Config';
import { apiReqLog, apiResLog } from '../utils/logHelper';

const LandingPage = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    apiReqLog('/list', 'LandingPage');
    axios.get(`${BOOK_SERVER}/list`)
      .then(res => {
        apiResLog('/list', 'LandingPage', res.data);
        setBooks(res.data.books);
      })

  }, []);

  return (
    <div >
      <h3>컴퓨터 서적</h3>
      <ImageList sx={{ width: 1500, height: 350 }} style={{ display: 'flex'}}>
        {Books.map((book) => (
          book.category === 'computerScience' && (
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
          )
        ))}
      </ImageList>
      <h3>수험서 서적</h3>
      <ImageList sx={{ width: 1500, height: 350 }} style={{ display: 'flex'}}>
        {Books.map((book) => (
            book.category === 'testBook' && (
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
            )
        ))}
      </ImageList>
      <h3>문학 서적</h3>
      <ImageList sx={{ width: 1500, height: 350 }} style={{ display: 'flex'}}>
        {Books.map((book) => (
            book.category === 'literature' && (
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
            )
        ))}
      </ImageList>
    </div>
  )
}

export default LandingPage
import React from 'react';
import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';

const BookList = (props) => {
  return (
    <ImageList sx={{ width: 1500, height: 450 }} style={{ display: 'flex'}}>
        { // 배열이 undefined, [] (빈배열)로 올 수 있다. 그러면 map에서 에러가 생기므로 제외 로직을 짜야한다.
          props.books && props.books.length > 0 && props.books.map((book) => (
                <ImageListItem key={book.images[0]}>
                  <a href={`/detail/${book._id}`}>
                    <img
                      style={{width: 300, height: 350}}
                      src={`http://localhost:5000/${book.images[0]}`}
                      // srcSet={`http://localhost:5000/${book.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={book.title}
                      loading="lazy"
                      // onClick={handleMoveDetail}
                      // value={book._id}
                    />
                  </a>
                    <ImageListItemBar
                      title={book.title}
                      subtitle={<span>written by: {book.writer}</span>}
                      position="below"
                    />
                  </ImageListItem>
          ))
        }
      </ImageList>
  )
}

export default BookList
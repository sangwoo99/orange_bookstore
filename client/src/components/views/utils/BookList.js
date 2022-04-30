import React from 'react';
import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';

const BookList = (props) => {
  return (
    <ImageList sx={{ width: 1500, height: 350 }} style={{ display: 'flex'}}>
        {props.books.map((book) => (
            book.category === props.category && (
              <ImageListItem key={book.images[0]}>
                <a href={`/detail/${book._id}`}>
                  <img
                    style={{width: 300, height: 150}}
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
            )
        ))}
      </ImageList>
  )
}

export default BookList
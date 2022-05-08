import React, { useEffect, useState } from 'react';
import { requestGetAPI, requestPostAPI } from '../utils/apiHelper';
import { DataGrid } from '@mui/x-data-grid';

const CartPage = () => {
const [Rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'image', headerName: '이미지', width: 130 },
    { field: 'title', headerName: '책 이름', width: 130 },
    { field: 'writer', headerName: '저자', width: 130 },
    { field: 'publisher', headerName: '출판사', width: 130 },
    { field: 'price', headerName: '가격', type: 'number', width: 130 },
    { field: 'count', headerName: '개수', type: 'number', width: 130 },
  ];

  useEffect(() => {
      requestGetAPI('/api/users/getCart', 'DetailPage', null, (data) => {
        let cartInfo = data.cart.map((cartItem) => {
          let obj = {};
          data.books.forEach((book) => {
              if( cartItem.id === book._id ) {
                  obj = { ...book, count: cartItem.count };
              }
          })

          return obj;
        })
        console.log('cartInfo', cartInfo);
        
        const showImage = (image) => {
          return (
            <img
              style={{width: 400, height: 300}}
              src={`http://localhost:5000/${image}`}
              alt={image}
              loading="lazy"
            />
          )
        }

        const rows = cartInfo.map((book, index) => {
          let bookRow = { id: index + 1, image: showImage(book.images[0]), title: book.title, writer: book.writer, publisher: book.publisher, price: book.price, count: book.count }
          return bookRow;
        });

        setRows(rows);
      });
  }, [])

  return (
    <div>
      <h1>장바구니</h1>
      <div style={{ height: 400, width: '70%' }}>
        <DataGrid
          rows={Rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <div>총 금액</div>
      </div>
    </div>
  )
}

export default CartPage
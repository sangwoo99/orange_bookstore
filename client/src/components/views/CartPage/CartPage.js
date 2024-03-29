import React, { useEffect, useState } from 'react';
import { requestGetAPI, requestPostAPI } from '../utils/apiHelper';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const CartPage = () => {
const [Rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'images', headerName: '이미지', height: 100, width: 130, renderCell: (params) => {
      console.log('params.row', params.row);  
      return (
            <img
              style={{width: 70, height: 70}}
              src={`http://localhost:5000/${params.row.images[0]}`}
              alt={params.row.images[0]}
              loading="lazy"
            />
        )
      } 
    },
    { field: 'title', headerName: '책 이름', width: 130 },
    { field: 'writer', headerName: '저자', width: 130 },
    { field: 'publisher', headerName: '출판사', width: 130 },
    { field: 'price', headerName: '가격', type: 'number', width: 130 },
    { field: 'count', headerName: '개수', type: 'number', width: 130 },
    { field: 'delete', headerName: '삭제', width: 130, renderCell: (params) => {
      const handleDelete = (e) => {
          e.stopPropagation();

          let body = {
            book_id : params.row.id
          };

          requestPostAPI('/api/users/deleteCartItem', 'DetailPage', body, (data) => {
            let cartInfo = data.userInfo.cart.map((cartItem) => {
              let obj = {};
              data.books.forEach((book) => {
                  if(cartItem.id === book._id) {
                      obj = Object.assign({}, cartItem, book )
                      // obj = {...cartItem, ...book}
                  }
              })

              return obj;
            })
            console.log('cartInfo', cartInfo);
            setRows(cartInfo);
          })
      };

      return <Button variant="contained" color="primary" onClick={handleDelete}>삭제</Button>
    }}, 
    // material ui DataGrid안에 버튼, click 이벤트 넣기
    // https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid
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
        
        const rows = cartInfo.map((book, index) => {
          let bookRow = { id: book._id, images: book.images, title: book.title, writer: book.writer, publisher: book.publisher, price: book.price, count: book.count }
          return bookRow;
        });

        setRows(rows);
      });
  }, [])

  return (
    <div>
      <h1>장바구니</h1>
      <div style={{ height: 500, width: '80%' }}>
        <DataGrid
          rows={Rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <div>총 금액 <span>1000</span></div>
      </div>
    </div>
  )
}

export default CartPage
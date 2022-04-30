import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestGetAPI } from '../utils/apiHelper';

const DetailPage = (props) => {
  const [BookInfo, setBookInfo] = useState({});
  // let id = props.match.params.id; // react-router-dom v6라서 안되는건가?
  let { id } = useParams(); // hooks를 이용해서 params을 가져오는 방법
  
  useEffect(() => {
    // (url, component, params, callback)
    requestGetAPI('/detail', 'DetailPage', `_id=${id}`, (data) => {
      setBookInfo(data.bookInfo);
    })
  }, [])
  
  // 문제 현상: 배열은 이상하게 한 박자 느려서 처음에 undefined 뜨고 그다음에 값이 들어온다.
  // 원인: 비동기 호출이전에 컴포넌트가 렌더링이 되서
  // 해결책: && 연산자의 단축평가를 이용해서 값이 존재할때 렌더링하도록 한다.
  // [참고] https://moonformeli.tistory.com/3
  return (
    <>
      <div>DetailPage</div>
      <div>
        <div>책이름: {BookInfo.title}</div>
        <div>책 내용: {BookInfo.description}</div>
        <div>저자: {BookInfo.writer}</div>
        <div>출판사: {BookInfo.publisher}</div>
        <div>가격: {BookInfo.price}</div>
        <div>
          <img
            style={{width: 300, height: 150}}
            src={`http://localhost:5000/${BookInfo.images && BookInfo.images[0]}`}
            // srcSet={`http://localhost:5000/${book.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={BookInfo.images && BookInfo.images[0]}
            loading="lazy"
          />
        </div>
       </div>
    </>
  )
}

export default DetailPage
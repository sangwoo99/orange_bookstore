import React , { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './views/NavBar/NavBar.js';
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import RegisterBook from './views/RegisterBook/RegisterBook.js';
import Auth from '../hoc/auth';

function App() {
  // react-router-dom라이브러리에서 Switch, Router를 이용하여 SPA를 구현한다.
  // Suspense: 코드 스플리팅된 컴포넌트를 로딩하도록 발동, 로딩이 끝나지 않았을때 보여줄 UI설정
  
  //Auth 설정
  // true: 로그인 유저만 들어올 수 있음
  // null: 누구나 들어올 수 있음
  // false: 로그인 안한 유저만 들어올 수 있음
  return (
    <BrowserRouter>
      <Suspense fallbak={(<div>Loading...</div>)}>
        <NavBar/>
          <Routes>
            {/* <Route path='/' element={<LandingPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/> */}
            <Route path='/' element={Auth(LandingPage, null)}/>
            <Route path='/register' element={Auth(RegisterPage, null)}/>
            <Route path='/login' element={Auth(LoginPage, null)}/>
            <Route path='/register/book' element={Auth(RegisterBook, null)}/>
          </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

import React , { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './views/NavBar/NavBar.js';
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import RegisterBook from './views/RegisterBook/RegisterBook.js';
import Domestic from './views/LandingPage/DetailLandingPage/Domestic.js';
import Foreign from './views/LandingPage/DetailLandingPage/Foreign.js';
import Used from './views/LandingPage/DetailLandingPage/Used.js';
import Stationery from './views/LandingPage/DetailLandingPage/Stationery.js';
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
            <Route path='/register' element={Auth(RegisterPage, true)}/>
            <Route path='/login' element={Auth(LoginPage, false)}/>
            <Route path='/register/book' element={Auth(RegisterBook, null)}/>
            <Route path='/list/domestic' element={Auth(Domestic, null)}/>
            <Route path='/list/foreign' element={Auth(Foreign, null)}/>
            <Route path='/list/used' element={Auth(Used, null)}/>
            <Route path='/list/stationery' element={Auth(Stationery, null)}/>
          </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

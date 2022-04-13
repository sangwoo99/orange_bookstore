import React , { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './views/NavBar/NavBar.js';
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';

function App() {
  // react-router-dom라이브러리에서 Switch, Router를 이용하여 SPA를 구현한다.
  // Suspense: 코드 스플리팅된 컴포넌트를 로딩하도록 발동, 로딩이 끝나지 않았을때 보여줄 UI설정
  
  return (
    <BrowserRouter>
      <Suspense fallbak={(<div>Loading...</div>)}>
        <NavBar/>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
          </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

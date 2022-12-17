import './App.css';
import SignInScreen from './SignInScreen';
import Profile from './Profile'
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';
import React, { useState } from "react";

function App() {
  const [firstStart, setFirstStart] = useState(true);

  return (
    <HashRouter>
      <nav className='navLink'>
        <NavLink to='/Home' className={({ isActive }) => (isActive ? "Link active" : 'Link')}>Home</NavLink>
        <NavLink to='/Profile' className={({ isActive }) => (isActive ? "Link active" : 'Link')}>Profile</NavLink>
        <NavLink to='/Chat' className={({ isActive }) => (isActive ? "Link active" : 'Link')}>Chat</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        {/* {localStorage.token === undefined ? ( */}
        <Route path='/ProfileUser' element={<Profile />}></Route>
        {/* )
          :
          ( */}
        <Route path='/Profile' element={<SignInScreen />}></Route>
        {/* )} */}
        <Route path='/Chat' element={<Chat />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

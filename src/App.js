import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import MainStat from './components/Main';

const Navegation = () => (
  <div className="nav_main_cont">
    <div className="nav_container">
      <nav className="nav_menu">
        <NavLink
          to="/mainstat"
          style={({ isActive }) => ({
            textDecoration: isActive ? 'underline 2px' : 'none',
          })}
        >
          MainStat
        </NavLink>
      </nav>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navegation />
      <Routes>
        <Route path="/*" element={<MainStat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

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
    <nav className="nav_menu">
      <NavLink
        to="/mainstat"
        style={({ isActive }) => ({
          textDecoration: isActive ? 'underline 1px' : 'none',
        })}
      >
        select continent
      </NavLink>
    </nav>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navegation />
      <Routes>
        <Route path="/*" element={<MainStat name="Europe" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

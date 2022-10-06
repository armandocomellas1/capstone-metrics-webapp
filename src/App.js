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
import Details from './components/Details';

const Navegation = () => (
  <div className="nav_main_cont">
    <nav className="nav_menu">
      <NavLink
        to="/mainstat"
        style={({ isActive }) => ({
          textDecoration: isActive ? 'underline 1px' : 'none',
        })}
      >
        continent pollution
      </NavLink>
      <NavLink
        to="/details"
        style={({ isActive }) => ({
          textDecoration: isActive ? 'underline 1px' : 'none',
        })}
      >
        country pollution
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
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

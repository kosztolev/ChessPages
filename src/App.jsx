import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChessListPage } from './pages/ChessListPage.jsx';
import { ChessSinglePage } from './pages/ChessSinglePage.jsx';
import { ChessCreatePage } from './pages/ChessCreatePage.jsx';
import { ChessModPage } from './pages/ChessModPage.jsx';
import { ChessDeletePage } from '.pages/ChessDeletePage.jsx';
import './App.css';

export const App = () => {
  return (
    <>
    <nav className = "d-flex gap-4 p-3 fs-3">
      <NavLink to = "/" className = "nav-link">
        <i className='bi bi-house-door-fill me-2'></i>
        Sakkozók
      </NavLink>
      <NavLink to = "/new-chess" className = "nav-link">
        <i className='bi bi-info-circle-fill me-2'></i>
        Sakkozók
      </NavLink>
    </nav>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChessListPage />} />
        <Route path="/chess/:chessId" element={<ChessSinglePage />} />
        <Route path='/new-chess' element = {<ChessCreatePage/>}/>
        <Route path='/mod-chess/:chessId' element = {<ChessModPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
};

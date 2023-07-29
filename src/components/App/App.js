import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  const { pathname } = useLocation();
  const isLocationForHeaderFooter = ['/', '/movies', '/profile', '/saved-movies'].includes(pathname);
  return (
    <div className="page">
      {isLocationForHeaderFooter && <Header /> }
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notfound" element={<p>adsf</p>} />
        <Route path="/notfound" element={<p>adsf</p>} />
        <Route path="/notfound" element={<p>adsf</p>} />
      </Routes>
      {isLocationForHeaderFooter && <Footer /> }
    </div>
  );
}

export default App;

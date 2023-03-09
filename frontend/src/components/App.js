import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import STT from './STT';
import YTSubs from './YTsubs';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Nav />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stt" element={<STT />} />
            <Route path="/yt_subtitle" element={<YTSubs />} />
          </Routes>
        </main>
        <footer>
          <p>Copyright © Ji Yong Park 2023</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}


export default App;

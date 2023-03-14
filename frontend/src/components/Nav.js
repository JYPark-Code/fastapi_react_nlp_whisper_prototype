import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stt">STT_Audiofile</Link>
          </li>
          <li>
            <Link to="/mic2txt">STT_Microphone</Link>
          </li>
          <li>
            <Link to="/yt_subtitle">Youtube_Subtitle</Link>
          </li>
        </ul>
      </nav>
    );
  }

export default Nav;
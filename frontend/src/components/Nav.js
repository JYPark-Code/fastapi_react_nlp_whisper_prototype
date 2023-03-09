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
            <Link to="/stt">STT</Link>
          </li>
          <li>
            <Link to="/yt_subtitle">Youtube</Link>
          </li>
        </ul>
      </nav>
    );
  }

export default Nav;
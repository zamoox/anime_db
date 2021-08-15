import React from 'react';

import './header.css';

const Header = ({onServiceChanged}) => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#/">
          AnimeDB
        </a>
      </h3>
    </div>
  );
};

export default Header;
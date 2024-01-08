import React from 'react';
import '../header/header.css';
import { CommonText } from '../../enum/common';

const Header = ({ activeCallsCount }) => {
  return (
    <div className="header">
      <div className="header-content">
        <header >
          <h1><span className="count">({activeCallsCount})</span>{CommonText.AirCallText}</h1>
        </header>
      </div>
    </div>
  );
};

export default Header;

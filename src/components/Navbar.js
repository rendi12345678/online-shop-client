import React, {useRef, useState, useEffect} from 'react';
import Cart from "./Cart";
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
const navRef = useRef();
const [isChecked, setIsChecked] = useState(false);
const [display, setDisplay] = useState(false);

const navToggle = value => {
  const currentClassName = navRef.current.className;
  navRef.current.className = `${currentClassName} ${value}`;
}
  
const handleCheckboxChange = e => {
  setIsChecked(e.target.checked); 
  if(e.target.checked) return navToggle('slide');
  return navToggle('');
}

const handleLinkClick = () => {
  setIsChecked(false); 
  navToggle('');
}

const handleCartClick = () => {
  const displayToggle = !display; 
  setDisplay(displayToggle);
}

return (
  <>
<header id="navbar">
  <div className="nav-container">
  <h3>online<span>Shop</span></h3>
  <nav>
    <ul ref={navRef}>
      <li>
      <HashLink smooth to="/#hero-section" onClick={handleLinkClick}>Home</HashLink>
      </li>
      <li>
      <HashLink smooth to="/#about-section" onClick={handleLinkClick}>About</HashLink>
      </li>
      <li>
      <HashLink smooth to="/#project-section" onClick={handleLinkClick}>Products</HashLink>
      </li>
      <li>
      <HashLink onClick={handleCartClick}>Cart <span>{0}</span></HashLink>
      </li>
    </ul>
  </nav>
  <div className="menu-toggle">
      <input type="checkbox" 
             checked={isChecked}
             onChange={handleCheckboxChange}/>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <Cart display={display}/>
</header>
</>
);
}

export default Navbar;
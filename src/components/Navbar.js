import React, { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { HashLink } from "react-router-hash-link";

const Navbar = ({count, productItems}) => {
  const navRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [display, setDisplay] = useState(false);

  const navToggle = (value) => {
    navRef.current.className = value;
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) return navToggle("slide");
    return navToggle("");
  };

  const handleLinkClick = () => {
    setIsChecked(false);
    navToggle("");
  };

  const handleCartClick = () => {
    setDisplay(!display);
  };
  return (
    <>
      <header id="navbar">
        <div className="nav-container">
          <h3>
            Ilham<span>Store</span>
          </h3>
          <nav>
            <ul ref={navRef}>
              <li>
                <HashLink smooth to="/" onClick={handleLinkClick}>
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/" onClick={handleLinkClick}>
                  About
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#project-section"
                  onClick={handleLinkClick}
                >
                  Products
                </HashLink>
              </li>
            </ul>
          </nav>
          <button className="cart-icon" onClick={handleCartClick}>
            <span>{count}</span>
          </button>
          <div className="menu-toggle">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <Cart display={display} productItems={productItems}/>
    </>
  );
};

export default Navbar;

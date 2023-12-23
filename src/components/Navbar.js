import React, { useRef, useState } from "react";
import Cart from "./Cart";
import { HashLink } from "react-router-hash-link";

const Navbar = ({count, productItems, display, dispatch}) => {
  const navRef = useRef();
  const [isChecked, setIsChecked] = useState(false);

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
    dispatch({type: "set-display", payload: false});
  };

  const handleCartClick = () => {
    dispatch({type: "reset-user-detail", payload: {name: "", email: "", location: ""}})
    dispatch({type: "set-display", payload: !display});
  };
  return (
    <>
      <header id="navbar">
        <div className="nav-container">
          <h3>
            Al <span>Store</span>
          </h3>
          <nav>
            <ul ref={navRef}>
              <li>
                <HashLink smooth to="/#hero-section" onClick={handleLinkClick}>
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#about-us" onClick={handleLinkClick}>
                  About Us
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#our-products"
                  onClick={handleLinkClick}
                >
                  Our Books
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

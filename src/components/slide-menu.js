import * as React from "react";

import Menu from 'react-burger-menu/lib/menus/slide'
import styled from 'styled-components'
import { Link } from 'gatsby'
import {
  navLinks,
  navLinkItem,
  navLinkText,
} from "./layout.module.css";


const StyledBurgerMenu = styled.div`
/* Position and sizing of burger button */
.bm-burger-button {
  position: relative;
  width: 36px;
  height: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background:  rgba(255, 168, 0, 1);;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  background: #373a47;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
`

const SlideMenu = () => {

  return (
    <>
    <StyledBurgerMenu>
      <Menu right >
      <nav>
        <ul className={navLinks}>
        <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/how-it-works" className={navLinkText}>
              How it Works
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/categories" className={navLinkText}>
              Island Offers
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/clubs" className={navLinkText}>
              Island Clubs
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/join" className={navLinkText}>
              Join Us
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About Be Local
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/contact" className={navLinkText}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      </Menu>
      </StyledBurgerMenu>
    </>
  );
};

export default SlideMenu;

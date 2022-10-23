import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import FooterMember from "./footer-member";
import "@fontsource/poppins"; // Defaults to weight 400.
import "@fontsource/poppins/100.css"; // Defaults to weight 400.
import "@fontsource/poppins/200.css"; // Defaults to weight 400.
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
} from "./layout.module.css";

const Layout = ({ pageTitle, children }) => {
  return (
    <main className={container}>
      <Helmet>
        <meta name={`robots`} content={`noindex, nofollow`} />{" "}
      </Helmet>
      {/* <NavBar /> */}
      
      {/* <title>{pageTitle}</title>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/how-it-works" className={navLinkText}>
              How
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/categories" className={navLinkText}>
              Offers
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/clubs" className={navLinkText}>
              Clubs
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/join" className={navLinkText}>
              Join
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/contact" className={navLinkText}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className={heading}>{pageTitle}</h1> */}
      <div style={{paddingBottom: "52px"}}>{children}</div>
     <FooterMember />
    </main>
  );
};

export default Layout;

import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import HeaderHamburger from "../components/header-hamburger";
import Layout from "../components/layout";
import {
  hamburgerGridLayer,
  infoPageHeader,
  infoPageContent,
} from "../components/layout.module.css";

const AboutPage = () => {
  return (
    <Layout>
      <div style={{ display: "grid" }}>
        <StaticImage
          src="../images/beach-lookout.jpg"
          alt="Lookout on a beach"
          placeholder="dominantColor"
          transformOptions={{ cropFocus: "center" }}
          aspectRatio="1.5"
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={infoPageHeader}>
          <h1>ABOUT</h1>
        </div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>
      <div className={infoPageContent}>
        <h2>About Us</h2>
        <p>
          Be local Club started with a vision to offer the opportunity to
          experience the best of Ibiza at reduced prices. – To give access to
          deals that normally demands you have network in the different areas,
          and we wanted to created a solution that gave theses access regardless
          who you know.
          
          </p>
          <p>
          There are various types of benefits for members such as
          restaurants, bars, clubs, shops, wellness, rentals, hotels and
          activities and will enable you to explore the destination with
          discounts. Be Local Club will continuously make new attractive
          benefits for you.
        </p>

        <p>
          The Membership is cheap – by using the benefits the price for the
          members club can already be earned back in a few hours. Be local Club
          is also good guide for amazing places and get discount at new
          favourite places – every time.
        </p>
        <p>Welcome to Be Local Club</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </Layout>
  );
};

export default AboutPage;

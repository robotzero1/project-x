import * as React from "react";
import { Link, graphql } from "gatsby";
import { isIOS, isMobile } from "react-device-detect";
import { StaticImage } from "gatsby-plugin-image";
import HeaderHamburger from "../components/header-hamburger";
import Layout from "../components/layout";
import {
  hamburgerGridLayer,
  howP,
  howItWorksRetailerBox,
  howItWorksRetailerName,
  infoPageHeader,
  infoPageContent,
} from "../components/layout.module.css";

const openMap = (latitude, longitude) => {
  const mapUrl = "?q=" + latitude + "," + longitude;
  let mapUrlFullPath = "";
  // Check if a mobile device exists, or is web browser
  if (isMobile) {
    mapUrlFullPath = isIOS ? "maps://" + mapUrl : "geo:" + mapUrl;
  } else {
    mapUrlFullPath = "https://www.google.com/maps/dir//lat,long/@" + mapUrl;
  }
  window.open(mapUrlFullPath, "_system");
};

const IndexPage = ({ data }) => {
  //   console.log(data);
  const retailers = data.retailers;

  return (
    <Layout pageTitle="How it Works">
      <div style={{ display: "grid" }}>
        <StaticImage
          src="../images/ibiza-street.jpg"
          alt="Street in Ibiza"
          placeholder="dominantColor"
          transformOptions={{ cropFocus: "center" }}
          aspectRatio="1.5"
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={infoPageHeader}></div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>
      <div className={infoPageContent}>
        <h2>How it Works</h2>
        <p>
          You get access to attractive benefits – All you have to do is get your
          own personal Be Local Club membership.
        </p>
        <p>
          Your membership is valid through the calendar year and can be used as
          many times as you wish – even visit the same places several times.
        </p>
        <p>
          Be Local Club’s vision is to offer the opportunity to experience the
          best from Ibiza at local prices.
        </p>
        <ol>
          <li>
            Get your membership at one of listed sales venues or directly in our
            web shop
          </li>
          <li>Create your profile</li>
          <li>Start using your benefits</li>
          <li>Enjoy</li>
        </ol>

        <p>
          To get the benefits you must show your membership profile at the
          venues. In some cases you have to show your ID also.
        </p>
        <p>
          Be Local Club will continuously make attractive agreements with new
          deals for you.
        </p>
        <p>Get your membership here:</p>
        <h2>Retailers</h2>
        {retailers.edges.map(({ node }, index) => (
          <div key={index}>
            <div className={howItWorksRetailerBox}>
              <div className={howItWorksRetailerName}>
                {node.retailer_name} <span> - 123 Address St</span>
              </div>

              <div>
                {node.retailer_map && (
                  <div
                    title="Open on Map"
                    onClick={() =>
                      openMap(
                        node.retailer_map.split(", ")[0],
                        node.retailer_map.split(", ")[1]
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      width="25px"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 6.882l-7-3.5v13.236l7 3.5l6-3l7 3.5V7.382l-7-3.5l-6 3zM15 15l-6 3V9l6-3v9z"
                        fill="rgba(255, 168, 0, 1)"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <h2>Join Online</h2>
        <p>
          Join with your credit or debit card. Payments are handled by Stripe.
        </p>
        <Link to="/join-from-stripe">
          <button>JOIN ONLINE</button>
        </Link>
        <p>---</p>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    retailers: allMysqlRetailers(
      filter: { retailer_name: { ne: "Web" }, retailer_active: { eq: 1 } }
    ) {
      edges {
        node {
          retailer_name
          retailer_map
        }
      }
    }
  }
`;

export default IndexPage;

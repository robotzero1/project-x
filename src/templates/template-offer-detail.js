// Step 1: Import React. This lets you use JSX inside your .js file.
import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import HeaderHamburger from "../components/header-hamburger";
import LocationDetails from "../components/location-details";

import {
  hamburgerGridLayer,
  offerDetailHeader,
  offerCategoryName,
  offerCategoryHeaderDescription,
  offerDetailOffer,
  offerDetailTopRow,
  offerDetailCircle,
  offerDetailOfferTitle,
  offerDetailOfferDescription,
  offerDetailVenueBlock,
  offerDetailVenueName,
  offerDetailVenueDescription,
  offerDetailVenueAddress,
} from "../components/layout.module.css";

const Offer = ({ data }) => {
  console.log(data);
  const offer = data.offer;
  const venue = data.venue;
  const offerImageHeader = getImage(offer.header.mysqlImage);
  const offerImageCircle = getImage(offer.circle.mysqlImage);
  const venueImage = getImage(venue.mysqlImage);
  return (
    <Layout pageTitle="Offer Detail">
      <div style={{ display: "grid" }}>
        <GatsbyImage
          image={offer.header.childImageSharp.gatsbyImageData}
          alt={offer.offer_title}
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={offerDetailHeader}>
          <div className={offerDetailOffer}>
            <div className={offerDetailTopRow}>
              <div className={offerDetailCircle}>
                <GatsbyImage
                  image={offer.circle.childImageSharp.gatsbyImageData}
                  alt={offer.offer_title}
                />
              </div>
              <div className={offerDetailOfferTitle}>{offer.offer_title}</div>
            </div>

            <div className={offerDetailOfferDescription}>
              {offer.offer_desc_long}
            </div>
          </div>
        </div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger menuType="full" />
        </div>
      </div>

      <div className={offerDetailVenueBlock}>
        <div className={offerDetailVenueName}>{venue.venue_name}</div>
        <div className={offerDetailVenueDescription}>
          {venue.venue_description}
        </div>
        <GatsbyImage image={venueImage} alt={venue.venue_name} />
      </div>

      <LocationDetails venue={venue} />
    </Layout>
  );
};

export const query = graphql`
  query ($offerID: Int!, $venueID: Int!) {
    offer: mysqlOffers(offer_active: { eq: 1 }, id_offer: { eq: $offerID }) {
      offer_title
      offer_desc_long
      header: mysqlImage {
        childImageSharp {
          gatsbyImageData(
            aspectRatio: 2
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
            quality: 80
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      circle: mysqlImage {
        childImageSharp {
          gatsbyImageData(
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
            quality: 80
            width: 40
            height: 40
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
    }
    venue: mysqlVenues(venue_active: { eq: 1 }, id_venue: { eq: $venueID }) {
      venue_name
      venue_description
      venue_hours
      venue_address
      venue_website
      venue_telephone
      venue_email
      venue_map
      mysqlImage {
        childImageSharp {
          gatsbyImageData(
            aspectRatio: 2
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
            quality: 90
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
    }
  }
`;

/* Step 3: Export your component so it
can be used by other parts of your app. */
export default Offer;

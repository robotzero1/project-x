// Step 1: Import React. This lets you use JSX inside your .js file.
import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import HeaderHamburger from "../components/header-hamburger";
import {
  hamburgerGridLayer,
  offerCategoryHeader,
  offerCategoryName,
  offerCategoryHeaderDescription,
  offerListBoxes,
  offerListBox,
  offerListBoxTitle,
  offerListBoxDescription,
} from "../components/layout.module.css";

/* Step 2: Define your component/page. Note that your
component name should start with a capital letter. */
const Offers = ({ data }) => {
  const category = data.category;
  const offers = data.offers;
  const categoryImage = getImage(category.mysqlImage);

  return (
    <Layout>
          <div style={{ display: "grid"}}>
            <GatsbyImage
              image={categoryImage}
              alt={category.category_name}
              style={{
                gridArea: "1/1",
                filter: "brightness(70%)",
              }}
            />
            <div className={offerCategoryHeader}>
              <h1 className={offerCategoryName}>{category.category_name}</h1>
              <div className={offerCategoryHeaderDescription}>
                {category.category_desc}
              </div>
            </div>
            <div className={hamburgerGridLayer}>
              <HeaderHamburger menuType='full' />
            </div>
          </div>
  
        <div className={offerListBoxes}>
          {offers.edges.map(({ node }, index) => (
            <div key={index}>
              <Link to={"/" + node.fields.slug}>
                <div className={offerListBox}>
                  <div className={offerListBoxTitle}>
                    <span>{node.venue_name}</span> | {node.offer_title}
                  </div>
                  <div className={offerListBoxDescription}>
                    {node.offer_desc_short}
                  </div>
                  <GatsbyImage
                    image={node.mysqlImage.childImageSharp.gatsbyImageData}
                    alt={node.offer_title}
                  />
                  <svg
                    style={{ position: "absolute", right: 0, top: 8 }}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    width="40px"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.163 4.516c.418.408 4.502 4.695 4.502 4.695a1.095 1.095 0 0 1 0 1.576s-4.084 4.289-4.502 4.695c-.418.408-1.17.436-1.615 0c-.446-.434-.481-1.041 0-1.574L11.295 10L7.548 6.092c-.481-.533-.446-1.141 0-1.576c.445-.436 1.197-.409 1.615 0z"
                      fill="rgba(255, 168, 0, 1)"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>

    </Layout>
  );
};

export const query = graphql`
  query ($categoryID: Int!) {
    category: mysqlOfferCats(
      category_active: { eq: 1 }
      id_category: { eq: $categoryID }
    ) {
      category_name
      category_desc
      mysqlImage {
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
    }
    offers: allMysqlOffersCategoryVenue(
      filter: { offer_active: { eq: 1 }, category_id: { eq: $categoryID } }
    ) {
      edges {
        node {
          offer_title
          offer_desc_short
          venue_name
          mysqlImage {
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
          fields {
            slug
          }
        }
      }
    }
  }
`;

/* Step 3: Export your component so it
can be used by other parts of your app. */
export default Offers;

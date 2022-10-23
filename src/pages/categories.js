// Step 1: Import React. This lets you use JSX inside your .js file.
import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import HeaderHamburger from "../components/header-hamburger";
import Layout from "../components/layout";
import {
  offerCategoryBlock,
  offerCategoryName,
  offerCategoryDescription,
} from "../components/layout.module.css";

/* Step 2: Define your component/page. Note that your
component name should start with a capital letter. */
const Categories = ({ data }) => {
  /*   const photo = data.allMysqlOfferCats.edges[0].node.fields.photo  
  console.log('photo: ')  
  console.log(photo) 
  const image = getImage(data.allMysqlOfferCats.edges[0].node.fields.photo)
  console.log('image: ')  
  console.log(image) */
  let rowID = "0";
  return (
<Layout pageTitle="Offer Categories">
      <div style={{ background: "black"}}><HeaderHamburger /></div>
      <div style={{ background: "black" }}>
        {data.allMysqlOfferCats.edges.map(({ node }, index) => (
          <div key={index} className={offerCategoryBlock}>
            {console.log(index)}
            <Link to={"/" + node.fields.slug}>
              <div style={{ display: "grid" }}>
                <GatsbyImage
                  image={node.mysqlImage.childImageSharp.gatsbyImageData}
                  alt={node.category_name}
                  style={{
                    gridArea: ++rowID + "/1",
                    filter: "brightness(70%)",
                  }}
                />
                <div
                  style={{
                    // By using the same grid area for both, they are stacked on top of each other
                    gridArea: rowID + "/1",
                    position: "relative",
                    // This centers the other elements inside the hero component
                    placeItems: "center",
                    display: "grid",
                  }}
                >
                  {/* Any content here will be centered in the component */}
                  <h1 className={offerCategoryName}>{node.category_name}</h1>
                </div>
              </div>

              <div className={offerCategoryDescription}>
                {node.category_desc}

                <svg
                  style={{ position: "absolute", right: 0, bottom: 0 }}
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
  {
    allMysqlOfferCats(filter: { category_active: { eq: 1 } }) {
      edges {
        node {
          category_name
          category_desc

          mysqlImage {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 4.5
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
export default Categories;

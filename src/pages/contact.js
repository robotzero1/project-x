import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import HeaderHamburger from "../components/header-hamburger";
import Layout from "../components/layout";
import {
  hamburgerGridLayer,
  infoPageHeader,
  infoPageContent,
  formButton,
} from "../components/layout.module.css";

const ContactPage = () => {
  return (
    <Layout>
      <div style={{ display: "grid" }}>
        <StaticImage
          src="../images/telephones-on-a-wall.jpg"
          alt="Lookout on a beach"
          placeholder="dominantColor"
          transformOptions={{ cropFocus: "center" }}
          aspectRatio="1.5"
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={infoPageHeader}>
          <h1>CONTACT</h1>
        </div>
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>
      <div className={infoPageContent}>
        <h2>Contact Us</h2>
        <p>
          If you own a business on the island and would like to partner with us
          - partners@project-x.com
        </p>
        <p>For general membership enquiries, please complete the form below:</p>

        <form action="https://getform.io/f/628c7096-c5fe-4842-838b-f13bc6c4aa9e" method="POST">
          <label>
            Name
            <input type="text" name="name" id="name" required placeholder="Please enter your name"/>
          </label>
          <label>
            Email
            <input type="email" name="email" id="email" required placeholder="Please enter your email" />
          </label>
          <label>
            Message
            <textarea name="message" id="message" rows="5" required placeholder="Please enter your message" />
          </label>
          <button className={formButton} type="submit">Send</button>
        </form>
        <p>
          I think there should be a phone number for whatsapp enquiries. Maybe
          just only member viewable if a member has a problem with an offer you
          can investigate straight away before they start a complaint. Maybe
          even a Discord or some sort of ticket based support system
        </p>
      </div>
    </Layout>
  );
};

export default ContactPage;

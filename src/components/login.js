import React from "react"
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { handleLogin, isLoggedIn } from "../services/auth"
import HeaderHamburger from "../components/header-hamburger";
import {
  hamburgerGridLayer,
  infoPageHeader,
  loginPageContent,
} from "../components/layout.module.css";


class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile-status`)
    }

    return (
      <>

<div style={{ display: "grid" }}>
        <StaticImage
          src="../images/selfie.jpg"
          alt="Selfie of a young woman"
          placeholder="dominantColor"
          transformOptions={{ cropFocus: "center" }}
          aspectRatio="1.2"
          style={{
            gridArea: "1/1",
          }}
        />
        <div className={hamburgerGridLayer}>
          <HeaderHamburger />
        </div>
      </div>
 
      <div className={loginPageContent}>
        <h1>Log in</h1>
        <p>Be Local members please log in below with your email address and password</p>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/app/profile-status`)
          }}
        >
          <label>
            Email
            <input type="text" name="inputuser" autocomplete="username" placeholder="Enter your email address" onChange={this.handleUpdate} />
          </label>
          <label>
            Password
            <input
              name="inputpass" autocomplete="password" placeholder="Enter your password for Be Local"
              onChange={this.handleUpdate}
            />
          </label>
          <button type="submit">Log In</button>
          <div id="messagebox"></div>
        </form>
        <p>Find out more about our membership benefits</p>
        <Link to="/how-it-works"><button style={{width: "calc(100%)"}}>HOW IT WORKS</button></Link>
        </div>
      </>
    )
  }
}

export default Login
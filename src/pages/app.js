import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import ProfileStatus from "../components/profile-status"
import ProfileEdit from "../components/profile-edit"
import ProfilePass from "../components/profile-pass"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile-status" component={ProfileStatus} />
      <PrivateRoute path="/app/profile-edit" component={ProfileEdit} />
      <PrivateRoute path="/app/profile-pass" component={ProfilePass} />     
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../Services/AuthenticationService";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ManageRestaurant from "./ManageRestaurant";
class AdminHomePage extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg  bg-danger">
          <div className="container">
            <Link
              className="navbar-brand"
              to="/admin"
              style={{ color: "white" }}
            >
              <RestaurantIcon />
              Zonions
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    exact
                    to="/add"
                    style={{ color: "white" }}
                    activeClassName
                  >
                    Add Restaurant
                  </Link>
                </li>
              </ul>
            </div>
            
            <label style={{ color: "white" }}>
              {AuthenticationService.getCurrentAdmin().username}
            </label>
            &nbsp;
            <Link
              style={{ color: "white" }}
              onClick={() => {
                AuthenticationService.logout();
                this.props.history.push("/login");
              }}
            >
              Logout
            </Link>
          </div>
        </nav>
        {window.location.pathname == "/admin" ? <ManageRestaurant /> : ""}
      </div>
    );
  }
}

export default AdminHomePage;

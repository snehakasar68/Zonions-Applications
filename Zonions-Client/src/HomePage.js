import React, { Component } from "react";
import { Link} from "react-router-dom";
import AllRestaurant from "./AllRestaurant";
import RestaurantIcon from '@material-ui/icons/Restaurant';
class HomePage extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg  bg-danger">
          <div className="container">
            <Link className="navbar-brand" to="/" style={{ color: "white" }}>
             <RestaurantIcon/> Zonions
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    exact
                    to="/"
                    style={{ color: "white" }}
                    activeClassName
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
          </div>
        </nav>
        {window.location.pathname == "/" ? <AllRestaurant /> : ""}
      </div>
    );
  }
}

export default HomePage;

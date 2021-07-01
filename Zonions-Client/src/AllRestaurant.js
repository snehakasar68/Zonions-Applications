import React, { Component } from "react";
import RestaurantService from "./Services/RestaurantService";
import {Link} from 'react-router-dom'
import RestaurantDetailsCard from './RestaurantDetailsCard'
import {MDBRow} from 'mdb-react-ui-kit'
class AllRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
    };
    this.fetchAllRestaurant();
  }
  componentDidMount() {
    this.fetchAllRestaurant();
  }
  fetchAllRestaurant() {
    RestaurantService.getAllDetails()
      .then((data) => {
        console.log(data);
        this.setState({
          restaurants: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { restaurants } = this.state;
    return (
      <div className="bg">
      <div className="container">
        <br></br>
        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
          {restaurants &&
            restaurants.map((restaurant) => {
              if (restaurant.activeStatus == true) {
                return (
                  <RestaurantDetailsCard restaurant={restaurant}/>
                );
              }
            })}
            </MDBRow>
       
      </div>
      </div>
    );
  }
}

export default AllRestaurant;

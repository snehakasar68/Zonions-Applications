import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn,MDBCol } from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
class RestaurantDetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: this.props.restaurant,
    };
  }

  render() {
      const {restaurant}=this.state
    return (
      
      <MDBCol>
      <MDBCard>
        <MDBCardImage
          src={`${restaurant.menu}`}
          alt='Image Cannot display'
          position='top'
          height="220px"
         
        />
        <MDBCardBody>
          <MDBCardTitle>{restaurant.rname}</MDBCardTitle>
          <MDBCardText>
            {restaurant.address}
          </MDBCardText>
          <Link to={`/showDeatils/${restaurant._id}`}><MDBBtn className='mx-2' color='danger'>Show Details</MDBBtn></Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
      
    );
  }
}

export default RestaurantDetailsCard;

import React, { Component } from "react";
import RestaurantService from "./Services/RestaurantService";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import AuthenticationService from "./Services/AuthenticationService";

class ShowRestaurantDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rname: "",
      address: "",
      phone: "",
      opentime: "",
      closetime: "",
      menu: "",
      activeStatus:""
    };
  }
  componentDidMount() {
    this.fetchRestaurantRecord();
  }
  fetchRestaurantRecord() {
    const restaurantId = this.props.match.params.id;
    RestaurantService.getOneRestaurant(restaurantId).then((data) => {
      this.setState({
        rname: data.data.rname,
        address: data.data.address,
        phone: data.data.phone,
        opentime: data.data.opentime,
        closetime: data.data.closetime,
        menu: data.data.menu,
        activeStatus:data.data.activeStatus
      });
    });
  }
  render() {
    const { rname, address, phone, opentime, closetime, menu ,activeStatus} =
      this.state;
    return (
      <div className="bg">
      <div className="container">
        <br></br><br></br>
        <MDBCard style={{ maxWidth: "1040px" , maxHeight:"600px"}}>
          <MDBRow className="g-0" >
            <MDBCol md="6">
              <MDBCardImage src={menu} alt="..." height="550px" width="500px" />
            </MDBCol>
            <MDBCol md="5">
              <MDBCardBody><br></br>
                <MDBCardText>
                  <MDBCardTitle>Restaurant Name:</MDBCardTitle>
                  {rname}
                </MDBCardText>
                <MDBCardText>
                  <MDBCardTitle>Address:</MDBCardTitle>
                  {address}
                </MDBCardText>
                <MDBCardText>
                  <MDBCardTitle>Phone:</MDBCardTitle>
                  {phone}
                </MDBCardText>
                <MDBCardText>
                  <MDBCardTitle>Open Time:</MDBCardTitle>
                  {opentime}
                </MDBCardText>
                <MDBCardText>
                  <MDBCardTitle>Close Time:</MDBCardTitle>
                  {closetime}
                </MDBCardText>
                {
                  AuthenticationService.getCurrentAdmin()?(
                  <MDBCardText>
                  <MDBCardTitle>Status:</MDBCardTitle>
                  {activeStatus?"Activate":"Deactivate"}
                </MDBCardText>):""
                }
              </MDBCardBody><br></br>
              <Link to={AuthenticationService.getCurrentAdmin()?"/admin":"/"}>
                <MDBBtn  rounded className="mx-2" color='danger'>
                  Back To Home
                </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBCard><br></br>
      </div>
      </div>
    );
  }
}

export default ShowRestaurantDetails;

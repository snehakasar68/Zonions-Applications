import React, { Component } from "react";
import RestaurantService from "../Services/RestaurantService";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import AdminHomePage from "./AdminHomePage";
class EditRestaurantDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rname: "",
      address: "",
      phone: "",
      opentime: "",
      closetime: "",
      menu: "",
      activeStatus: "",
      errors: {},
    };
  }
  componentDidMount() {
    this.fetchRestaurantRecord();
  }

  //fetching the details of specific restaurant
  fetchRestaurantRecord() {
    const restaurantId = this.props.match.params.id;
    //request to api
    RestaurantService.getOneRestaurant(restaurantId).then((data) => {
      this.setState({
        rname: data.data.rname,
        address: data.data.address,
        phone: data.data.phone,
        opentime: data.data.opentime,
        closetime: data.data.closetime,
        menu: data.data.menu,
        activeStatus: data.data.activeStatus,
      });
    });
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //check updated details are valid or not
  checkDetailsValidOrNot() {
    const { rname, address, phone, opentime, closetime, errors } = this.state;
    let isValid = true;
    if (!rname) {
      isValid = false;
      errors["rname"] = "Please enter Name";
    }
    if (!rname.match("[A-z\sa-z0-9]+$")) {
      isValid = false;
      errors["rname"] = "Name Should contain numbers and aplhabets only.!";
    }
    if (!address) {
      isValid = false;
      errors["address"] = "Please enter address";
    }
    if (!phone) {
      isValid = false;
      errors["phone"] = "Please enter Phone";
    }
    if (!phone.match("[7-9]{1}[0-9]{9}")) {
      isValid = false;
      errors["phone"] = "Please enter valid phone no.";
    }
    if (!opentime) {
      isValid = false;
      errors["opentime"] = "Please select open time";
    }
    if (!closetime) {
      isValid = false;
      errors["closetime"] = "Please select close time";
    }

    this.setState({
      errors: errors,
    });
    console.log(errors);
    return isValid;
  }

  //update the details
  updateRestaurantDetails = (e) => {
    e.preventDefault();
    const restaurantId = this.props.match.params.id;
    const details = {
      rname: this.state.rname,
      address: this.state.address,
      phone: this.state.phone,
      opentime: this.state.opentime,
      closetime: this.state.closetime,
      menu: this.state.menu,
      activeStatus: this.state.activeStatus,
    };
    if (this.checkDetailsValidOrNot()) {
      //request to api to update a specific details
      RestaurantService.updateRestaurantDetails(restaurantId, details)
        .then((data) => {
          console.log(data);
          alert("Updated successfully");
          this.props.history.push("/admin");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    const { rname, address, phone, opentime, closetime, menu, errors } =
      this.state;
    return (
      <div>
      <AdminHomePage/>
      <div className="bg"><br></br><br></br>
        <div className="container">
          <form>
            <div className="form-group row">
              <label className="control-label col-5"></label>
              <label
                className="control-label col-4"
                style={{ fontSize: "25px" }}
              >
                <b>Restaurant Details</b>
              </label>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-3" style={{ color: "red" }}>
                <b>*All Fields are Mandatory.</b>
              </label>
            </div>
            <br></br>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Name:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Restaurant Name"
                  name="rname"
                  value={rname}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="col-2"></label>
              <div className="col-4">
                <label style={{ color: "red" }}>
                  <b>{errors.rname}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Address:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
              
                <textarea  className="form-control"
                  placeholder="Enter Restaurant Address"
                  name="address"
                  value={address}
                  onChange={this.changeHandler}>

                </textarea>
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="col-2"></label>
              <div className="col-2">
                <label style={{ color: "red" }}>
                  <b>{errors.address}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Phone:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone no"
                  name="phone"
                  value={phone}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="col-2"></label>
              <div className="col-3">
                <label style={{ color: "red" }}>
                  <b>{errors.phone}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Opening time:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-1">
                <TextField
                  type="time"
                  name="opentime"
                  value={opentime}
                  onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2"></label>
              <div className="col-3">
                <label style={{ color: "red" }}>
                  <b>{errors.opentime}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Closing time:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-1"><b>
                <TextField
                  type="time"
                  name="closetime"
                  value={closetime}
                  onChange={this.changeHandler}
                /></b>
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="col-2"></label>
              <div className="col-3">
                <label style={{ color: "red" }}>
                  <b>{errors.closetime}</b>
                </label>
              </div>
            </div>

            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Activation:</b>
              </label>
              <div className="col-1">
                <Switch
                  checked={this.state.activeStatus}
                  onChange={() => {
                    this.setState({ activeStatus: !this.state.activeStatus });
                  }}
                  color="primary"
                  name="activeStatus"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2"></label>
              <div className="col-1">
                <button
                  className="btn btn-danger"
                  onClick={this.updateRestaurantDetails}
                >
                  Update
                </button>
              </div>
              <div className="col-2">
                <Link to="/admin">
                  <button className="btn btn-danger">Cancel</button>
                </Link>
              </div>
            </div>
            <br></br>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default EditRestaurantDetails;

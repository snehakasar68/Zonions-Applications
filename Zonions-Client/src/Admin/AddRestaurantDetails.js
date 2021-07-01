import React, { Component } from "react";
import AdminHomePage from "./AdminHomePage";
import TextField from '@material-ui/core/TextField'
import RestaurantService from "../Services/RestaurantService";
import CheckIcon from '@material-ui/icons/Check';
import { MDBSpinner } from 'mdb-react-ui-kit';
class AddRestaurantDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rname: "",
      address: "",
      phone: "",
      opentime: "",
      closetime: "",
      menu: "",
      errors:{},
      loadingImg:false
    };
  }
  changeHandler=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })

  }
  //add restaurant details
  addRestaurantDetails=(e)=>{
    e.preventDefault();
    if(this.checkDetailsValidOrNot()){
       const {rname,address,phone,opentime,closetime,menu}=this.state
      const details={
        rname:rname,
        address:address,
        phone:phone,
        opentime:opentime,
        closetime:closetime,
        menu:menu
      }
      //request to api to add the details
      RestaurantService.addDetails(details).then(response=>{
        console.log(response);
        alert("Added successfully..!!")
        this.props.history.push("/admin")
      }).catch((error)=>{
          console.log(error);
      })
      
      this.setState({
        rname:"",
        address:"",
        phone:"",
        opentime:"",
        closetime:"",
        menu:"",
        errors:{}
    })

    }
    
  }
  //uploading image to cloudinary
  uploadMenuImage=(e)=>{
    this.setState({
      loadingImg:true
    })
        e.preventDefault()
        const {files}=document.querySelector('input[type="file"]')
        const formData=new FormData();
        formData.append('file',files[0])
        formData.append('upload_preset',"rpapxknl")
        const options={
            method:"POST",
            body:formData
        }
        return fetch('https://api.Cloudinary.com/v1_1/dnncq77ue/image/upload',options)
        .then(res=>res.json()).then(res=>{
            this.setState({
                menu:res.secure_url,
                loadingImg:false
            }) 
            alert("Image Uploaded..!!")        
        }).catch(err=>console.log(err))

  }
  
  //check entered details are valid or not
  checkDetailsValidOrNot(){
    const {rname,address,phone,opentime,closetime,menu,errors}=this.state
    let isValid=true
    if(!rname){
      isValid=false;
      errors["rname"]="Please enter Name"
    }

    if(!rname.match("[A-z\sa-z0-9]+$")){
      isValid=false;
      errors["rname"]="Name Should contain numbers and aplhabets only.!"
    }
    if(!address){
      isValid=false
      errors["address"]="Please enter address"
    }
    if(!phone){
      isValid=false
      errors["phone"]="Please enter Phone"
    }
    if(!phone.match("[7-9]{1}[0-9]{9}")){
      isValid=false
      errors["phone"]="Please enter valid phone no."
    }
    if(!opentime){
      isValid=false
      errors["opentime"]="Please select open time"
    }
    if(!closetime){
      isValid=false
      errors["closetime"]="Please select close time"
    }
    if(!menu){
      isValid=false
      errors["menu"]="Please upload Menu image"
    }
    this.setState({
      errors:errors
    })
    console.log(errors);
    return isValid
  }
  render() {
      const {rname,address,phone,opentime,closetime,menu,errors}=this.state
    return (
      <div >
        <AdminHomePage />
        <div className="bg"><br></br>
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
              <label className="col-2">
              </label>
              <div className="col-5">
                <label style={{color:"red"}}><b>{errors.rname}</b></label>
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
                <textarea
                className="form-control"
                  placeholder="Enter Restaurant Address"
                  name="address"
                  value={address}
                  onChange={this.changeHandler}>
                </textarea>
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="col-2">
              </label>
              <div className="col-3">
                <label style={{color:"red"}}><b>{errors.address}</b></label>
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
              <label className="col-2">
              </label>
              <div className="col-3">
                <label style={{color:"red"}}><b>{errors.phone}</b></label>
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
              className="form-control"
              type="time"
              name="opentime"
              value={opentime}
              onChange={this.changeHandler}
          />
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
              </label>
              <div className="col-3">
                <label style={{color:"red"}}><b>{errors.opentime}</b></label>
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
              <div className="col-1">
              
              <TextField 
              className="form-control"
              type="time"
              name="closetime"
              value={closetime}
              onChange={this.changeHandler}
          />
              </div>
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
              </label>
              <div className="col-3">
                <label style={{color:"red"}}><b>{errors.closetime}</b></label>
              </div>   
              </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Menu:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-3">
                <input
                  id="menuimg"
                  type="file"
                  className="form-control"
                  onChange={this.uploadMenuImage}
                />
              </div>
              {
              this.state.loadingImg?(<MDBSpinner color='primary'></MDBSpinner>):""
              }
              
            </div>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="col-2">
              </label>
              <div className="col-3">
                <label style={{color:"red"}}><b>{errors.menu}</b></label>
              </div>
              </div><br></br>
            <div className="form-group row">
            <label className="control-label col-1"></label>
              <label className="control-label col-2">
              </label>
              <div className="col-1">
                <button className="btn btn-danger" 
                onClick={this.addRestaurantDetails}
                disabled={menu.length<1}
                >Add</button>   
                                    
              </div>
              <div className="col-3">
                <button className="btn btn-danger"
                onClick={()=>{this.props.history.push("/admin")}}>Cancel</button>
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

export default AddRestaurantDetails;

import React, { Component } from 'react'
import AuthenticationService from '../Services/AuthenticationService'

class AddAdmin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             firstname:"",
             lastname:"",
             username:"",
             password:""
        }
    }
    createAdminHandler=()=>{
        const newAdminDetails={
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            username:this.state.username,
            password:this.state.password
        }
        
        AuthenticationService.adminRegister(newAdminDetails).then((res)=>{
            console.log(res);
            alert("Registration successfully..!!")
        }).catch(error=>{
            console.log(error);
        })
    }
    onchangeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    cancelHanler=()=>{
        this.props.history.push("/admin")
    }
    render() {
        const {firstname,lastname,username,password}=this.state
        return (
            <div>
                <lable>First Name:</lable>
                <input type="text" name="firstname" 
                onchange={this.onchangeHandler} value={firstname}/><br></br>
                <lable>Last Name:</lable>
                <input type="text" name="lastname"
                onchange={this.onchangeHandler} value={lastname}/><br></br>
                <lable>Username:</lable>
                <input type="text" name="username"
                onchange={this.onchangeHandler} value={username}/><br></br>
                <lable>Password:</lable>
                <input type="password" name="password" 
                onchange={this.onchangeHandler}value={password}/><br></br>
                <button onClick={this.createAdminHandler}>Create Admin</button>
                <button onClick={this.cancelHanler}>Cancel</button>
            </div>
        )
    }
}

export default AddAdmin

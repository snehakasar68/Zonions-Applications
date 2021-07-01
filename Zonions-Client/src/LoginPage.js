import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from './Services/AuthenticationService'
import HomePage from "./HomePage";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      msg:""
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  loginHandler = (e) => {
    e.preventDefault();
    const {username,password}=this.state
    AuthenticationService.adminLogin(username,password).then(response=>{
      this.props.history.push("/admin")
    }).catch(error=>{
      window.alert("Please enter valid credentials")
      console.log(error);
     
    })
    
  };
  render() {
    return (
      <div>
      <HomePage/>
        
        <div className="bg"><br></br><br></br><br></br>
        <div className="w-50 mx-auto p-5">
          <h2 className="text-center mb-4">Login</h2>
          <form>
            <div className="form-group">
              <TextField
                id="username"
                label="User Name"
                value={this.state.username}
                onChange={this.onChange}
                className="form-control form-control-lg"
                type="text"
              />
            </div>
            <br></br>
            <div className="form-group">
              <TextField
                id="password"
                label="Password"
                value={this.state.password}
                onChange={this.onChange}
                className="form-control form-control-lg"
                type={this.state.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          this.setState({
                            showPassword: !this.state.showPassword,
                          });
                        }}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <br></br><br></br>
            <div></div>
            <button
              className="btn btn-danger form-control form-control-lg"
              onClick={this.loginHandler}
            >
              Sign in
            </button>
            
          </form>
        </div><br></br><br></br><br></br>
        <br></br><br></br>
      </div>
      </div>
    );
  }
}

export default LoginPage;

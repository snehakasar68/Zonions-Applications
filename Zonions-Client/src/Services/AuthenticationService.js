import axios from 'axios'
import API from './htt-common'

class AuthenticationService {

    //request for authenticate the user details  
    adminLogin(username,password){
        return axios.post(`${API}/login`,{username,password})
        .then(response => {
            if (response.data.token) {
              localStorage.setItem("admin", JSON.stringify(response.data));
            }
    
            return response.data;
          });
    }
    adminRegister(newAdminDetails){
        return axios.post(`${API}/register`,newAdminDetails)
    }
    //get login admin
    getCurrentAdmin() {
        return JSON.parse(localStorage.getItem('admin'));;
      }
      //removing generated token 
    logout(){
      localStorage.removeItem("admin")
    }
}
export default new AuthenticationService()
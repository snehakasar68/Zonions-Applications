import axios from 'axios'
import API from './htt-common'

class RestaurantService {

    //request for all restaurant detials
    getAllDetails(){
        return axios.get(`${API}`)
    }
    //request for adding restaurant details
    addDetails(newRestaurant){
        return axios.post(`${API}`,newRestaurant)
    }
    //request for delete restaurant details
    deleteRestaurant(id){
        return axios.delete(`${API}/${id}`)
    }
    //request for specific restaurant details
    getOneRestaurant(id){
        return axios.get(`${API}/${id}`)
    }
    //request for updating restaurant details
    updateRestaurantDetails(id,details){
        return axios.put(`${API}/${id}`,details)
    }
}
export default new RestaurantService()
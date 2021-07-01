import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AdminHomePage from './Admin/AdminHomePage';
import AddRestaurantDetails from './Admin/AddRestaurantDetails';
import EditRestaurantDetails from './Admin/EditRestaurantDetails';
import ShowRestaurantDetails from './ShowRestaurantDetails';
import AuthenticationService from './Services/AuthenticationService';

function App() {
  return (
    <div className="App">
    
        <Router>    
            <Switch>
              <Route exact path="/" component={HomePage}></Route>    
              <Route exact path="/login" component={LoginPage}></Route>
              <Route exact path="/showDeatils/:id" component={ShowRestaurantDetails}></Route>            
              <Route exact path="/admin" component={AdminHomePage}></Route>
              <Route exact path="/add" component={AddRestaurantDetails}></Route>
              <Route exact path="/editdetails/:id" component={EditRestaurantDetails}></Route>
              
            </Switch>
        </Router>
    </div>
  );
}

export default App;

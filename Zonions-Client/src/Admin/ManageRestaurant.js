import React, { PureComponent } from "react";
import RestaurantService from "../Services/RestaurantService";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchBar from "material-ui-search-bar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import VisibilityIcon from '@material-ui/icons/Visibility';
class ManageRestaurant extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      displayRestaurants: [],
      orgRestaurantData: [],
      perPage: 5,
      currentPage: 0,
      searchName: "",
      aescDescFlag: true,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.fetchAllRestaurant();
  }
  //fetch all restaurant details
  fetchAllRestaurant = () => {
    RestaurantService.getAllDetails().then((res) => {
      this.setState({
        orgRestaurantData:res.data
      })
      this.ascendingHandler("rname")
    });
    
  };
  //searching a restaurant with name
  searchWithName = (searchText) => {
    let serachResult = this.state.orgRestaurantData.filter((restaurant) => {
      return restaurant.rname.toLowerCase().includes(searchText);
    });

    var slice = serachResult.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(serachResult.length / this.state.perPage),
      orgRestaurantData: serachResult,
      displayRestaurants: slice,
    });
    
  };

  //delete a requesting restaurant details
  deleteRestaurant = (id) => {
    const confirmOrNot = window.confirm("Are you sure to delete this record?");
    if (confirmOrNot) {
      RestaurantService.deleteRestaurant(id)
        .then((res) => {
          console.log(res);
          this.fetchAllRestaurant();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //pagination 
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgRestaurantData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      displayRestaurants: slice,
    });
  }
  
 //updating activation status
  changeActiveStatus = (id, details) => {
    details.activeStatus
      ? (details.activeStatus = false)
      : (details.activeStatus = true);
    RestaurantService.updateRestaurantDetails(id, details)
      .then((res) => {
        console.log(res);
        this.fetchAllRestaurant();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // data sort in descending order
  descendingHandler = (field) => {
    let sortedDescendingData = this.state.orgRestaurantData.sort(
      (restaurant1, restaurant2) => {
        if (restaurant1[field] < restaurant2[field]) return 1
        else if (restaurant1[field] > restaurant2[field]) return -1
        else return 0
      }
    );
    var slice = sortedDescendingData.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    
    this.setState({
      pageCount: Math.ceil(sortedDescendingData.length / this.state.perPage),
      orgRestaurantData: sortedDescendingData,
      displayRestaurants: slice,
      aescDescFlag:!this.state.aescDescFlag,
    });
    
  };

  //data sort in ascending order
  ascendingHandler = (field) => {    
    let sortedAscendingData = this.state.orgRestaurantData.sort(
      (restaurant1, restaurant2) => {
        if (restaurant1[field] < restaurant2[field]) return -1
        else if (restaurant1[field] > restaurant2[field]) return 1
        else return 0
      }
    );
    var slice = sortedAscendingData.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    
    this.setState({
      pageCount: Math.ceil(sortedAscendingData.length / this.state.perPage),
      orgRestaurantData: sortedAscendingData,
      displayRestaurants: slice,
      aescDescFlag:!this.state.aescDescFlag,
    });
  };
  render() {
    const { displayRestaurants } = this.state;
    return (
      <div className="bg">
        <br></br>
        <br></br>
        
        <div className="container">
          <div className="form-group row">
            <label className="col-7"></label>
            <div className="col-5">
              <SearchBar
                value={this.state.searchName}
                placeholder="Search Restaurant"
                onChange={(searchValue) =>
                  this.setState({ searchName: searchValue })
                }
                onRequestSearch={() =>
                  this.searchWithName(this.state.searchName)
                }
                onCancelSearch={this.fetchAllRestaurant}
              />
              <br></br>
            </div>
          </div>
         
          <table className="table table-bordered" style={{borderColor:"black"}}>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  Name
                  {this.state.aescDescFlag ? (
                    <ArrowDropDownIcon
                      onClick={() => this.ascendingHandler("rname")}
                    />
                  ) : (
                    <ArrowDropUpIcon
                      onClick={() => this.descendingHandler("rname")}
                    />
                  )}
                </th>
                <th>
                  Open Time
                  {this.state.aescDescFlag ? (
                    <ArrowDropDownIcon
                      onClick={() => this.ascendingHandler("opentime")}
                    />
                  ) : (
                    <ArrowDropUpIcon
                      onClick={() => this.descendingHandler("opentime")}
                    />
                  )}
                </th>
                <th>
                  Close Time
                  {this.state.aescDescFlag ? (
                    <ArrowDropDownIcon
                      onClick={() => this.ascendingHandler("closetime")}
                    />
                  ) : (
                    <ArrowDropUpIcon
                      onClick={() => this.descendingHandler("closetime")}
                    />
                  )}
                </th>
                <th>Last Updated Time</th>
                <th>Active On/Off</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayRestaurants ?
                (displayRestaurants.map((restaurant, index) => {
                  return (
                    <tr key={restaurant._id}>
                      <td>
                        <b>{++index}</b>
                      </td>
                      <td>
                        <b>{restaurant.rname}</b>
                      </td>
                      <td>
                        <b>{restaurant.opentime}</b>
                      </td>
                      <td>
                        <b>{restaurant.closetime}</b>
                      </td>
                      <td>
                        <b>{new Date(restaurant.updatedAt).toLocaleString()}</b>
                      </td>
                      <td>
                        <Switch
                          checked={restaurant.activeStatus}
                          onChange={() => {
                            this.changeActiveStatus(restaurant._id, restaurant);
                          }}
                          color="primary"
                          name="activeStatus"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </td>

                      <td >
                        <Link style={{color:"black"}} to={`/editdetails/${restaurant._id}`} title="Edit">
                          <EditIcon />
                        </Link>
                        &nbsp;
                        <Link title="Delete" style={{color:"black"}}>
                        <DeleteIcon 
                          onClick={() => this.deleteRestaurant(restaurant._id)}
                        /></Link>
                        &nbsp;
                        <Link title="View" to={`/showDeatils/${restaurant._id}`}
                        style={{color:"black"}}>
                          <VisibilityIcon/>
                        </Link>
                      </td>
                    </tr>
                  );
                })):(<tr><td colSpan="6">Record</td></tr>) }
              <tr>
                <td colSpan="6"></td>
                <td>
                  <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </td>
              </tr>
            </tbody><br></br><br></br><br></br><br></br>
          </table>
        </div>
      </div>
    );
  }
}

export default ManageRestaurant;

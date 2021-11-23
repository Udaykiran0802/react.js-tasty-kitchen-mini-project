import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterRight} from 'react-icons/bs'
import RestaurantsList from '../RestaurantsList'

import './index.css'

const sortByOptions = [
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Restaurants extends Component {
  state = {
    restaurantsList: [],
    activeSortByValue: sortByOptions[1].value,
    isLoading: true,
    noOfPages: 0,
    activePage: 1,
    limit: 9,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({isLoading: true})
    const {activeSortByValue, activePage, limit} = this.state
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.restaurants.map(restaurant => ({
        costForTwo: restaurant.cost_for_two,
        cuisine: restaurant.cuisine,
        groupByTime: restaurant.group_by_time,
        hasOnlineDelivery: restaurant.has_online_delivery,
        hasTableBooking: restaurant.has_table_booking,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        isDeliveringNow: restaurant.is_delivering_now,
        location: restaurant.location,
        menuType: restaurant.menu_type,
        name: restaurant.name,
        opensAt: restaurant.opens_at,
        rating: restaurant.user_rating.rating,
        ratingColor: restaurant.user_rating.rating_color,
        ratingText: restaurant.user_rating.rating_text,
        totalReviews: restaurant.user_rating.total_reviews,
      }))
      console.log(updatedData)
      const pages = Math.ceil(data.total / 9)
      // console.log(pages)
      this.setState({
        restaurantsList: updatedData,
        isLoading: false,
        noOfPages: pages,
      })
    }
  }

  onChangeSortBy = event => {
    this.setState(
      {
        activeSortByValue: event.target.value,
        activePage: 1,
      },
      this.getRestaurantsList,
    )
  }

  onClickPaginationLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onClickPaginationRightArrow = () => {
    const {activePage, noOfPages} = this.state
    if (activePage < noOfPages) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  renderLoader = () => (
    <div data-testid="restaurants-list-loader" className="home-carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={30} width={30} />
    </div>
  )

  renderRestaurants = () => {
    const {restaurantsList, noOfPages, activePage} = this.state
    return (
      <RestaurantsList
        restaurantsList={restaurantsList}
        noOfPages={noOfPages}
        activePage={activePage}
        onClickPaginationLeftArrow={this.onClickPaginationLeftArrow}
        onClickPaginationRightArrow={this.onClickPaginationRightArrow}
      />
    )
  }

  render() {
    const {activeSortByValue, isLoading} = this.state
    return (
      <div className="restaurants-container">
        <div className="restaurants-content">
          <h1 className="restaurants-heading">Popular Restaurants</h1>
          <div className="restaurants-description-sort-by-options">
            <p className="restaurant-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-by-container">
              <BsFilterRight className="sort-by-icon" />
              <p className="sort-by">Sort by</p>
              <select
                className="sort-by-select"
                value={activeSortByValue}
                onChange={this.onChangeSortBy}
              >
                {sortByOptions.map(eachOption => (
                  <option
                    key={eachOption.id}
                    value={eachOption.value}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="hr-line" />
          {isLoading ? this.renderLoader() : this.renderRestaurants()}
        </div>
      </div>
    )
  }
}
export default Restaurants

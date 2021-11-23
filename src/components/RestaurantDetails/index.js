import {Component} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const getCartListFromLocalStorage = () => {
  const stringCartList = localStorage.getItem(`cartData`)
  const parsedCartList = JSON.parse(stringCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItemList: [],
    cartList: getCartListFromLocalStorage(),
    isLoading: true,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedRestaurantData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      console.log(updatedRestaurantData)
      const updatedFoodItem = data.food_items.map(eachItem => ({
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
      }))
      console.log(updatedFoodItem)
      this.setState({
        restaurantData: updatedRestaurantData,
        foodItemList: updatedFoodItem,
        isLoading: false,
      })
    }
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    const foodObject = cartList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )
    if (foodObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            const updatedQuantity = foodItem.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodItem]
      this.setState({cartList: updatedCartList})
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  renderLoading = () => (
    <div
      className="restaurants-details-loader"
      data-testid="restaurant-details-loader"
    >
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantData, foodItemList, cartList} = this.state

    localStorage.setItem('cartData', JSON.stringify(cartList))
    const {
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = restaurantData
    return (
      <>
        <div className="restaurant-details-container">
          <div className="restaurant-details-view">
            <img
              src={imageUrl}
              alt="website logo"
              className="restaurant-detail-image"
            />
            <div>
              <h1 className="restaurant-details-heading">{name}</h1>
              <p className="restaurant-details-cuisine">{cuisine}</p>
              <p className="restaurant-details-location">{location}</p>
              <div className="restaurant-details-rating-price-container">
                <div>
                  <p className="restaurant-details-ratings">
                    <FaStar className="restaurant-details-rating-star" />
                    {rating}
                  </p>
                  <p className="restaurant-details-rating-count">
                    {reviewsCount}+Ratings
                  </p>
                </div>
                <hr className="restaurant-details-vertical-line" />
                <div>
                  <p className="restaurant-details-cost">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="restaurant-details-cost-for-two">
                    Cost for two
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-food-items-container">
          <ul className="food-item-list">
            {foodItemList.map(eachFood => (
              <FoodItem
                key={eachFood.id}
                foodItemDetails={eachFood}
                addCartItem={this.addCartItem}
                deleteCartItem={this.deleteCartItem}
                cartList={cartList}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header isHomeActive="true" isCartActive="false" />
        {isLoading ? this.renderLoading() : this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}
export default RestaurantDetails

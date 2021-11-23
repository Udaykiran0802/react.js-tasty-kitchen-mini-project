import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {ImStarFull} from 'react-icons/im'
import {FaRupeeSign} from 'react-icons/fa'

import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  componentDidMount() {
    const {foodItemDetails, cartList} = this.props
    cartList.map(eachCartItem => {
      if (foodItemDetails.id === eachCartItem.id) {
        return this.setState({quantity: eachCartItem.quantity})
      }
      return 0
    })
  }

  onClickAddToCart = () => {
    const {addCartItem, foodItemDetails} = this.props
    const {quantity} = this.state
    if (quantity === 0) {
      this.setState(prevState => ({quantity: prevState.quantity + 1}))
    }
    addCartItem({...foodItemDetails, quantity: quantity + 1})
  }

  onDecreaseQuantity = () => {
    const {addCartItem, foodItemDetails, deleteCartItem} = this.props
    const {id} = foodItemDetails
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
      addCartItem({...foodItemDetails, quantity: quantity - 1})
    } else {
      this.setState({quantity: 0}, deleteCartItem(id))
    }
  }

  onIncreaseQuantity = () => {
    const {addCartItem, foodItemDetails} = this.props
    const {quantity} = this.state
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      addCartItem({...foodItemDetails, quantity: quantity + 1}),
    )
  }

  render() {
    const {quantity} = this.state
    const {foodItemDetails} = this.props
    const {imageUrl, name, cost, rating} = foodItemDetails

    return (
      <li className="food-item-container" data-testid="foodItem">
        <img src={imageUrl} alt="food-item" className="food-item-image" />
        <div className="food-item-content">
          <h1 className="food-name">{name}</h1>
          <div className="cost-container">
            <FaRupeeSign />
            <p className="food-cost">{cost}</p>
          </div>
          <div className="rating-container">
            <ImStarFull className="star" />
            <p className="rating">{rating}</p>
          </div>
          {quantity === 0 ? (
            <button
              type="button"
              className="add-button"
              onClick={this.onClickAddToCart}
            >
              Add
            </button>
          ) : (
            <ul className="cart-quantity-container">
              <button
                type="button"
                data-testid="decrement-count"
                onClick={this.onDecreaseQuantity}
                className="quantity-controller-button"
              >
                <BsDashSquare
                  className="quantity-controller-icon"
                  color="#52606D"
                  size={12}
                />
              </button>
              <p data-testid="active-count" className="cart-quantity">
                {quantity}
              </p>
              <button
                data-testid="increment-count"
                type="button"
                className="quantity-controller-button"
                onClick={this.onIncreaseQuantity}
              >
                <BsPlusSquare
                  className="quantity-controller-icon"
                  color="#52606D"
                  size={12}
                />
              </button>
            </ul>
          )}
        </div>
      </li>
    )
  }
}
export default FoodItem

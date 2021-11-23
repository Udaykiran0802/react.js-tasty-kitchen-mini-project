import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartTotal = props => {
  const {cartList} = props
  let totalOrderCost = 0
  cartList.forEach(eachCartItem => {
    totalOrderCost += eachCartItem.cost * eachCartItem.quantity
  })
  return (
    <>
      <div className="cart-summary-container">
        <div className="cart-summary-content">
          <h1 className="order-total-heading">Order Total:</h1>
          <div className="total-container">
            <p className="total" data-testid="total-price">
              <BiRupee />
              {totalOrderCost}
            </p>
          </div>
        </div>
      </div>
      <Link to="/payment" className="place-order-link">
        <div className="place-order-container">
          <button type="button" className="order-button">
            Place Order
          </button>
        </div>
      </Link>
    </>
  )
}
export default CartTotal

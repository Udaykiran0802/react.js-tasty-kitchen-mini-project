import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-view-content">
    <img
      src="https://res.cloudinary.com/tastykitchen/image/upload/v1635268233/cooking_1no_order_fsgn6b.png"
      alt="empty cart"
      className="cart-empty-image"
    />
    <h1 className="cart-empty-content-heading">No Order Yet!</h1>
    <p className="cart-empty-content-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="cart-empty-content-link">
      <button type="button" className="cart-empty-content-button">
        Order Now
      </button>
    </Link>
  </div>
)
export default EmptyCartView

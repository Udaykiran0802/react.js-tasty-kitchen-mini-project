import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    const {onDecrement, onIncrement, quantity} = this.props
    return (
      <div className="counter-container">
        <button
          type="button"
          onClick={onDecrement}
          data-testid="decrement-quantity"
          className="quantity-controller-button"
        >
          -
        </button>
        <div>
          <p className="cart-quantity" data-testid="item-quantity">
            {quantity}
          </p>
        </div>
        <button
          type="button"
          onClick={onIncrement}
          data-testid="increment-quantity"
          className="quantity-controller-button"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter

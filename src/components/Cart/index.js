import {Component} from 'react'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'
import CartTotal from '../CartTotal'
import Footer from '../Footer'

import './index.css'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class Cart extends Component {
  state = {cartList: getCartListFromLocalStorage()}

  renderCartViewEmpty = () => (
    <div className="empty-cart-view-container">
      <EmptyCartView />
    </div>
  )

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  addQuantity = id => {
    this.setState(prevSate => ({
      cartList: prevSate.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevSate => ({
        cartList: prevSate.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    // console.log(cartList)
    localStorage.setItem('cartData', JSON.stringify(cartList))
    const isCartListEmpty = cartList.length === 0
    // console.log(isCartListEmpty)

    return (
      <>
        <Header isCartActive="true" isHomeActive="false" />
        {isCartListEmpty ? (
          this.renderCartViewEmpty()
        ) : (
          <>
            <div className="cart-container" data-testid="cartItem">
              <div className="cart-container-content">
                <div className="cart-content-container">
                  <div className="heading-container">
                    <h1 className="cart-heading item">Item</h1>
                    <h1 className="cart-heading quantity">Quantity</h1>
                    <h1 className="cart-heading price">Price</h1>
                    <h1 className="cart-heading">Remove</h1>
                  </div>
                </div>
                <ul className="cart-list-container" data-testid="cartItem">
                  {cartList.map(eachCartItem => (
                    <CartItem
                      key={eachCartItem.id}
                      cartItemDetails={eachCartItem}
                      addQuantity={this.addQuantity}
                      decreaseQuantity={this.decreaseQuantity}
                      deleteCartItem={this.deleteCartItem}
                    />
                  ))}
                </ul>
                <hr className="cart-horizontal-line" />
                <CartTotal cartList={cartList} />
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    )
  }
}
export default Cart

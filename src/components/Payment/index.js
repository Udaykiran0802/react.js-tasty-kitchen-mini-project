import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Payment = () => (
  <>
    <Header isHomeActive="false" isCartActive="true" />
    <div className="payment-container">
      <img
        src="https://res.cloudinary.com/tastykitchen/image/upload/v1635267607/Vectorpayment_nwd9el.png"
        alt="success"
        className="payment-success-image"
      />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="payment-description">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>

      <Link to="/">
        <button className="payment-go-to-home-button" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </>
)
export default Payment

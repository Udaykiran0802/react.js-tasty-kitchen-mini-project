import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/tastykitchen/image/upload/v1633343726/erroring_1notfound_xoubue.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-paragraph">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/" className="not-found-link">
        <button type="button" className="not-found-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)
export default NotFound

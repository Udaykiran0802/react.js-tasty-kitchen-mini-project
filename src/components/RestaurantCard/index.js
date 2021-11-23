import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'
import './index.css'

const RestaurantCard = props => {
  const {restaurantCard} = props
  const {cuisine, id, imageUrl, name, rating, totalReviews} = restaurantCard

  return (
    <Link
      to={`/restaurant/${id}`}
      className="restaurant-link-item"
      data-testid="restaurant-item"
    >
      <li className="restaurant-card-item">
        <img
          src={imageUrl}
          alt="restaurant-item"
          className="restaurant-card-image"
        />
        <div className="restaurant-card-description-container">
          <h1 className="restaurant-card-name">{name}</h1>
          <p className="restaurant-card-cuisine">{cuisine}</p>
          <div className="restaurant-card-rating-container">
            <ImStarFull className="restaurant-card-star" />
            <p className="restaurant-card-rating">{rating}</p>
            <p className="restaurant-card-total-reviews">
              ({totalReviews} rating)
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantCard

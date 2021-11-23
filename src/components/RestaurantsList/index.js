import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const RestaurantsList = props => {
  const {
    restaurantsList,
    noOfPages,
    activePage,
    onClickPaginationLeftArrow,
    onClickPaginationRightArrow,
  } = props
  return (
    <div className="restaurants-list-container">
      <ul className="restaurants-list">
        {restaurantsList.map(eachHotel => (
          <RestaurantCard restaurantCard={eachHotel} key={eachHotel.id} />
        ))}
      </ul>
      <div className="pagination">
        <button
          type="button"
          className="pagination-button"
          data-testid="pagination-left-button"
          onClick={onClickPaginationLeftArrow}
        >
          <RiArrowDropLeftLine className="pagination-arrow-icon" />
        </button>
        <div className="active-pagination-container">
          <h1
            data-testid="active-page-number"
            className="pagination-active-page-number"
          >
            {activePage}
          </h1>
          <span className="pagination-active-page-number"> of {noOfPages}</span>
        </div>

        <button
          data-testid="pagination-right-button"
          className="pagination-button"
          type="button"
          onClick={onClickPaginationRightArrow}
        >
          <RiArrowDropRightLine className="pagination-arrow-icon" />
        </button>
      </div>
    </div>
  )
}
export default RestaurantsList

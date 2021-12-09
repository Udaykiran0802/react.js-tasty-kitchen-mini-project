import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

import './index.css'

class Carousel extends Component {
  state = {carouselList: [], isLoading: true}

  componentDidMount() {
    this.getCarousel()
  }

  getCarousel = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    const updatedData = data.offers.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
    }))
    console.log(updatedData)
    this.setState({carouselList: updatedData, isLoading: false})
  }

  renderCarouselList = () => {
    const settings = {
      dots: true,
      infinite: true,
      arrows: false,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 7000,
      pauseOnHover: true,
      focusOnSelect: true,
      appendDots: dots => (
        <div className="slick-dots">
          <ul>{dots}</ul>
        </div>
    ),
    }
    const {carouselList} = this.state
    return (
      <Slider {...settings}>
        {carouselList.map(eachImage => (
          <div className="home-carousel-item" key={eachImage.id}>
            <img
              src={eachImage.imageUrl}
              alt="restaurants-offers-loader"
              className="home-carousel-image"
            />
          </div>
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="home-carousel-loader"
    >
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderCarouselList()
  }
}
export default Carousel

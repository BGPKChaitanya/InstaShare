import {Component} from 'react'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'
import Header from '../Header'
import SliderItem from '../SliderItem'
import './index.css'

const settings = {
  infinite: false,
  dots: false,
  slidesToShow: 6,
  slidesToScroll: 1,
}

class Home extends Component {
  state = {StoriesList: []}

  componentDidMount() {
    this.getStoriesList()
  }

  renderSlider = () => {
    const {StoriesList} = this.state

    return (
      <>
        <Slider {...settings}>
          {StoriesList.map(eachLogo => (
            <SliderItem key={eachLogo.userId} eachLogo={eachLogo} />
          ))}
        </Slider>
      </>
    )
  }

  getStoriesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const dataDB = await response.json()
    const dataDbResponse = dataDB.users_stories
    const updatedDataStories = dataDbResponse.map(eachStory => ({
      storyUrl: eachStory.story_url,
      userId: eachStory.user_id,
      userName: eachStory.user_name,
    }))
    if (response.ok === true) {
      this.setState({StoriesList: updatedDataStories})
    }
  }

  render() {
    return (
      <div className="homeMegaContainer">
        <Header />
        <div style={{width: '80%'}} className="home-container">
          {this.renderSlider()}
        </div>
      </div>
    )
  }
}

export default Home

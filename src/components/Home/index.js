import {Component} from 'react'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'
import CreatePost from '../CreatePost'
import Header from '../Header'
import SliderItem from '../SliderItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  infinite: false,
  dots: false,
  slidesToShow: 6,
  slidesToScroll: 1,
}

class Home extends Component {
  state = {
    StoriesList: [],
    PostList: [],
    apiPostStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStoriesList()
    this.getPostList()
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

  getPostList = async () => {
    this.setState({apiPostStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const PostResponse = await fetch(apiUrl, options)
    const dataDB = await PostResponse.json()
    const dataDBPosts = dataDB.posts
    const updatedDataPosts = dataDBPosts.map(eachPost => ({
      comments: eachPost.comments,
      createdAt: eachPost.created_at,
      likesCount: eachPost.likes_count,
      postDetails: eachPost.post_details,
      postId: eachPost.post_id,
      profilePic: eachPost.profile_pic,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
    }))
    console.log(updatedDataPosts)
    if (PostResponse.ok === true) {
      this.setState({
        PostList: updatedDataPosts,
        apiPostStatus: apiStatusConstants.success,
      })
    }
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

  getPostData = () => {
    const {PostList} = this.state

    return (
      <div>
        {PostList.map(eachPost => (
          <CreatePost post={eachPost} key={eachPost.postId} />
        ))}
      </div>
    )
  }

  getLoaderView = () => (
    <div className="loader-container" testId="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHomePost = () => {
    const {apiPostStatus} = this.state

    switch (apiPostStatus) {
      case apiStatusConstants.success:
        return this.getPostData()
      case apiStatusConstants.failure:
        return this.getFailureView()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="homeMegaContainer">
        <Header />
        <div style={{width: '80%'}} className="home-container">
          {this.renderSlider()}
        </div>
        <div className="postContainer">{this.renderHomePost()}</div>
      </div>
    )
  }
}

export default Home

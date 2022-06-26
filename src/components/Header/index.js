import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navBarContainer">
        <div className="navBarMiniContainer">
          <img
            src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656150123/Group_7807_cbe6q5.png"
            alt="loginLogo"
            className="website-logo"
          />
          <div className="navBarMiniContents">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search Caption"
                className="searchInput"
              />
              <button type="button" className="buttonSearch">
                <img
                  src="https://res.cloudinary.com/dwp6uyiir/image/upload/v1656151306/search_zjqfau.png"
                  alt="searchButton"
                  className="searchButton"
                />
              </button>
            </div>
            <ul className="navBarListContents">
              <li className="listItem">
                <Link to="/" className="listItemStyle">
                  Home
                </Link>
              </li>
              <li className="listItem">
                <Link to="/profile" className="listItemStyle">
                  Profile
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="LogOutButton"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)

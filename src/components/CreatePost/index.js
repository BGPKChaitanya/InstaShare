import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

const CreatePost = props => {
  const {post} = props
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    postId,
    profilePic,
    userId,
    userName,
  } = post
  const updatedPostDetails = {
    caption: postDetails.caption,
    imageUrl: postDetails.image_url,
  }
  const {caption, imageUrl} = updatedPostDetails

  const renderComments = () => {}

  return (
    <div className="bgContainer">
      <div className="userContainer">
        <img src={profilePic} alt={userName} className="profilePic" />
        <h1 className="userName">{userName}</h1>
      </div>
      <img src={imageUrl} alt={caption} className="postDetails" />
      <div className="commentsContainer">
        <div className="CommentSymbols">
          <BsHeart className="icon" />
          <FaRegComment className="icon" />
          <BiShareAlt className="icon" />
        </div>
        <p className="like">{likesCount} likes</p>
        <p className="postCaption">{caption}</p>
        {renderComments()}
      </div>
    </div>
  )
}

export default CreatePost

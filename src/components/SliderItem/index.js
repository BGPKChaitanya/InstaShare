const SliderItem = props => {
  const {eachLogo} = props
  const {userName, storyUrl} = eachLogo

  return (
    <div className="slick-item">
      <img className="logo-image" src={storyUrl} alt="company logo" />
      <span>{userName}</span>
    </div>
  )
}

export default SliderItem

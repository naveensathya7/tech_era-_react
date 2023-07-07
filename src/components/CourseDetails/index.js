import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

class CourseDetails extends Component {
  state = {courseDetails: [], isLoading: true, isFailure: false}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: formattedData,
        isLoading: false,
        isFailure: false,
      })
    } else {
      this.setState({isLoading: false, isFailure: true})
    }
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  renderCourseDetails = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="content-container">
        <img className="logo-image" src={imageUrl} alt={name} />
        <div>
          <h1 className="course-name">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {isLoading, isFailure} = this.state

    return (
      <div className="course-details-container">
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            {isFailure ? this.renderFailureView() : this.renderCourseDetails()}
          </>
        )}
      </div>
    )
  }
}

export default CourseDetails

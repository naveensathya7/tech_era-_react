import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import './index.css'

class Home extends Component {
  state = {courseList: [], isLoading: true, isFailure: false}

  componentDidMount() {
    this.getCourses()
  }

  onClickRetry = () => {
    this.getCourses()
  }

  getCourses = async () => {
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)

    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      this.setState({courseList: updatedData, isLoading: false})
    } else {
      this.setState({isFailure: true, isLoading: false})
    }
  }

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

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderCourses = () => {
    const {courseList} = this.state

    return (
      <ul className="courses-list">
        {courseList.map(eachCourse => (
          <CourseItem key={eachCourse.id} courseDetails={eachCourse} />
        ))}
      </ul>
    )
  }

  render() {
    const {courseList, isFailure, isLoading} = this.state
    console.log(courseList)
    return (
      <div className="home-page">
        <h1>Courses</h1>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            {isFailure ? this.renderFailureView() : this.renderCourses()}
          </div>
        )}
      </div>
    )
  }
}
export default Home

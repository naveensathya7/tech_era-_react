import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="course-item">
        <img className="logo" src={logoUrl} alt={name} />
        <p className="logo-name">{name}</p>
      </li>
    </Link>
  )
}
export default CourseItem

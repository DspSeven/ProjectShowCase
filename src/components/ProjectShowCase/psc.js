import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Category from '../Category/cat'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const categoryConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProjectShowCase extends Component {
  state = {
    status: categoriesList[0].id,
    categoryStatus: categoryConstants.loading,
    categoryData: [],
  }

  componentDidMount() {
    this.getCategory()
  }

  getCategory = async () => {
    this.setState({categoryStatus: categoryConstants.loading})
    const {status} = this.state
    const projectsApiUrl = `https://apis.ccbp.in/ps/projects?category=${status}`
    console.log(projectsApiUrl)
    const options = {
      method: 'GET',
    }
    const response = await fetch(projectsApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.projects.map(project => ({
        id: project.id,
        imageUrl: project.image_url,
        name: project.name,
      }))
      this.setState({
        categoryStatus: categoryConstants.success,
        categoryData: updatedData,
      })
    } else {
      this.setState({categoryStatus: categoryConstants.failure})
    }
  }

  // loader
  renderLoading = () => {
    console.log('')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#000000" />
      </div>
    )
  }

  // success
  successApi = () => {
    const {categoryData} = this.state
    return (
      <ul>
        {categoryData.map(data => (
          <Category key={data.id} details={data} />
        ))}
      </ul>
    )
  }

  // failure
  failureApi = () => {
    console.log('')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.getCategory}>
          Retry
        </button>
      </div>
    )
  }

  startSwitch = () => {
    const {categoryStatus} = this.state
    switch (categoryStatus) {
      case categoryConstants.success:
        return this.successApi()
      case categoryConstants.failure:
        return this.failureApi()
      case categoryConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  changeOption = event => {
    this.setState({status: event.target.value}, this.getCategory)
  }

  render() {
    const {status} = this.state
    console.log(status)
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </div>
        <select onChange={this.changeOption}>
          {categoriesList.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.displayText}
            </option>
          ))}
        </select>
        {this.startSwitch()}
      </div>
    )
  }
}
export default ProjectShowCase

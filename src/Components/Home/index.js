import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ListCategory from '../ListCategory'

import CategoryDish from '../CategoryDish'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    dishDetails: [],
    activeId: '11',
  }

  componentDidMount() {
    this.getDishes()
  }

  getDishes = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const options = {
      method: 'GET',
    }
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const fetchedData = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        categoryDishes: each.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          dishImage: eachDish.dish_image,
          dishCurrency: eachDish.dish_currency,
          dishCalories: eachDish.dish_calories,
          dishDescription: eachDish.dish_description,
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          nexturl: eachDish.nexturl,
          addonCat: eachDish.addonCat,
        })),
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        dishDetails: fetchedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveCategory = menuCategoryId => {
    this.setState({activeId: menuCategoryId})
  }

  renderDetails = () => {
    const {dishDetails, activeId} = this.state
    const categorydishes = dishDetails.filter(
      each => each.menuCategoryId === activeId,
    )
    const paricularCategory = categorydishes[0].categoryDishes
    return (
      <div className="totalCont">
        <Header />
        <div className="listCat">
          {dishDetails.map(each => (
            <ListCategory
              key={each.menuCategoryId}
              activeId={activeId}
              each={each}
              changeActiveCategory={this.changeActiveCategory}
            />
          ))}
        </div>
        <ul>
          {paricularCategory.map(each => (
            <CategoryDish each={each} key={each.dishId} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />

      <button type="button" className="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Home

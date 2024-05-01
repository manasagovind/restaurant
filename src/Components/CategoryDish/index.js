import {Component} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

class CategoryDish extends Component {
  state = {quantity: 0}

  decrementing = () => {
    const {quantity} = this.state
    if (quantity >= 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  incrementing = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {each} = this.props
          const {quantity} = this.state
          const {addCartItem} = value
          const {
            dishName,
            dishPrice,
            dishImage,
            dishCurrency,
            dishCalories,
            dishDescription,
            dishAvailability,
            dishType,
            addonCat,
          } = each
          const addonCart = () => {
            if (quantity > 0) {
              addCartItem({...each, quantity})
            }
          }

          return (
            <li className="categoryDishCont">
              <div className="disA">
                {dishType === 2 ? (
                  <div className="greenCont">
                    <p className="GreenPara">.</p>
                  </div>
                ) : (
                  <div className="redCont">
                    <p className="redPara">.</p>
                  </div>
                )}
              </div>
              <div className="dishDet">
                <h1 className="dishHead">{dishName}</h1>

                <p className="price">
                  {dishCurrency} {dishPrice}
                </p>

                <p className="dishDesc">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="incDecCont">
                    <button
                      type="button"
                      className="butt1"
                      onClick={this.decrementing}
                    >
                      -
                    </button>
                    <p className="count">{quantity}</p>
                    <button
                      type="button"
                      className="butt1"
                      onClick={this.incrementing}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="notAvailable">Not Available</p>
                )}
                {addonCat.length > 0 && (
                  <p className="customize">Customizations Available</p>
                )}
                {quantity > 0 && (
                  <button
                    type="button"
                    className="addtoCart"
                    onClick={addonCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
              <div className="caloriCont">
                <p className="calori">{dishCalories} calories</p>
              </div>
              <img src={dishImage} alt={dishName} className="imagee" />
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CategoryDish

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {dishId, dishName, quantity, dishPrice, dishImage} = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }
      const decrementing = () => {
        decrementCartItemQuantity(dishId)
      }

      const incrementing = () => {
        incrementCartItemQuantity(dishId)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{dishName}</p>
            </div>
            <div className="cart-quantity-container">
              {/* eslint-disable-next-line */}
              <button
                type="button"
                onClick={decrementing}
                className="quantity-controller-button"
              >
                -
              </button>
              <p className="cart-quantity">{quantity}</p>
              {/* eslint-disable-next-line */}
              <button
                type="button"
                onClick={incrementing}
                className="quantity-controller-button"
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">SAR {dishPrice * quantity}/-</p>
              <button
                className="removebutton"
                type="button"
                onClick={onRemoveCartItem}
                data-testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          {/* eslint-disable-next-line */}
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem

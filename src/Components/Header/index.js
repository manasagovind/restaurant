import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const changecart = () => {
    const {history} = props
    history.replace('/cart')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="headderCont">
            <Link to="/">
              <h1 className="navLogo">UNI Resto Cafe</h1>
            </Link>
            <div className="cartDet">
              <div className="orderCont">
                <Link to="/cart">
                  <p className="myOrders">My Orders</p>
                </Link>
                <div className="cartCount">
                  <button
                    className="carticon"
                    type="button"
                    onClick={changecart}
                    data-testid="cart"
                  >
                    <AiOutlineShoppingCart className="icon" />
                  </button>
                  <p className="cartCountP">{cartList.length}</p>
                </div>
              </div>

              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)

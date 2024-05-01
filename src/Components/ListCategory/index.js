import './index.css'

const ListCategory = props => {
  const {each, activeId, changeActiveCategory} = props
  const {menuCategoryId, menuCategory} = each
  const listClassName = activeId === menuCategoryId ? 'active' : 'nonActive'
  const buttClassName =
    activeId === menuCategoryId ? 'activebu' : 'nonActivebutt'
  const changeCategory = () => {
    changeActiveCategory(menuCategoryId)
  }
  return (
    <div className={listClassName}>
      <button type="button" onClick={changeCategory} className={buttClassName}>
        {menuCategory}
      </button>
    </div>
  )
}
export default ListCategory

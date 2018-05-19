import React from 'react'

import Item from './item'
import byTerm from '../../utilities/byTerm'

const List = (props) => {
  const { source, onClick, onMouseOver, searchTerm } = props
  const pattern = new RegExp(searchTerm, 'ig')
  const formatter = (matched) => `<span class="typeahead__data--matched">${matched}</span>`
  const buildItem = (item) => <Item key={item.value} {...{ item, pattern, formatter } } />
  const shortList = source.filter(byTerm(searchTerm))
  const itemsList = shortList.map(buildItem)

  const markUp = (
    <div className="typeahead__list">
      <ol onClick={onClick} onMouseOver={onMouseOver}>{itemsList}</ol>
    </div>
  )
  return markUp
}

export default List

import React from 'react'

const Item = (props) => {
  const { item: { label, value }, pattern, formatter } = props
  const html = { __html: label.replace(pattern, formatter) }
  const className = 'typeahead__data'
  const markUp = <li {...{ className, value}} dangerouslySetInnerHTML={html}></li>
  return markUp
}

export default Item

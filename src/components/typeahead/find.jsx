import React from 'react'

const Find = (props) => {
  const { onChange, onKeyDown, isSelected, userInput } = props
  const placeholder = 'Search...'
  const modifier = isSelected ? '--selected' : ''
  const className = `typeahead__find typeahead__find${modifier}`
  const type = 'search'
  const value = userInput
  const title = userInput
  const markUp = <input {...{ className, placeholder, onChange, onKeyDown, value, type, title }}  />
  return markUp
}

export default Find

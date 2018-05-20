import React, { Component } from 'react'

import Form from './form'
import Find from './find'
import List from './list'

import toggleStyle from '../../utilities/toggleStyle'
import filterList from '../../utilities/filterList'
import unique from '../../utilities/unique'
import toPair from '../../utilities/toPair'
import fauxNode from '../../utilities/fauxNode'
import byNodeValue from '../../utilities/byNodeValue'
import noop from '../../utilities/noop'

import './styles.css'

class Typeahead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: '',
      searchTerm: '',
      isSelected: false,
      domNode: fauxNode,
      source: filterList(props.datalist)
    }
  }

  onChange = (event) => {
    const userInput = event.target.value
    const searchTerm = userInput.trim().toLowerCase()
    const isSelected = false
    const domNode = fauxNode
    const source = filterList(this.props.datalist, searchTerm)
    const newState = { source, userInput, searchTerm, isSelected, domNode }
    this.setState(newState)
  }

  onKeyDown = (event) => {
    const { searchTerm } = this.state
    const { handleEscape, handleMove, handleEnter } = this
    const handleArrow = handleMove(event.key)
    const method = !searchTerm
      ? noop
      : (event.key === 'Escape')
      ? handleEscape
      : (event.key === 'ArrowUp')
      ? handleArrow
      : (event.key === 'ArrowDown')
      ? handleArrow
      : (event.key) === 'Enter'
      ? handleEnter
      : noop
    method()
  }

  onClick = (event) => {
    const userInput = event.target.innerText
    const searchTerm = ''
    const isSelected = true
    const domNode = fauxNode
    const newState = { userInput, searchTerm, isSelected, domNode }
    this.setState(newState)
  }

  onMouseOver = (event) => {
    const { target: newNode } = event
    const className = 'typeahead__data--hover'
    toggleStyle(newNode, className)
    this.setState({ domNode: newNode })
  }

  handleEscape = () => {
    const defaultState = {
      userInput: '',
      searchTerm: '',
      isSelected: false,
      domNode: fauxNode
    }
    this.setState(defaultState)
  }

  handleMove = (key) => () => {
    const { domNode: oldNode, source } = this.state
    const nodeList = Array.from(document.querySelectorAll('.typeahead__data'))
    const oldIndex = nodeList.findIndex(byNodeValue(oldNode))
    const prevIndex = oldIndex - 1
    const nextIndex = oldIndex + 1
    const lastIndex = source.length - 1
    const newIndex = (key === 'ArrowDown')
      ? Math.min(nextIndex > lastIndex ? 0 : nextIndex)
      : Math.max(prevIndex < 0 ? lastIndex : prevIndex)
    const newNode = nodeList[newIndex] || fauxNode
    const className = 'typeahead__data--hover'
    toggleStyle(newNode, className)
    newNode.scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' })
    this.setState({ domNode: newNode })
  }

  handleEnter = () => {
    const userInput = this.state.domNode.innerText
    const searchTerm = ''
    const isSelected = true
    const domNode = fauxNode
    const newState = { userInput, searchTerm, isSelected, domNode }
    this.setState(newState)
  }

  render = () => {
    const { onChange, onKeyDown, onClick, onMouseOver } = this
    const { userInput, searchTerm, isSelected } = this.state
    const { datalist } = this.props
    const source = datalist.filter(unique).sort().map(toPair)

    const markUp = (
      <Form>
        <Find {...{ userInput, isSelected, onChange, onKeyDown }} />
        <List {...{ source, searchTerm, onClick, onMouseOver }} />
      </Form>
    )
    return markUp
  }
}

export default Typeahead

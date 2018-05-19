import React, { Component } from 'react'

import Form from './form'
import Find from './find'
import List from './list'

import always from '../../utilities/always'
import unique from '../../utilities/unique'
import byTerm from '../../utilities/byTerm'
import toPair from '../../utilities/toPair'
import fauxNode from '../../utilities/fauxNode'
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
      source: this.filterList(props.datalist)
    }
  }

  filterList = (datalist, searchTerm) =>
    datalist
      .filter(unique)
      .sort()
      .map(toPair)
      .filter(searchTerm ? byTerm(searchTerm) : always(true))

  onChange = (event) => {
    const userInput = event.target.value
    const searchTerm = userInput.trim().toLowerCase()
    const isSelected = false
    const domNode = fauxNode
    const source = this.filterList(this.props.datalist, searchTerm)
    const newState = { source, userInput, searchTerm, isSelected, domNode }
    this.setState(newState)
  }

  onKeyDown = (event) => {
    const { searchTerm } = this.state
    const { handleEscape, handleMove, handleEnter } = this
    const handleUpDown = handleMove(event.key)
    const method = !searchTerm
      ? noop
      : (event.key === 'Escape')
      ? handleEscape
      : (event.key === 'ArrowUp')
      ? handleUpDown
      : (event.key === 'ArrowDown')
      ? handleUpDown
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
    const { domNode: oldNode } = this.state
    const { target: newNode } = event
    this.toggleStyle(oldNode, newNode)
  }

  toggleStyle = (oldNode, newNode) => {
    oldNode.classList.toggle('typeahead__data--hover')
    newNode.classList.toggle('typeahead__data--hover')
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
    const byValue = (node) => (node.getAttribute('value') === oldNode.getAttribute('value'))
    const oldIndex = nodeList.findIndex(byValue)
    const newIndex = (key === 'ArrowUp')
      ? Math.max(0, oldIndex - 1)
      : Math.min(source.length - 1, oldIndex + 1)
    const newNode = nodeList[newIndex] || fauxNode
    this.toggleStyle(oldNode, newNode)
    newNode.scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' })
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

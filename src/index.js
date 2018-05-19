import React from 'react'
import ReactDOM from 'react-dom'

import Typeahead from './components/typeahead'
import datalist from './resources/countries.json'

import './styles.css'

const content = <Typeahead {...{ datalist }} />
const domNode = document.querySelector('#root')

ReactDOM.render(content, domNode)

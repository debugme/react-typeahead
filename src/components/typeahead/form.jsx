import React from 'react'

const onSubmit = (event) => event.preventDefault()

const Form = (props) => {
  const { children } = props
  const className = 'typeahead__form'
  const markUp = <form {...{ className,  onSubmit }}>{children}</form>
  return markUp
}

export default Form

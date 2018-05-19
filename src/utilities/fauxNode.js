import noop from './noop'

const fauxNode = {
  getAttribute: noop,
  classList: {
    toggle: noop
  }
}

export default fauxNode

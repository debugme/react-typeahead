const byNodeValue = (oldNode) => (newNode) => (newNode.getAttribute('value') === oldNode.getAttribute('value'))

export default byNodeValue

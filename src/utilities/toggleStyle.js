const toggleStyle =(domNode, className) => {
  const nodeList = Array.from(document.querySelectorAll(className))
  nodeList.forEach((node) => node.classList.remove(className))
  domNode.classList.add(className)
}

export default toggleStyle

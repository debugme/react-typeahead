const byTerm = (searchTerm) => (item) => {
  const { value } = item
  const result = searchTerm && value.includes(searchTerm)
  return result
}

export default byTerm

const toPair = (data) => {
  const label = data
  const value = data.toLowerCase()
  const pair = { label, value }
  return pair
}

export default toPair

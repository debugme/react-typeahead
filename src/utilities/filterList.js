import always from './always'
import unique from './unique'
import byTerm from './byTerm'
import toPair from './toPair'

const filterList = (datalist, searchTerm) =>
  datalist
    .filter(unique)
    .sort()
    .map(toPair)
    .filter(searchTerm ? byTerm(searchTerm) : always(true))

export default filterList

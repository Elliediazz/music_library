import { useState, useEffect } from 'react'
import SearchBar from './Components/SearchBar'; //SearchBar
import Gallery from './Components/Gallery';//Gallery
import { DataContext } from './DataContext';

function App() {
  const [search, setSearch] = useState('') //search
  const [message, setMessage] = useState('Search For Music!') //message
  const [data, setData] = useState([]) //data

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }
 
  
  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
        const data = await response.json()
        console.log(data)
        if  (data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Artist Not Found')
        }
      }
      fetchData()
    }
  }, [search])

  return (
    <div>
      <SearchBar handleSearch={handleSearch}/>
      {message}
      <DataContext.Provider value={data} >
        <Gallery data={data}/>
      </DataContext.Provider>
    </div>
  );
}

export default App;

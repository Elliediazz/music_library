import {useState, Suspense, useEffect } from 'react'
import SearchBar from './Components/SearchBar'; //SearchBar
import Gallery from './Components/Gallery';//Gallery
import { createResource as fetchData } from './helper'
import Spinner from './Components/Spinner'

function App() {
  const [search, setSearch] = useState('') //search
  const [message, setMessage] = useState('Search For Music!') //message
  const [data, setData] = useState(null) //data

  useEffect(() => {
    if (search) {
      document.title=`${search} Music`
      console.log(fetchData(search))
      setData(fetchData(search))
    }
  }, [search])

  
  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }
 
  const renderGallery = () => {
    if(data){
      return (
        <Suspense fallback={<Spinner />} >
            <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div className='App'>
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

export default App;

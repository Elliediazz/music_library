import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './Components/SearchBar'; //SearchBar
import Gallery from './Components/Gallery';//Gallery
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './Components/DataContext';
//import { createResource as fetchData } from './helper'; ***not used
//import Spinner from './Components/Spinner' ***not use

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
  <div className='App'>
  {message}
    <Router>
      <Routes>
        <Route path="/" element={
          <Fragment>
            <SearchBar handleSearch = {handleSearch}/>
              <DataContext.Provider value={data}>
                  <Gallery data={data} />
              </DataContext.Provider>
          </Fragment>
        } />
        <Route path="/album/:id" element={<AlbumView />} />
        <Route path="/artist/:id" element={<ArtistView />} />
      </Routes>
    </Router>
  </div>
)
}

export default App;

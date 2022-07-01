import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const data = await response.json()
            console.log(data)
            setAlbumData(data.results)
        }

        fetchData()
    }, [id])

    const songs = albumData.filter(data => data.wrapperType === 'track')

    const display = songs.map(song => {
        return (
            <div key={song.trackId}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            {display}
        </div>
    )
}

export default AlbumView
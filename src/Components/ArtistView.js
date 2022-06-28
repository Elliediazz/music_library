import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    const albums = artistData.filter(data => data.collectionType === "Album")

    const display = albums.map((album, i) => {
        return (
            <div key={album.collectionId}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName} </p>
                </Link>
            </div>
        )
    })

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const data = await response.json()
            console.log(data)
            setArtistData(data.results                                                                                                                   )
        }
        fetchData()
    }, [id])

    const navigate = useNavigate()

    const navButtons = () => {
        return (
            <div>
                <button onClick={()=> navigate(-1)}>Back</button>

                <button onClick={()=> navigate('/')}>Home</button>
            </div>
        )
    }

    return (
        <div>
            {navButtons()}
            {display}
        </div>
    )
}

export default ArtistView
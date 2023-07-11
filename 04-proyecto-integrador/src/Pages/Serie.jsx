import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../pages/Serie.css'

const Serie = () => {
  const [serie, setSerie] = useState()
  // eslint-disable-next-line no-unused-vars
  const [episodios, setEpisodios] = useState([])
  const [cast, setCast] = useState([])
  const [seasons, setSeasons] = useState([])
  const [selectedSeason, setSelectedSeason] = useState('')

  const params = useParams()

  useEffect(() => {
    fetchSerie(params.id)
    fetchSeasons(params.id)
    fetchCast(params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(myRequest)
      .then((response) => {
        return response.json()
      }).then((epi) => {
        console.log(epi)
        setEpisodios(epi)
      }).catch((error) => {
        console.error(error)
      })
  }, [])

  const fetchSerie = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`).then(
      (data) => data.json()
    )
    setSerie(res)
  }

  const fetchSeasons = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/seasons`).then(
      (data) => data.json()
    )
    setSeasons(res)
    if (res.length > 0) {
      setSelectedSeason(res[0].id)
      fetchEpisodes(res[0].id)
    }
  }

  const fetchEpisodes = async (seasonId) => {
    const res = await fetch(
      `https://api.tvmaze.com/seasons/${seasonId}/episodes`
    ).then((data) => data.json())
    setEpisodios(res)
  }

  const fetchCast = async (id) => {
    const res = await fetch(
      `https://api.tvmaze.com/shows/${id}/cast`
    ).then((data) => data.json())
    setCast(res)
  }

  const handleSeasonChange = (event) => {
    const selectedSeasonId = event.target.value
    setSelectedSeason(selectedSeasonId)
    fetchEpisodes(selectedSeasonId)
  }

  return (
    <div>
      <div className='series-header'>
        {serie && (
          <>
            <img
              src={serie.image.medium}
              className='series-header-image'
              alt={serie.name}
            />
            <div>
              <h1 className='series-header-title'>{serie.name}</h1>
              <p className='series-header-summary'>{serie.summary.replace(/<\/?p>|<\/?b>/g, '')}</p>

            </div>
          </>
        )}
      </div>

      <div className='series-section'>
        <h2>Temporadas</h2>
        {seasons.length > 0
          ? (
            <select value={selectedSeason} onChange={handleSeasonChange}>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  Season {season.number}
                </option>
              ))}
            </select>
            )
          : (
            <p>No seasons available</p>
            )}
      </div>

      <div className='series-section'>
        <h2>CAST</h2>
        <div className='series-cast-container'>
          <div className='series-cast'>
            {cast.map((actor) => (
              <div key={actor.person.id} className='actor'>
                {actor.person.image && (
                  <img
                    src={actor.person.image.medium}
                    className='actor-image'
                    alt={actor.person.name}
                  />
                )}
                <p className='actor-name'>{actor.person.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Serie

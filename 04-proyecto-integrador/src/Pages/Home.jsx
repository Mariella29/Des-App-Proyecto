import React, { useState, useEffect } from 'react'
import SerieCard from '../components/SerieCard'
import SearchBar from '../components/SearchBar'

const Home = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const myRequest = new Request('https://api.tvmaze.com/shows?')
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const showsPerPage = 10

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reiniciar la página cuando se realiza una nueva búsqueda
  }

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const totalPages = Math.ceil(filteredData.length / showsPerPage)

  const indexOfLastShow = currentPage * showsPerPage
  const indexOfFirstShow = indexOfLastShow - showsPerPage
  const currentShows = filteredData.slice(indexOfFirstShow, indexOfLastShow)

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  useEffect(() => {
    fetch(myRequest)
      .then((response) => response.json())
      .then((series) => {
        setData(series)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [myRequest])

  const generatePaginationButtons = () => {
    const buttons = []

    if (totalPages > 2) {
      buttons.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className={currentPage === 1 ? 'active' : ''}
        >
          1
        </button>
      )

      buttons.push(
        <button
          key={2}
          onClick={() => goToPage(2)}
          className={currentPage === 2 ? 'active' : ''}
        >
          2
        </button>
      )

      if (totalPages >= 6) {
        buttons.push(
          <span key='ellipsis'>...</span>
        )

        buttons.push(
          <button
            key={6}
            onClick={() => goToPage(6)}
            className={currentPage === 6 ? 'active' : ''}
          >
            6
          </button>
        )
      }
    }

    return buttons
  }

  return (
    <div className='container'>
      <SearchBar handleSearchChange={handleSearch} />
      <div className='row'>
        {currentShows.map((item) => (
          <SerieCard key={item.id} {...item} />
        ))}
      </div>

      <div className='pagination'>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Anterior
        </button>

        {generatePaginationButtons()}

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Home

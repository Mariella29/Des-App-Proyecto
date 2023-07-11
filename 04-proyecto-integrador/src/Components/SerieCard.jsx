import React, { useState } from 'react'

const SerieCard = ({ id, name, image, summary, officialSite }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className='col-md-4 my-4 d-flex align-items-stretch'>
      <div
        className='card'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a href={`/serie/${id}`}>
          <div className={`image-container ${isHovered ? 'hovered' : ''}`}>
            <img className='serie-image' src={image.original} alt={name} />
            {isHovered && (
              <div className='overlay'>
                <button className='episodes-button'>Ver episodios</button>
              </div>
            )}
          </div>
        </a>
        <div className='card-body d-flex flex-column justify-content-between' />
      </div>
    </div>
  )
}

export default SerieCard

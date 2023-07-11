const Episodios = ({ name, season, number, summary }) => { /** Tabla de Contenido, contiene la informacion de
los capitulos */
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'> Episodio </th>
          <th scope='col'> Temporada </th>
          <th scope='col'> Nombre </th>
          <th scope='col'> Resumen </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>{number}</th>
          <td>{season}</td>
          <td>{name}</td>
          <td>{summary}</td>
        </tr>
      </tbody>
    </table>

  )
}

export default Episodios

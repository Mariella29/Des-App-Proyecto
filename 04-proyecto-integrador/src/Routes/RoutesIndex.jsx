import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Serie from '../Pages/Serie'
import NotFound from '../Pages/NotFound'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/serie/:id' element={<Serie />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default RoutesIndex

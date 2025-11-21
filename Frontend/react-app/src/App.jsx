import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'  
import Flowers from './Components/Flowers'
import Order from './Components/Order'
import './style.css'

function App() {
  const [flowerId, setFlowerId] = useState(1);
  const handleFlowerId = (id) => {
    setFlowerId(id)
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/flowers' element={<Flowers handleFlowerId={handleFlowerId} />} />
        <Route path='/rendeles' element={<Order flowerId={flowerId} />} />
      </Routes>
    </>
  )
}

export default App

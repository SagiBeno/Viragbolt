import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'  
//import Flowers from './Components/Flowers'
//import Order from './Components/Order'
import './style.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/*<Route path='/flowers' element={<Flowers />} />
        <Route path='/rendeles' element={<Order />} />*/}
      </Routes>
    </>
  )
}

export default App

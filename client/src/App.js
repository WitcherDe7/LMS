import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Success from './components/Success'



function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/success' element={<Success />}/>
    </Routes>
  )
}

export default App
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Game from './components/Game'
import UserInfo from './components/UserInfo'

const App = () => {
  return (
    <Routes>
      <Route path='/' exact element={<UserInfo/>}/>
      <Route path='/game' exact element={<Game/>}/>
    </Routes>
  )
}

export default App

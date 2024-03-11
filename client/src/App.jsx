import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
  <Routes>
    <Route path='/' element={<Home/>}/>
  </Routes>
  </div>
  )
}

export default App

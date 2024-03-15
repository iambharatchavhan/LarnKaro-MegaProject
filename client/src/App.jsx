import React from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import OpenRoute from "./components/core/Auth/OpenRoute"

function App() {


  return (
  <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
    </Routes>
  </div>
  )
}

export default App

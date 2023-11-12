import { useState, useEffect } from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom'

import LoginView from './LoginView'
import BoardListView from './BoardListView'
import BoardView from './BoardView'

import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

import PrivateRoute from "./utils/PrivateRoute"
import PublicRoute from "./utils/PublicRoute"

import useStore from './store'

function App() {
  const { isLoggedIn, setAuth } = useStore()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuth(user)
    })

    return () => unsub()
  }, []);

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/" element={<PublicRoute Component={LoginView}/>} />
          <Route path="/boards" element={<PrivateRoute Component={BoardListView} />} />
          <Route path="/boards/:id" element={<PrivateRoute Component={BoardView} />} />
          <Route path='*' element={<LoginView />} />
        </Routes>
      </div>
    </>
  )
}

export default App

import { useMemo, useEffect, useState, useContext, createContext } from 'react'
import './App.css'
import { CssBaseline } from '@mui/material'

import { Routes, Route } from 'react-router-dom'

import LoginView from './LoginView'
import BoardListView from './BoardListView'
import BoardView from './BoardView'

import { AuthProvider } from './utils/AuthProvider'
import PrivateRoute from "./utils/PrivateRoute"
import PublicRoute from "./utils/PublicRoute"
import { BoardProvider } from './utils/useBoardSettings'
import { DarkThemeProvider } from './utils/useTheme'

import useStore from './store'

export const ThemeContext = createContext({ toggleTheme: () => { } })

function App() {
  // get view and edit permissions for board routes
  const { publiclyEditable, publiclyViewable } = useStore()
  return (
    <>

      <BoardProvider>
        <CssBaseline />
        <AuthProvider>
          <DarkThemeProvider>
            <div className='App'>
              <Routes>
                <Route path="/" element={<PublicRoute Component={LoginView} />} />
                <Route path="/boards" element={<PrivateRoute Component={BoardListView} />} />
                <Route path="/boards/:id" element={
                  publiclyViewable ? <PublicRoute Component={BoardView} /> : <PrivateRoute Component={BoardView} />
                } />
                <Route path='*' element={<LoginView />} />
              </Routes>
            </div>
          </DarkThemeProvider>
        </AuthProvider>
      </BoardProvider>
    </>
  )
}

export default App



import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Photos from './Photos'
import PhotoDetail from './PhotoDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path='/photos' element={<Photos/>} />
        <Route path='photos/:id' element={<PhotoDetail/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FilmLibrary from './FilmLibraryWebpage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FilmLibrary />
  </React.StrictMode>,
)

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import './styles/global.css'
import Home from './pages/Home'
import Dream from './pages/Dream'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dream" element={<Dream />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

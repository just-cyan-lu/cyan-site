import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import './styles/global.css'
import Home from './pages/Home'
import About from './pages/About'
import Dream from './pages/Dream'
import Story from './pages/Story'
import StoryDetail from './pages/StoryDetail'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dream" element={<Dream />} />
          <Route path="/story" element={<Story />} />
          <Route path="/story/:id" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

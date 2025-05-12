import { Route, Routes } from 'react-router-dom'
import './App.css'
import AmountsCollected from './pages/AmountsCollected'
import ChartRepresentation from './pages/ChartRepresentation'


function App() {

  // log the two environment variables
  console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL)
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL)

  return (
    <>
      <Routes>
        <Route path='/' element={<AmountsCollected />} />
        <Route path='/chartRepresentation' element={<ChartRepresentation />} />
      </Routes>
    </>
  )
}

export default App

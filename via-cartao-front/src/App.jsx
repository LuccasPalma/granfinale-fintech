import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import Cartoes from './pages/Cartoes'
import Transacoes from './pages/Transacoes'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/contas" element={<Usuarios />} />

        <Route path="/cartoes" element={<Cartoes />} />

        <Route path="/transacoes" element={<Transacoes />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App
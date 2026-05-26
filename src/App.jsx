import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './features/auth/ProtectedRoute'
import Cartoes from './pages/Cartoes'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Transacoes from './pages/Transacoes'
import Usuarios from './pages/Usuarios'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contas" element={<Usuarios />} />
            <Route path="/cartoes" element={<Cartoes />} />
            <Route path="/transacoes" element={<Transacoes />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

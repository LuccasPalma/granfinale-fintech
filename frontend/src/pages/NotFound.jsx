import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>A rota acessada não existe ou foi movida.</p>
      <Button icon={Home} onClick={() => navigate('/dashboard')}>
        Voltar ao início
      </Button>
    </main>
  )
}

export default NotFound

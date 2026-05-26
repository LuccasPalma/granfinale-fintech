import { CreditCard, Home, LogOut, ReceiptText, UsersRound } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/Logo Via Cartao.jpeg'
import { useAuth } from '../../features/auth/useAuth'
import Button from '../ui/Button'

const navItems = [
  { icon: Home, label: 'Início', path: '/dashboard' },
  { icon: UsersRound, label: 'Contas', path: '/contas' },
  { icon: CreditCard, label: 'Cartões', path: '/cartoes' },
  { icon: ReceiptText, label: 'Transações', path: '/transacoes' },
]

function Sidebar() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img alt="Logo Via Cartão" src={logo} />
        <div>
          <strong>Via Cartão</strong>
          <span>{user?.nome || 'Fintech FIAP'}</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'sidebar__link is-active' : 'sidebar__link')}
            key={item.path}
            to={item.path}
          >
            <item.icon size={19} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <Button className="sidebar__logout" icon={LogOut} onClick={handleLogout} variant="danger">
        Sair
      </Button>
    </aside>
  )
}

export default Sidebar

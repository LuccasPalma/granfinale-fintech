import { Link, useLocation } from 'react-router-dom'

import logo from '../assets/Logo Via Cartao.jpeg'

function Sidebar() {

  const location = useLocation()

  function estiloLink(path) {

    return {
      display: 'block',
      padding: '12px',
      marginBottom: '10px',
      borderRadius: '8px',
      textDecoration: 'none',
      color: 'white',
      backgroundColor:
        location.pathname === path
          ? '#2563eb'
          : 'transparent',
      transition: '0.3s'
    }

  }

  return (

    <div
      style={{
        width: '240px',
        height: '100vh',
        backgroundColor: '#1e293b',
        padding: '20px',
        position: 'fixed',
        left: 0,
        top: 0,
        boxSizing: 'border-box',
        boxShadow: '4px 0 10px rgba(0,0,0,0.2)'
      }}
    >

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px'
        }}
      >

        <img
          src={logo}
          alt="Logo"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '10px'
          }}
        />

        <h2
          style={{
            color: 'white',
            margin: 0
          }}
        >
          Via Cartão
        </h2>

      </div>

      <nav>

        <Link
          to="/dashboard"
          style={estiloLink('/dashboard')}
        >
          🏠 Início
        </Link>

        <Link
          to="/usuarios"
          style={estiloLink('/usuarios')}
        >
          👤 Usuários
        </Link>

        <Link
          to="/cartoes"
          style={estiloLink('/cartoes')}
        >
          💳 Cartões
        </Link>

        <Link
          to="/transacoes"
          style={estiloLink('/transacoes')}
        >
          💰  Controle Financeiro
        </Link>

      </nav>

      <button
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '30px',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Sair
      </button>

    </div>

  )

}

export default Sidebar
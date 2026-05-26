import { useNavigate } from 'react-router-dom'

function NotFound() {

  const navigate = useNavigate()

  return (

    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#020f2b',
        color: 'white'
      }}
    >

      <h1
        style={{
          fontSize: '80px',
          margin: 0
        }}
      >
        404
      </h1>

      <h2>Página não encontrada</h2>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '12px 20px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Voltar ao Login
      </button>

    </div>

  )

}

export default NotFound
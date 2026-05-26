import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Usuarios() {

  const navigate = useNavigate()

  const [usuarios, setUsuarios] = useState([])

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [idEditando, setIdEditando] = useState(null)

  async function buscarUsuarios() {

    try {

      const response = await api.get('/usuarios')

      setUsuarios(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  async function cadastrarUsuario() {

    const novoUsuario = {
      nome,
      email,
      senha
    }

    try {

      if (idEditando) {

        await api.put(`/usuarios/${idEditando}`, novoUsuario)

        setIdEditando(null)

      } else {

        await api.post('/usuarios', novoUsuario)

      }

      buscarUsuarios()

      setNome('')
      setEmail('')
      setSenha('')

    } catch (error) {

      console.log(error)

    }

  }

  async function excluirUsuario(id) {

    try {

      await api.delete(`/usuarios/${id}`)

      buscarUsuarios()

    } catch (error) {

      console.log(error)

    }

  }

  function editarUsuario(usuario) {

    setIdEditando(usuario.id)

    setNome(usuario.nome)
    setEmail(usuario.email)
    setSenha(usuario.senha)

  }

  useEffect(() => {

    buscarUsuarios()

  }, [])

  return (

      <div
        style={{
        backgroundColor: '#020c2b',
        minHeight: '100vh',
        color: 'white',
        padding: '40px'
        }}
      >

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px'
          }}
        >

          <h1
            style={{
              margin: 0,
              fontSize: '42px'
            }}
          >
            👤 Contas
          </h1>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '14px 22px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 0 15px rgba(0,0,0,0.3)',
              fontSize: '18px'
            }}
          >
            🏠 Início
          </button>

        </div>

        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '35px',
            borderRadius: '20px',
            marginBottom: '35px',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)'
          }}
        >

          <h2
            style={{
             marginBottom: '35px',
             fontSize: '32px'
            }}
          >
            {idEditando ? '✏️ Editar Conta' : '➕ Adicionar Conta'}
          </h2>

          <input
            type="text"
            placeholder="Nome do titular"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              display: 'block',
              marginBottom: '15px',
              padding: '14px',
              width: '350px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#f1f5f9',
              fontSize: '15px'
            }}
          />

          <input
            type="email"
            placeholder="E-mail da conta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: 'block',
              marginBottom: '15px',
              padding: '14px',
              width: '350px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#f1f5f9',
              fontSize: '15px'
            }}
          />

          <input
            type="password"
            placeholder="Senha de acesso"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              display: 'block',
              marginBottom: '35px',
              padding: '14px',
              width: '350px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#f1f5f9',
              fontSize: '15px'
            }}
          />

          <button
            onClick={cadastrarUsuario}
            style={{
              padding: '14px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)'
            }}
          >
            {idEditando ? 'Salvar Alterações' : 'Adicionar Conta'}
          </button>

        </div>

        {

          usuarios.map(usuario => (

            <div
              key={usuario.id}
              style={{
                backgroundColor: '#1e293b',
                padding: '35px',
                marginBottom: '35px',
                borderRadius: '18px',
                boxShadow: '0 0 20px rgba(0,0,0,0.20)'
              }}
            >

              <h2
                style={{
                  fontSize: '32px',
                  marginBottom: '18px'
                }}
              >
            👤 {usuario.nome}
              </h2>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '20px',
                  marginBottom: '12px'
                }}
              >
                📧 {usuario.email}
              </p>

              <div
                style={{
                  marginTop: '20px'
                }}
              >

                <button
                  onClick={() => excluirUsuario(usuario.id)}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Excluir
                </button>

                <button
                  onClick={() => editarUsuario(usuario)}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginLeft: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  Editar Conta
                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  )

}

export default Usuarios
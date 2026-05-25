import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'

function Cartoes() {

  const [cartoes, setCartoes] = useState([])

  const [numero, setNumero] = useState('')
  const [limite, setLimite] = useState('')
  const [bandeira, setBandeira] = useState('')
  const [validade, setValidade] = useState('')

  const [idEditando, setIdEditando] = useState(null)

  async function buscarCartoes() {

    try {

      const response = await api.get('/cartoes')

      setCartoes(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  async function salvarCartao() {

    if (!numero || !limite || !bandeira || !validade) {

      alert('Preencha todos os campos.')

      return

    }

    const novoCartao = {
      numero,
      limite,
      bandeira,
      validade
    }

    try {

      if (idEditando) {

        await api.put(`/cartoes/${idEditando}`, novoCartao)

        setIdEditando(null)

      } else {

        await api.post('/cartoes', novoCartao)

      }

      buscarCartoes()

      setNumero('')
      setLimite('')
      setBandeira('')
      setValidade('')

    } catch (error) {

      console.log(error)

    }

  }

  async function excluirCartao(id) {

    try {

      await api.delete(`/cartoes/${id}`)

      buscarCartoes()

    } catch (error) {

      console.log(error)

    }

  }

  function editarCartao(cartao) {

    setIdEditando(cartao.id)

    setNumero(cartao.numero)
    setLimite(cartao.limite)
    setBandeira(cartao.bandeira)
    setValidade(cartao.validade)

  }

  useEffect(() => {

    buscarCartoes()

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
            fontSize: '55px',
            margin: 0
          }}
        >
          💳 Cartões Vinculados
        </h1>

        <Link to="/dashboard">

          <button
            style={{
              padding: '14px 22px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🏠 Início
          </button>

        </Link>

      </div>

      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '35px',
          boxShadow: '0 0 20px rgba(0,0,0,0.25)'
        }}
      >

        <h2
          style={{
            fontSize: '32px',
            marginBottom: '30px'
          }}
        >
          {idEditando ? '✏️ Editar Cartão' : '💳 Vincular Cartão'}
        </h2>

        <input
          type="text"
          placeholder="Número do cartão"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '14px',
            width: '350px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '15px'
          }}
        />

        <input
          type="txt"
          placeholder="Limite disponível"
          value={limite}
          onChange={(e) => setLimite(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '14px',
            width: '350px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '15px'
          }}
        />

        <input
          type="text"
          placeholder="Nome do cartão "
          value={bandeira}
          onChange={(e) => setBandeira(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '14px',
            width: '350px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '15px'
          }}
        />

        <input
          type="text"
          placeholder="Validade"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '25px',
            padding: '14px',
            width: '350px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '15px'
          }}
        />

        <button
          onClick={salvarCartao}
          style={{
            padding: '12px 22px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px'
          }}
        >
          {idEditando ? 'Salvar Alterações' : '💳 Vincular Cartão'}
        </button>

      </div>

      {

        cartoes.map(cartao => (

          <div
            key={cartao.id}
            style={{
              backgroundColor: '#1e293b',
              padding: '40px',
              marginBottom: '35px',
              borderRadius: '20px',
              boxShadow: '0 0 20px rgba(0,0,0,0.20)'
            }}
          >

            <h2
              style={{
                fontSize: '32px',
                marginBottom: '20px'
              }}
            >
              💳 {cartao.bandeira}
            </h2>

            <p style={{ fontSize: '18px' }}>
              🔢 Número: {cartao.numero}
            </p>

            <p style={{ fontSize: '18px' }}>
              💰 Limite disponível: R$ {cartao.limite}
            </p>

            <p style={{ fontSize: '18px' }}>
              📅 Validade: {cartao.validade}
            </p>

            <button
              onClick={() => excluirCartao(cartao.id)}
              style={{
                padding: '10px 18px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                marginTop: '15px',
                fontWeight: 'bold'
              }}
            >
              Excluir
            </button>

            <button
              onClick={() => editarCartao(cartao)}
              style={{
                padding: '10px 18px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                marginTop: '15px',
                marginLeft: '10px',
                fontWeight: 'bold'
              }}
            >
              Editar Cartão
            </button>

          </div>

        ))

      }

    </div>
  </div>

  )

}

export default Cartoes
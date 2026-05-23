import { useEffect, useState } from 'react'

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

    <div style={{ marginLeft: '260px', padding: '20px', color: 'white' }}>

      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}
      >

        <h2>
          {idEditando ? 'Editar Cartão' : 'Cadastrar Cartão'}
        </h2>

        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '10px',
            padding: '10px',
            width: '300px'
          }}
        />

        <input
          type="number"
          placeholder="Limite"
          value={limite}
          onChange={(e) => setLimite(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '10px',
            padding: '10px',
            width: '300px'
          }}
        />

        <input
          type="text"
          placeholder="Bandeira"
          value={bandeira}
          onChange={(e) => setBandeira(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '10px',
            padding: '10px',
            width: '300px'
          }}
        />

        <input
          type="text"
          placeholder="Validade"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '10px',
            padding: '10px',
            width: '300px'
          }}
        />

        <button
          onClick={salvarCartao}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {idEditando ? 'Salvar Alterações' : 'Cadastrar'}
        </button>

      </div>

      <h1>Cartões</h1>

      {

        cartoes.map(cartao => (

          <div
            key={cartao.id}
            style={{
              backgroundColor: '#1e293b',
              padding: '15px',
              marginTop: '15px',
              borderRadius: '10px'
            }}
          >

            <h3>{cartao.numero}</h3>

            <p>Limite: R$ {cartao.limite}</p>

            <p>{cartao.bandeira}</p>

            <p>Validade: {cartao.validade}</p>

            <button
              onClick={() => excluirCartao(cartao.id)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Excluir
            </button>

            <button
              onClick={() => editarCartao(cartao)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            >
              Editar
            </button>

          </div>

        ))

      }

    </div>

  )

}

export default Cartoes
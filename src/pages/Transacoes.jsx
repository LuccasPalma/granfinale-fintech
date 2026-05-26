import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Transacoes() {

  const navigate = useNavigate()

  const [transacoes, setTransacoes] = useState([])
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('SAIDA')
  const [dia, setDia] = useState('')

  const [idEditando, setIdEditando] = useState(null)

  async function buscarTransacoes() {

    try {

      const response = await api.get('/transacoes')

      setTransacoes(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  async function salvarTransacao() {

    const novaTransacao = {
      descricao,
      valor,
      tipo,
      dataTransacao: `2026-01-${dia.padStart(2, '0')}T00:00:00`
    }

    try {

      if (idEditando) {

        await api.put(`/transacoes/${idEditando}`, novaTransacao)

        setIdEditando(null)

      } else {

        await api.post('/transacoes', novaTransacao)

      }

      buscarTransacoes()

      setDescricao('')
      setValor('')
      setTipo('SAIDA')
      setDia('')

    } catch (error) {

      console.log(error)

    }

  }

  async function excluirTransacao(id) {

    try {

      await api.delete(`/transacoes/${id}`)

      buscarTransacoes()

    } catch (error) {

      console.log(error)

    }

  }
     function editarTransacao(transacao) {

      setDescricao(transacao.descricao)
      setValor(transacao.valor)
       setTipo(transacao.tipo)

      setDia(
      transacao.dataTransacao
      ? transacao.dataTransacao.replace('--', '')
      : ''
  )

  setIdEditando(transacao.id)
}

  useEffect(() => {

    buscarTransacoes()

  }, [])

  return (

      <div
        style={{
          backgroundColor: '#020f2b',
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
          marginBottom: '30px'
        }}
      >

        <h1
          style={{
            fontSize: '42px',
            margin: '0'
          }}
        >
          💰  Controle Financeiro
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
            fontSize: '18px',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)'
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
          marginBottom: '30px',
          boxShadow: '0 0 20px rgba(0,0,0,0.25)'
        }}
      >

        <h2
          style={{
            marginBottom: '30px',
            fontSize: '32px'
          }}
        >
          {idEditando ? '✏️ Editar Transação' : '💳 Lançamento Financeiro'}
        </h2>

        <input
          type="text"
          placeholder="Nome da transação"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '14px',
            width: '320px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#f1f5f9',
            fontSize: '15px'
          }}
        />

        <input
          type="number"
          placeholder="Valor da transação"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '14px',
            width: '320px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#f1f5f9',
            fontSize: '15px'
          }}
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '14px',
            width: '345px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#f1f5f9',
            fontSize: '15px'
          }}
        >

          <option value="ENTRADA">
            💰 Entrada
          </option>

          <option value="SAIDA">
            💸 Saída
          </option>

        </select>

        <input
          type="number"
          placeholder="Dia do lançamento"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '20px',
            padding: '12px',
            width: '320px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#f1f5f9',
            fontSize: '15px'
          }}
        />

        <button
          onClick={salvarTransacao}
          style={{
            padding: '14px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px',
            transition: '0.2s'
          }}
        >
          {idEditando ? 'Salvar Alterações' : 'Cadastrar'}
        </button>

      </div>

      {

        transacoes.map(transacao => (

          <div
            key={transacao.id}
            style={{
              backgroundColor: '#1e293b',
              padding: '35px',
              marginTop: '25px',
              borderRadius: '18px',
              boxShadow: '0 0 15px rgba(0,0,0,0.2)'
            }}
          >

            <h2
              style={{
                marginBottom: '18px',
                fontSize: '36px'
              }}
            >
              {transacao.descricao}
            </h2>

            <p
              style={{
                fontSize: '20px',
                marginBottom: '12px'
              }}
            >
            💰 Valor: R$ {transacao.valor}
            </p>

            <p
              style={{
                fontSize: '20px',
                marginBottom: '12px'
              }}
            >
            📌 Tipo: {transacao.tipo}
            </p>

            <p
              style={{
                fontSize: '20px',
                marginBottom: '12px'
              }}
            >
            🗓️ Dia do lançamento: {transacao.dataTransacao?.split('-')[2]}
            </p>

            <div
              style={{
                marginTop: '20px'
              }}
            >

              <button
                onClick={() => excluirTransacao(transacao.id)}
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
                onClick={() => editarTransacao(transacao)}
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
                Editar
              </button>

            </div>

          </div>

        ))

      }
  </div>

    </div>

  )

}

export default Transacoes
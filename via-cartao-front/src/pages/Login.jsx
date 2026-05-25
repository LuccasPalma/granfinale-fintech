import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/Logo Via Cartao.jpeg'

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

function entrar() {

  if (!email || !senha) {
    alert('Preencha todos os campos')
    return
  }

  if (
    email === 'admin@viacartao.com' &&
    senha === '123456'
  ) {

    navigate('/dashboard')

  } else {

    alert('E-mail ou senha inválidos')

  }

}
  return (

    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#020f2b'
      }}
    >

      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '10px',
          width: '350px'
        }}
      >

        <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px'
  }}
>

     <img
      src={logo}
      alt="Logo Via Cartão"
      style={{
      width: '70px',
      height: '70px',
      borderRadius: '12px'
      }}
       />

        <h1
        style={{
        color: 'white',
       margin: 0
       }}
        >
        Via Cartão
        </h1>

        </div>

        <input
       value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
         style={{
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: 'none',
    boxSizing: 'border-box'
  }}
/>

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: 'none',
            boxSizing: 'border-box'
          }}
        />

        <button
  onClick={entrar}
  style={{
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '5px'
  }}
>
  Entrar
</button>

      </div>

    </div>

  )

}

export default Login
import Sidebar from '../components/Sidebar'

function Dashboard() {

  return (

    <div
      style={{
        background: 'linear-gradient(to bottom, #020f2b, #03163d)',
        minHeight: '100vh',
        color: 'white'
      }}
    >

      <Sidebar />

      <div
        style={{
          marginLeft: '260px',
          padding: '35px'
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '35px'
          }}
        >

          <div>

            <h1
              style={{
                fontSize: '42px',
                marginBottom: '10px'
              }}
            >
              Painel Financeiro
            </h1>

            <p
              style={{
                color: '#94a3b8',
                fontSize: '18px'
              }}
            >
              Bem-vindo ao sistema Via Cartão 👋
            </p>

          </div>

          <div
            style={{
              backgroundColor: '#1e293b',
              padding: '18px 25px',
              borderRadius: '14px',
              boxShadow: '0 0 15px rgba(0,0,0,0.3)'
            }}
          >

            <p
              style={{
                margin: 0,
                color: '#94a3b8'
              }}
            >
              💳 Saldo Disponível
            </p>

            <h2
              style={{
                margin: 0,
                marginTop: '8px',
                color: '#22c55e'
              }}
            >
              R$ 12.450,90
            </h2>

          </div>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '35px'
          }}
        >

          <div
            style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '16px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)',
              transition: '0.3s'
            }}
          >

            <h3>💼 Contas Vinculadas</h3>

            <h1
              style={{
                fontSize: '45px',
                margin: '10px 0'
              }}
            >
              8
            </h1>

            <p
              style={{
                color: '#94a3b8'
              }}
            >
              Clientes ativos
            </p>

          </div>

          <div
            style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '16px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}
          >

            <h3>💳 Cartões Vinculados</h3>

            <h1
              style={{
                fontSize: '45px',
                margin: '10px 0'
              }}
            >
              4
            </h1>

            <p
              style={{
                color: '#94a3b8'
              }}
            >
              Cartões ativos
            </p>

          </div>

          <div
            style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '16px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}
          >

            <h3>💸 Movimentações</h3>

            <h1
              style={{
                fontSize: '45px',
                margin: '10px 0'
              }}
            >
              31
            </h1>

            <p
              style={{
                color: '#94a3b8'
              }}
            >
              Movimentações registradas
            </p>

          </div>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px'
          }}
        >

          <div
            style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '16px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}
          >

            <h2
              style={{
                marginBottom: '25px'
              }}
            >
              📈 Fluxo Financeiro
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'end',
                gap: '15px',
                height: '220px'
              }}
            >

              <div
                style={{
                  backgroundColor: '#2563eb',
                  width: '60px',
                  height: '120px',
                  borderRadius: '8px'
                }}
              />

              <div
                style={{
                  backgroundColor: '#3b82f6',
                  width: '60px',
                  height: '180px',
                  borderRadius: '8px'
                }}
              />

              <div
                style={{
                  backgroundColor: '#60a5fa',
                  width: '60px',
                  height: '140px',
                  borderRadius: '8px'
                }}
              />

              <div
                style={{
                  backgroundColor: '#93c5fd',
                  width: '60px',
                  height: '200px',
                  borderRadius: '8px'
                }}
              />

            </div>

          </div>

          <div
            style={{
              backgroundColor: '#1e293b',
              padding: '25px',
              borderRadius: '16px',
              boxShadow: '0 0 20px rgba(0,0,0,0.3)'
            }}
          >

            <h2
              style={{
                marginBottom: '20px'
              }}
            >
              🔔 Últimas Movimentações
            </h2>

            <p>✅ Nova conta adicionada</p>

            <p>💳 Cartão Santander Elite vinculado</p>

            <p>💸 Transação Netflix registrada</p>

            <p>💰 Limite atualizado</p>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Dashboard
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  ReceiptText,
  UsersRound,
  Wallet,
} from 'lucide-react'
import { useMemo } from 'react'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { useCards } from '../features/cards/useCards'
import { useTransactions } from '../features/transactions/useTransactions'
import { useUsers } from '../features/users/useUsers'
import { formatCurrency, formatDate } from '../lib/formatters'

function Dashboard() {
  const { cards } = useCards()
  const { transactions } = useTransactions()
  const { users } = useUsers()

  const totals = useMemo(() => {
    return transactions.reduce(
      (summary, transaction) => {
        const value = Number(transaction.valor || 0)

        if (transaction.tipo === 'ENTRADA') {
          summary.income += value
        } else {
          summary.expense += value
        }

        summary.balance = summary.income - summary.expense
        return summary
      },
      { balance: 0, expense: 0, income: 0 },
    )
  }, [transactions])

  const cardLimit = useMemo(
    () => cards.reduce((total, card) => total + Number(card.limite || 0), 0),
    [cards],
  )

  const recentTransactions = transactions.slice(0, 4)

  return (
    <div className="page">
      <PageHeader
        description="Visão operacional das contas, cartões e movimentações financeiras."
        title="Painel financeiro"
      />

      <section className="stats-grid" aria-label="Resumo financeiro">
        <Card className="stat-card">
          <Wallet size={24} aria-hidden="true" />
          <span>Saldo atual</span>
          <strong>{formatCurrency(totals.balance)}</strong>
        </Card>
        <Card className="stat-card">
          <UsersRound size={24} aria-hidden="true" />
          <span>Contas vinculadas</span>
          <strong>{users.length}</strong>
        </Card>
        <Card className="stat-card">
          <CreditCard size={24} aria-hidden="true" />
          <span>Limite total</span>
          <strong>{formatCurrency(cardLimit)}</strong>
        </Card>
        <Card className="stat-card">
          <ReceiptText size={24} aria-hidden="true" />
          <span>Movimentações</span>
          <strong>{transactions.length}</strong>
        </Card>
      </section>

      <section className="dashboard-grid">
        <Card>
          <div className="section-title">
            <h2>Fluxo financeiro</h2>
            <p>Comparativo rápido entre entradas e saídas registradas.</p>
          </div>

          <div className="flow-summary">
            <div>
              <ArrowUpCircle size={22} aria-hidden="true" />
              <span>Entradas</span>
              <strong className="value-positive">{formatCurrency(totals.income)}</strong>
            </div>
            <div>
              <ArrowDownCircle size={22} aria-hidden="true" />
              <span>Saídas</span>
              <strong className="value-negative">{formatCurrency(totals.expense)}</strong>
            </div>
          </div>

          <div className="bar-chart" aria-hidden="true">
            <span className="bar-chart__bar bar-chart__bar--income" />
            <span className="bar-chart__bar bar-chart__bar--expense" />
            <span className="bar-chart__bar bar-chart__bar--limit" />
            <span className="bar-chart__bar bar-chart__bar--transactions" />
          </div>
        </Card>

        <Card>
          <div className="section-title">
            <h2>Últimas movimentações</h2>
            <p>Atividades financeiras mais recentes.</p>
          </div>

          <div className="activity-list">
            {recentTransactions.length === 0 && <p>Nenhuma movimentação registrada.</p>}
            {recentTransactions.map((transaction) => (
              <div className="activity-item" key={transaction.id}>
                <span>{transaction.descricao}</span>
                <strong>{formatCurrency(transaction.valor)}</strong>
                <small>{formatDate(transaction.dataTransacao)}</small>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Dashboard

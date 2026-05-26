import { ArrowDownCircle, ArrowUpCircle, CalendarDays, Pencil, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { formatCurrency, formatTransactionDay } from '../../lib/formatters'

function TransactionItem({ onDelete, onEdit, transaction }) {
  const isIncome = transaction.tipo === 'ENTRADA'
  const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle

  return (
    <Card className="entity-card">
      <div className="entity-card__body">
        <div className={isIncome ? 'entity-icon entity-icon--income' : 'entity-icon entity-icon--expense'}>
          <Icon size={22} aria-hidden="true" />
        </div>
        <div>
          <h2>{transaction.descricao}</h2>
          <p>
            <CalendarDays size={16} aria-hidden="true" />
            {formatTransactionDay(transaction.dataTransacao)}
          </p>
          <strong className={isIncome ? 'value-positive' : 'value-negative'}>
            {isIncome ? '+' : '-'} {formatCurrency(transaction.valor)}
          </strong>
        </div>
      </div>

      <div className="entity-card__actions">
        <Button icon={Pencil} onClick={() => onEdit(transaction)} variant="secondary">
          Editar
        </Button>
        <Button icon={Trash2} onClick={() => onDelete(transaction.id)} variant="danger">
          Excluir
        </Button>
      </div>
    </Card>
  )
}

export default TransactionItem

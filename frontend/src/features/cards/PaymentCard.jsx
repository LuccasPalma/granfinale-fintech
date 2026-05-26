import { CalendarDays, CreditCard, Pencil, Trash2, WalletCards } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { formatCurrency } from '../../lib/formatters'

function PaymentCard({ card, onDelete, onEdit }) {
  return (
    <Card className="entity-card">
      <div className="entity-card__body">
        <div className="entity-icon">
          <CreditCard size={22} aria-hidden="true" />
        </div>
        <div>
          <h2>{card.bandeira}</h2>
          <p>
            <WalletCards size={16} aria-hidden="true" />
            {card.numero}
          </p>
          <p>
            <CalendarDays size={16} aria-hidden="true" />
            Validade {card.validade}
          </p>
          <strong>{formatCurrency(card.limite)}</strong>
        </div>
      </div>

      <div className="entity-card__actions">
        <Button icon={Pencil} onClick={() => onEdit(card)} variant="secondary">
          Editar
        </Button>
        <Button icon={Trash2} onClick={() => onDelete(card.id)} variant="danger">
          Excluir
        </Button>
      </div>
    </Card>
  )
}

export default PaymentCard

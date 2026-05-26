import { Mail, Pencil, Trash2, UserRound } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

function UserCard({ user, onDelete, onEdit }) {
  return (
    <Card className="entity-card">
      <div className="entity-card__body">
        <div className="entity-icon">
          <UserRound size={22} aria-hidden="true" />
        </div>
        <div>
          <h2>{user.nome}</h2>
          <p>
            <Mail size={16} aria-hidden="true" />
            {user.email}
          </p>
        </div>
      </div>

      <div className="entity-card__actions">
        <Button icon={Pencil} onClick={() => onEdit(user)} variant="secondary">
          Editar
        </Button>
        <Button icon={Trash2} onClick={() => onDelete(user.id)} variant="danger">
          Excluir
        </Button>
      </div>
    </Card>
  )
}

export default UserCard

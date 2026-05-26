import { useState } from 'react'
import { toast } from 'sonner'
import PageHeader from '../components/ui/PageHeader'
import StateMessage from '../components/ui/StateMessage'
import CardForm from '../features/cards/CardForm'
import PaymentCard from '../features/cards/PaymentCard'
import { useCards } from '../features/cards/useCards'

function Cartoes() {
  const [editingCard, setEditingCard] = useState(null)
  const { cards, cardsError, cardsLoading, createCard, deleteCard, isSaving, updateCard } =
    useCards()

  async function handleSubmit(data) {
    try {
      if (editingCard) {
        await updateCard({ data, id: editingCard.id })
        toast.success('Cartão atualizado com sucesso.')
      } else {
        await createCard(data)
        toast.success('Cartão vinculado com sucesso.')
      }

      setEditingCard(null)
    } catch {
      toast.error('Não foi possível salvar o cartão.')
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Deseja realmente excluir este cartão?')

    if (!confirmed) return

    try {
      await deleteCard(id)
      toast.success('Cartão excluído com sucesso.')
    } catch {
      toast.error('Não foi possível excluir o cartão.')
    }
  }

  return (
    <div className="page">
      <PageHeader
        description="Acompanhe cartões vinculados, limites e validade em uma visão única."
        title="Cartões"
      />

      <CardForm
        editingCard={editingCard}
        isSaving={isSaving}
        onCancelEdit={() => setEditingCard(null)}
        onSubmit={handleSubmit}
      />

      <section className="entity-list" aria-label="Cartões cadastrados">
        {cardsLoading && <StateMessage text="Buscando dados no backend." title="Carregando cartões" />}
        {cardsError && (
          <StateMessage text="Verifique se o backend Spring Boot está ativo." title="Erro ao carregar" />
        )}
        {!cardsLoading && !cardsError && cards.length === 0 && (
          <StateMessage text="Vincule o primeiro cartão para começar." title="Nenhum cartão encontrado" />
        )}
        {cards.map((card) => (
          <PaymentCard key={card.id} card={card} onDelete={handleDelete} onEdit={setEditingCard} />
        ))}
      </section>
    </div>
  )
}

export default Cartoes

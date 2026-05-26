import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'

const cardSchema = z.object({
  bandeira: z.string().min(2, 'Informe o nome do cartão.'),
  limite: z.coerce.number().positive('Informe um limite maior que zero.'),
  numero: z.string().min(4, 'Informe ao menos os últimos 4 dígitos.'),
  validade: z.string().min(5, 'Informe a validade.'),
})

function CardForm({ editingCard, isSaving, onCancelEdit, onSubmit }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      bandeira: '',
      limite: '',
      numero: '',
      validade: '',
    },
    resolver: zodResolver(cardSchema),
  })

  useEffect(() => {
    reset({
      bandeira: editingCard?.bandeira || '',
      limite: editingCard?.limite || '',
      numero: editingCard?.numero || '',
      validade: editingCard?.validade || '',
    })
  }, [editingCard, reset])

  async function submit(values) {
    await onSubmit(values)
    reset({ bandeira: '', limite: '', numero: '', validade: '' })
  }

  return (
    <Card>
      <div className="section-title">
        <h2>{editingCard ? 'Editar cartão' : 'Vincular cartão'}</h2>
        <p>Registre cartões e limites para acompanhar o saldo disponível.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit(submit)}>
        <Input
          error={errors.bandeira?.message}
          label="Nome do cartão"
          placeholder="Ex: Santander Elite"
          {...register('bandeira')}
        />
        <Input
          error={errors.numero?.message}
          label="Número"
          placeholder="Ex: **** **** **** 1234"
          {...register('numero')}
        />
        <Input
          error={errors.limite?.message}
          label="Limite disponível"
          min="0"
          placeholder="Ex: 2500"
          step="0.01"
          type="number"
          {...register('limite')}
        />
        <Input
          error={errors.validade?.message}
          label="Validade"
          placeholder="MM/AA"
          {...register('validade')}
        />

        <div className="form-actions">
          {editingCard && (
            <Button onClick={onCancelEdit} variant="secondary">
              Cancelar
            </Button>
          )}
          <Button disabled={isSaving} icon={editingCard ? Save : CreditCard} type="submit">
            {isSaving ? 'Salvando...' : editingCard ? 'Salvar alterações' : 'Vincular cartão'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default CardForm

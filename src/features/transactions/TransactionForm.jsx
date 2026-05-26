import { zodResolver } from '@hookform/resolvers/zod'
import { ReceiptText, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { toDayInputValue } from '../../lib/formatters'

const transactionSchema = z.object({
  diaTransacao: z.coerce
    .number()
    .int('Informe um dia valido.')
    .min(1, 'Informe um dia entre 1 e 31.')
    .max(31, 'Informe um dia entre 1 e 31.'),
  descricao: z.string().min(3, 'Informe uma descricao.'),
  tipo: z.enum(['ENTRADA', 'SAIDA']),
  valor: z.coerce.number().positive('Informe um valor maior que zero.'),
})

function TransactionForm({ editingTransaction, isSaving, onCancelEdit, onSubmit }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      descricao: '',
      diaTransacao: '',
      tipo: 'SAIDA',
      valor: '',
    },
    resolver: zodResolver(transactionSchema),
  })

  useEffect(() => {
    reset({
      descricao: editingTransaction?.descricao || '',
      diaTransacao: toDayInputValue(editingTransaction?.dataTransacao),
      tipo: editingTransaction?.tipo || 'SAIDA',
      valor: editingTransaction?.valor || '',
    })
  }, [editingTransaction, reset])

  async function submit(values) {
    const today = new Date()
    const year = today.getFullYear()
    const month = '01'
    const day = String(values.diaTransacao).padStart(2, '0')

    await onSubmit({
      dataTransacao: `${year}-${month}-${day}T00:00:00`,
      descricao: values.descricao,
      tipo: values.tipo,
      valor: values.valor,
    })
    reset({ descricao: '', diaTransacao: '', tipo: 'SAIDA', valor: '' })
  }

  return (
    <Card>
      <div className="section-title">
        <h2>{editingTransaction ? 'Editar transacao' : 'Lancamento financeiro'}</h2>
        <p>Registre entradas e saidas futuras informando o dia fixo de cada cobranca.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit(submit)}>
        <Input
          error={errors.descricao?.message}
          label="Descricao"
          placeholder="Ex: Netflix"
          {...register('descricao')}
        />
        <Input
          error={errors.valor?.message}
          label="Valor"
          min="0"
          placeholder="Ex: 59.90"
          step="0.01"
          type="number"
          {...register('valor')}
        />
        <Select error={errors.tipo?.message} label="Tipo" {...register('tipo')}>
          <option value="ENTRADA">Entrada</option>
          <option value="SAIDA">Saida</option>
        </Select>
        <Input
          error={errors.diaTransacao?.message}
          label="Dia"
          max="31"
          min="1"
          placeholder="Ex: 10"
          type="number"
          {...register('diaTransacao')}
        />

        <div className="form-actions">
          {editingTransaction && (
            <Button onClick={onCancelEdit} variant="secondary">
              Cancelar
            </Button>
          )}
          <Button disabled={isSaving} icon={editingTransaction ? Save : ReceiptText} type="submit">
            {isSaving ? 'Salvando...' : editingTransaction ? 'Salvar alteracoes' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default TransactionForm

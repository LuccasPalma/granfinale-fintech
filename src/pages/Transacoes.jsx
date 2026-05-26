import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import PageHeader from '../components/ui/PageHeader'
import StateMessage from '../components/ui/StateMessage'
import TransactionForm from '../features/transactions/TransactionForm'
import TransactionItem from '../features/transactions/TransactionItem'
import { useTransactions } from '../features/transactions/useTransactions'
import { formatCurrency } from '../lib/formatters'

function Transacoes() {
  const [editingTransaction, setEditingTransaction] = useState(null)
  const {
    createTransaction,
    deleteTransaction,
    isSaving,
    transactions,
    transactionsError,
    transactionsLoading,
    updateTransaction,
  } = useTransactions()

  const balance = useMemo(
    () =>
      transactions.reduce((total, transaction) => {
        const value = Number(transaction.valor || 0)
        return transaction.tipo === 'ENTRADA' ? total + value : total - value
      }, 0),
    [transactions],
  )

  async function handleSubmit(data) {
    try {
      if (editingTransaction) {
        await updateTransaction({ data, id: editingTransaction.id })
        toast.success('Transação atualizada com sucesso.')
      } else {
        await createTransaction(data)
        toast.success('Transação cadastrada com sucesso.')
      }

      setEditingTransaction(null)
    } catch {
      toast.error('Não foi possível salvar a transação.')
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Deseja realmente excluir esta transação?')

    if (!confirmed) return

    try {
      await deleteTransaction(id)
      toast.success('Transação excluída com sucesso.')
    } catch {
      toast.error('Não foi possível excluir a transação.')
    }
  }

  return (
    <div className="page">
      <PageHeader
        description={`Saldo calculado pelas transações: ${formatCurrency(balance)}`}
        title="Controle financeiro"
      />

      <TransactionForm
        editingTransaction={editingTransaction}
        isSaving={isSaving}
        onCancelEdit={() => setEditingTransaction(null)}
        onSubmit={handleSubmit}
      />

      <section className="entity-list" aria-label="Transações cadastradas">
        {transactionsLoading && (
          <StateMessage text="Buscando dados no backend." title="Carregando transações" />
        )}
        {transactionsError && (
          <StateMessage text="Verifique se o backend Spring Boot está ativo." title="Erro ao carregar" />
        )}
        {!transactionsLoading && !transactionsError && transactions.length === 0 && (
          <StateMessage
            text="Cadastre a primeira entrada ou saída para acompanhar o fluxo."
            title="Nenhuma transação encontrada"
          />
        )}
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            onDelete={handleDelete}
            onEdit={setEditingTransaction}
            transaction={transaction}
          />
        ))}
      </section>
    </div>
  )
}

export default Transacoes

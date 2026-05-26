import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from './transactionsService'

export function useTransactions() {
  const queryClient = useQueryClient()
  const transactionsQuery = useQuery({
    queryFn: getTransactions,
    queryKey: ['transactions'],
  })

  const invalidateTransactions = () => queryClient.invalidateQueries({ queryKey: ['transactions'] })

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: invalidateTransactions,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTransaction(id, data),
    onSuccess: invalidateTransactions,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: invalidateTransactions,
  })

  return {
    createTransaction: createMutation.mutateAsync,
    deleteTransaction: deleteMutation.mutateAsync,
    isSaving: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    transactions: transactionsQuery.data || [],
    transactionsError: transactionsQuery.error,
    transactionsLoading: transactionsQuery.isLoading,
    updateTransaction: updateMutation.mutateAsync,
  }
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCard, deleteCard, getCards, updateCard } from './cardsService'

export function useCards() {
  const queryClient = useQueryClient()
  const cardsQuery = useQuery({
    queryFn: getCards,
    queryKey: ['cards'],
  })

  const invalidateCards = () => queryClient.invalidateQueries({ queryKey: ['cards'] })

  const createMutation = useMutation({
    mutationFn: createCard,
    onSuccess: invalidateCards,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateCard(id, data),
    onSuccess: invalidateCards,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: invalidateCards,
  })

  return {
    cards: cardsQuery.data || [],
    cardsError: cardsQuery.error,
    cardsLoading: cardsQuery.isLoading,
    createCard: createMutation.mutateAsync,
    deleteCard: deleteMutation.mutateAsync,
    isSaving: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    updateCard: updateMutation.mutateAsync,
  }
}

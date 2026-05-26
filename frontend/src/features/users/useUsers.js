import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUser, deleteUser, getUsers, updateUser } from './usersService'

export function useUsers() {
  const queryClient = useQueryClient()
  const usersQuery = useQuery({
    queryFn: getUsers,
    queryKey: ['users'],
  })

  const invalidateUsers = () => queryClient.invalidateQueries({ queryKey: ['users'] })

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: invalidateUsers,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: invalidateUsers,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: invalidateUsers,
  })

  return {
    createUser: createMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    isSaving: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    updateUser: updateMutation.mutateAsync,
    users: usersQuery.data || [],
    usersError: usersQuery.error,
    usersLoading: usersQuery.isLoading,
  }
}

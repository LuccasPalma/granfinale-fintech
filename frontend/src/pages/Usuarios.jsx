import { useState } from 'react'
import { toast } from 'sonner'
import PageHeader from '../components/ui/PageHeader'
import StateMessage from '../components/ui/StateMessage'
import UserCard from '../features/users/UserCard'
import UserForm from '../features/users/UserForm'
import { useUsers } from '../features/users/useUsers'

function Usuarios() {
  const [editingUser, setEditingUser] = useState(null)
  const { createUser, deleteUser, isSaving, updateUser, users, usersError, usersLoading } =
    useUsers()

  async function handleSubmit(data) {
    try {
      if (editingUser) {
        await updateUser({ data, id: editingUser.id })
        toast.success('Conta atualizada com sucesso.')
      } else {
        await createUser(data)
        toast.success('Conta cadastrada com sucesso.')
      }

      setEditingUser(null)
    } catch {
      toast.error('Não foi possível salvar a conta.')
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Deseja realmente excluir esta conta?')

    if (!confirmed) return

    try {
      await deleteUser(id)
      toast.success('Conta excluída com sucesso.')
    } catch {
      toast.error('Não foi possível excluir a conta.')
    }
  }

  return (
    <div className="page">
      <PageHeader
        description="Gerencie titulares, e-mails de acesso e contas vinculadas ao sistema."
        title="Contas"
      />

      <UserForm
        editingUser={editingUser}
        isSaving={isSaving}
        onCancelEdit={() => setEditingUser(null)}
        onSubmit={handleSubmit}
      />

      <section className="entity-list" aria-label="Contas cadastradas">
        {usersLoading && <StateMessage text="Buscando dados no backend." title="Carregando contas" />}
        {usersError && (
          <StateMessage text="Verifique se o backend Spring Boot está ativo." title="Erro ao carregar" />
        )}
        {!usersLoading && !usersError && users.length === 0 && (
          <StateMessage text="Cadastre a primeira conta para começar." title="Nenhuma conta encontrada" />
        )}
        {users.map((user) => (
          <UserCard key={user.id} onDelete={handleDelete} onEdit={setEditingUser} user={user} />
        ))}
      </section>
    </div>
  )
}

export default Usuarios

import { zodResolver } from '@hookform/resolvers/zod'
import { Save, UserPlus } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'

const userSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  nome: z.string().min(3, 'Informe pelo menos 3 caracteres.'),
  senha: z.string().optional(),
})

function UserForm({ editingUser, isSaving, onCancelEdit, onSubmit }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      nome: '',
      senha: '',
    },
    resolver: zodResolver(userSchema),
  })

  useEffect(() => {
    reset({
      email: editingUser?.email || '',
      nome: editingUser?.nome || '',
      senha: '',
    })
  }, [editingUser, reset])

  async function submit(values) {
    const payload = {
      email: values.email,
      nome: values.nome,
    }

    if (values.senha) {
      payload.senha = values.senha
    }

    await onSubmit(payload)
    reset({ email: '', nome: '', senha: '' })
  }

  return (
    <Card>
      <div className="section-title">
        <h2>{editingUser ? 'Editar conta' : 'Adicionar conta'}</h2>
        <p>
          Cadastre titulares e mantenha os dados básicos da conta atualizados. Senhas não são
          carregadas de volta por segurança.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit(submit)}>
        <Input
          error={errors.nome?.message}
          label="Nome do titular"
          placeholder="Ex: Luccas Silva"
          {...register('nome')}
        />
        <Input
          error={errors.email?.message}
          label="E-mail"
          placeholder="nome@email.com"
          type="email"
          {...register('email')}
        />
        <Input
          error={errors.senha?.message}
          label={editingUser ? 'Nova senha opcional' : 'Senha'}
          placeholder={editingUser ? 'Preencha apenas para alterar' : 'Senha de acesso'}
          type="password"
          {...register('senha')}
        />

        <div className="form-actions">
          {editingUser && (
            <Button onClick={onCancelEdit} variant="secondary">
              Cancelar
            </Button>
          )}
          <Button disabled={isSaving} icon={editingUser ? Save : UserPlus} type="submit">
            {isSaving ? 'Salvando...' : editingUser ? 'Salvar alterações' : 'Adicionar conta'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default UserForm

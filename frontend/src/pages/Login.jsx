import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../features/auth/useAuth'
import logo from '../assets/Logo Via Cartao.jpeg'

const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  senha: z.string().min(1, 'Informe sua senha.'),
})

function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const redirectTo = location.state?.from?.pathname || '/dashboard'

  if (isAuthenticated) {
    navigate(redirectTo, { replace: true })
  }

  async function handleLogin(values) {
    try {
      await login(values)
      toast.success('Login realizado com sucesso.')
      navigate(redirectTo, { replace: true })
    } catch {
      toast.error('E-mail ou senha inválidos.')
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand">
          <img alt="Logo Via Cartão" src={logo} />
          <div>
            <h1 id="login-title">Via Cartão</h1>
            <p>Controle financeiro integrado</p>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <Input
            autoComplete="email"
            error={errors.email?.message}
            label="E-mail"
            placeholder="admin@viacartao.com"
            type="email"
            {...register('email')}
          />
          <Input
            autoComplete="current-password"
            error={errors.senha?.message}
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            {...register('senha')}
          />

          <Button disabled={isSubmitting} icon={LogIn} type="submit">
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </section>
    </main>
  )
}

export default Login

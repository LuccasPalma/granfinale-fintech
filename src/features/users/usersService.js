import api from '../../lib/api'

export async function getUsers() {
  const response = await api.get('/usuarios')
  return response.data
}

export function createUser(data) {
  return api.post('/usuarios', data)
}

export function updateUser(id, data) {
  return api.put(`/usuarios/${id}`, data)
}

export function deleteUser(id) {
  return api.delete(`/usuarios/${id}`)
}

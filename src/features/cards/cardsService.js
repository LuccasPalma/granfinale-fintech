import api from '../../lib/api'

export async function getCards() {
  const response = await api.get('/cartoes')
  return response.data
}

export function createCard(data) {
  return api.post('/cartoes', data)
}

export function updateCard(id, data) {
  return api.put(`/cartoes/${id}`, data)
}

export function deleteCard(id) {
  return api.delete(`/cartoes/${id}`)
}

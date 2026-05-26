import api from '../../lib/api'

export async function getTransactions() {
  const response = await api.get('/transacoes')
  return response.data
}

export function createTransaction(data) {
  return api.post('/transacoes', data)
}

export function updateTransaction(id, data) {
  return api.put(`/transacoes/${id}`, data)
}

export function deleteTransaction(id) {
  return api.delete(`/transacoes/${id}`)
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0))
}

export function formatDate(value) {
  if (!value) return '-'

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatTransactionDay(value) {
  if (!value) return '-'

  return `Todo dia ${String(value).slice(8, 10)}`
}

export function toDateInputValue(value) {
  if (!value) return ''

  return String(value).slice(0, 10)
}

export function toDayInputValue(value) {
  if (!value) return ''

  return String(value).slice(8, 10)
}

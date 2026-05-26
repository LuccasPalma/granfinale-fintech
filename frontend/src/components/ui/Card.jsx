import clsx from 'clsx'

function Card({ children, className }) {
  return <section className={clsx('card', className)}>{children}</section>
}

export default Card

import clsx from 'clsx'

function Button({ children, className, icon: Icon, variant = 'primary', type = 'button', ...props }) {
  return (
    <button className={clsx('button', `button--${variant}`, className)} type={type} {...props}>
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  )
}

export default Button

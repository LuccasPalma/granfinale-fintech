function Select({ children, error, label, id, ...props }) {
  const inputId = id || props.name

  return (
    <label className="field" htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <select id={inputId} className="field__control" {...props}>
        {children}
      </select>
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}

export default Select

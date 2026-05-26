function StateMessage({ action, text, title }) {
  return (
    <div className="state-message">
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  )
}

export default StateMessage

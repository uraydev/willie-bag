export default value => {
  const date = new Date(2010, 0, 1)
  date.setSeconds(value)

  return new Intl.DateTimeFormat('en-US', {
    minute: 'numeric',
    second: 'numeric'
  }).format(date)
}

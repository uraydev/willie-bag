export default value => {
  const res = (value/10)
  return (res === Math.floor(res)) ? res : res.toFixed(1)
}

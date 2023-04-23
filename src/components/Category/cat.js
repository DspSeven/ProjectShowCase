const Category = props => {
  const {details} = props
  const {id, imageUrl, name} = details
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default Category

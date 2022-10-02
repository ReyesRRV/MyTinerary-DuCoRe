import '../styles/EditCity.css'

export default function Option(props) {
    const city = props.city

  return (
        <option className="Option-select">{city.city}</option>
  )
}

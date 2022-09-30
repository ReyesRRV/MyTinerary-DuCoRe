import '../styles/Input.css'

export default function Input(props) {
  let inputLabel = props.label
  let inputFor = props.for
  let inputType = props.type
  let inputValue = props.value

  return (
    <div className='Input-wrapper' key={inputLabel}>
      <label htmlFor={inputFor}>{inputLabel}</label>
      <input className="Input-input" type={inputType} id={inputFor} name={inputFor} ref={inputValue}></input>
    </div>
  )
}

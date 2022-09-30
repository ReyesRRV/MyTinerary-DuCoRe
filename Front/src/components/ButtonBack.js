import '../styles/ButtonBack.css'
import {Link as LinkRouter} from 'react-router-dom'

export default function ButtonBack(props) {
    let linkTo = props.linkTo
    let buttonText = props.buttonText
  return (
    <>    
      <LinkRouter className="ButtonBack" to={linkTo}>
        <span>{buttonText}</span>
      </LinkRouter>
    </>
  )
}
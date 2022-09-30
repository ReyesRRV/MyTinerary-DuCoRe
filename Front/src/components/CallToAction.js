import '../styles/CallToAction.css'
import {Link as LinkRouter} from 'react-router-dom'

export default function CallToAction(props) {
    let linkTo = props.linkTo
  return (
    <>    
      <LinkRouter className="CallToAction-button" to={linkTo}>
        <img height="24" width="24" src="/img/Logo.png" alt="logo"></img>
        <span>Find your next destination</span>
      </LinkRouter>
    </>
  )
}

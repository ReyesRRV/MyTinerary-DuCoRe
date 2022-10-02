import '../styles/Footer.css';
import {Link as LinkRouter } from 'react-router-dom'

export default function Footer() {
  const pages = [
    {name: 'Home', to: '/'},
    {name: 'Cities', to: '/cities'},
  ]

  const year = new Date();

  const link = (page) => <LinkRouter to={page.to} className='Footer-links-item' key={page.name}>{page.name}</LinkRouter>

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className='Footer-container'>
      <div className='Footer-top'>        
        <LinkRouter to='/'>
          <img className='Footer-logo' src='/img/Logo-nav.png' alt='logo'></img>
        </LinkRouter>
          <div className='Footer-links'>
              <nav>{pages.map(link)}</nav>
              <button className='Chevron' onClick={scrollUp}>
                <img src='/img/chevron-up.svg' alt='chevron'></img>
              </button>
          </div>
      </div>
      <div className='Footer-copy'>
        <p>© {year.getFullYear()} All rights reserved | Designed by <a target='_blank' href="https://www.linkedin.com/in/adriel-dussex-481052238/">Adriel Dussex</a>,
        <a target='_blank' href="https://www.linkedin.com/in/lucas-emiliano-cortes"> Lucas Cortes </a> and
        <a target='_blank' href="https://www.linkedin.com/in/richard-reyes-vidal-384269154/"> Richard Reyes</a></p>
      </div>
    </footer>    
  )
}

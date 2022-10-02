import '../styles/Hero.css'
import CallToAction from '../components/CallToAction'
import CitiesCarousel from '../components/CitiesCarousel'

export default function Hero() {
  return (
    <>    
      <div className="Hero-container">
          <div className='Hero-top'>
              <div className='Hero-text'>                    
                  <h1 className='Hero-title'>MyTinerary</h1>
                  <h2 className='Hero-slogan'>Find your perfect trip, designed by insiders who know and love their cities!</h2>
              </div>
              <CallToAction linkTo='cities'/>
          </div>
          <div className='Hero-bottom'>                
              <img src="/img/Logo.png" alt="logo-hero"></img>
          </div>
      </div>
      <CitiesCarousel />
    </>
  )
}
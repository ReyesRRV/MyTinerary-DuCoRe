import CityCard from '../components/CityCard'
import '../styles/Cities.css'
import { useRef, useState} from "react"
import { useSearchCitiesQuery } from '../features/citiesAPI'

export default function Cities() {
  const [searching, setSearching] = useState()
  const search = useRef("")
  const handleValue = () => {
    setSearching(search.current.value)
  }

  let { data: cities } = useSearchCitiesQuery(search.current ? search.current.value : "")

  return (
    <div className='Cities-container'>
      <h1>Cities</h1>
      <input className='Cities-input' type="search" placeholder='Search' ref={search} onChange={handleValue}/>
      <div className='Cities-card-container'>
        {cities?.map(CityCard)}
      </div>
    </div>
  )
}

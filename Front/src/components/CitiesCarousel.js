import '../styles/CitiesCarousel.css'
import Carousel from './Carousel'
import { useGetAllCitiesQuery } from '../features/citiesAPI'

export default function CitiesCarousel() {
    const { data : cities } = useGetAllCitiesQuery()

  return (
    <Carousel data={cities} range={4} slides={3} interval={4} />
  )
}

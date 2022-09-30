import '../styles/Carousel.css'
import '../styles/CarouselArrow.css'
import Arrow from './Arrow'
import {useEffect, useState} from 'react'
import {Link as LinkRouter} from 'react-router-dom'

export default function Carousel(props) {
    const range = props.range
    const limitSlides = (props.slides * range)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(start + range)
    const [intervalId, setIntervalId] = useState()
    const items = props.data
    const interval = props.interval * 1000

    const itemView = (item) => (
        <div className='CityCard-container' key={item.city}>
            <img src={item.photo} alt={item.city}/>
            <div className='CityCard-info'>
                <p>{item.city}</p>
                <p>{item.country}</p>
            </div>
            <div className='CityCard-details'>
                <LinkRouter to={`/cities/${item._id}`}>See more</LinkRouter>
            </div>
        </div>
    )

    useEffect( () => {
        let id = setInterval(function () {
            forward()
        }, interval)

        setIntervalId(id)

        return () => clearInterval(id)
    }, [start])

    function backward() {
        if (start >= range) {
            setStart( start - range )
            setEnd( end - range )
        } else {
            setStart(limitSlides-range)
            setEnd(limitSlides)
        }
        clearInterval(intervalId)
    }

    function forward() {
        if (start < limitSlides-range) {
            setStart( start + range )
            setEnd( end + range )
        } else {
            setStart(0)
            setEnd(range)
        }
        clearInterval(intervalId)
    }
    
    return (
        <div className='Carousel'>
            <h1>Popular MyTineraries</h1>
            <div className='Carousel-container'>
                <Arrow icon={"<"} click={backward}/>            
                <div className='Carousel-slide'>
                    { items?.slice(start, end).map(itemView) }
                </div>
                <Arrow icon={">"} click={forward}/>
            </div>
        </div>
    )
}

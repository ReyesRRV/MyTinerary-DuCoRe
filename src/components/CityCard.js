import '../styles/CityCard.css'
import {Link as LinkRouter} from 'react-router-dom'

export default function CityCard(props) {
    const item = props
    return (
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
}

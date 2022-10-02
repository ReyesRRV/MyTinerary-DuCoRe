import CityDetails from "../components/CityDetails"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
import apiurl from "../api"
import Itinerary from '../components/Itinerary'

function City() {
    const {id} = useParams()
    const [name, setName] = useState([]);

    useEffect(()=>{
        axios.get(`${apiurl}/cities/${id}`)
        .then(res => {setName(res.data.response)})
        .catch(err=>{
        })
    },[])


    return (  
        <div className="CitiesPage-main">
            <CityDetails data={name} cityId={id} />
            {/* <Itinerary data={name} /> */}
        </div>
    )
}


export default City
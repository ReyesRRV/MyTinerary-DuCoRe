import '../styles/Activities.css'
import { useGetAllActivitiesMutation } from '../features/activitiesAPI'
import { useEffect } from 'react';

export default function Activities(props) {
    let [getAllActivity, {data: activity}]= useGetAllActivitiesMutation()
    let activities = activity?.response

    useEffect(() => {
        getAllActivity(props.itineraryId);
    }, [props.itineraryId]);

    const activityView = (activity) => {
        return (
            <div className='Activity-card' key={activity.name} style={{backgroundImage:`url(${activity.photo})`, backgroundSize:"cover"}}>
                <p>{activity.name}</p>
            </div>
        )
    }

    return (
        <div className='Activities-container'>
            {activities?.map(activityView)}
        </div>
    )
}

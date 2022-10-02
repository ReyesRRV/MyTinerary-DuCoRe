import '../styles/Comments.css'
import { useState, useEffect } from 'react'
import { useGetItinerariesCommentsMutation } from '../features/commentsAPI';

export default function Comments(props) {
    let [getItinerariesComments, {data: comment}]= useGetItinerariesCommentsMutation()
    let comments = comment?.response

    useEffect(() => {
        getItinerariesComments(props.itineraryId);
    }, [props.itineraryId]);

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        open ?
            setOpen(false)
            : setOpen(true)
    }
    const commentView = (comment) => {
        return (
            <div className='Comment-card'>
                <div className='Comment-userPhoto'>
                    <div className='Comment-photo' style={{ backgroundImage: `url(${comment.user.photo})`, backgroundSize: "cover" }}></div>
                </div>
                <div className='Comment-description'>
                    <div className='Comment-user'>
                        <h3>{comment.user.name} {''} {comment.user.lastName}</h3>
                        <p>{comment.user.mail}</p>
                    </div>
                    <div className='Comment-info'>
                        <p>{comment.comment}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='Comments-container'>
            <button type="button" className='comments-button' onClick={handleOpen}>
                {open ? "Close " : ""}
                Comments
            </button>
            {open ?
                <div className='Comments-cards'>
                    {comments?.map(commentView)}
                </div>
                : null
            }
        </div>
    )
}

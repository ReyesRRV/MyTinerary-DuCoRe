import "../styles/Comments.css";
import { useState, useEffect, useRef } from "react";
import {
  useGetItinerariesCommentsMutation,
  useCreateCommentMutation,
  useEditCommentMutation,
} from "../features/commentsAPI";
import CommentsCard from "./CommentsCard";

export default function Comments(props) {
  let [getItinerariesComments, { data: comment }] =
    useGetItinerariesCommentsMutation();
  let [addNewCommentRedux, { data: resComment }] = useCreateCommentMutation();
  let [{data : resEditComment}] = useEditCommentMutation()
  let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""


  let resHook = resComment?.response;
  let arrayComments = comment?.response;
  let [openEdit, setOpenEdit] = useState(true);
  let [openNew, setOpenNew] = useState(false);
  let [comments, setComments] = useState("");
  let commentRef = useRef();

  useEffect(() => {
    if (comment?.success || resComment?.success) {
      setComments(comment.response);
    }
  }, [comment]);

  useEffect(() => {
    getItinerariesComments(props.itineraryId);
  }, [props.itineraryId]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  function openEditButton() {
    openEdit ? setOpenEdit(false) : setOpenEdit(true);
  }
  function delButton() {
    console.log("Borrar");
  }
  function editComment(e) {
    e.preventDefault();
    let id = commentRef.current.id;
    let idUser = JSON.parse(localStorage.getItem("user")).id;

    let dataComment = {
      comment: commentRef.current.value,
      user: idUser,
      itinerary: id,
    };
    console.log(dataComment);
    // editCommentRedux()
  }

  function openComment() {
    openNew ? setOpenNew(false) : setOpenNew(true);
  }
  function newComment(e) {
    e.preventDefault();
    let id = commentRef.current.id;
    let idUser = JSON.parse(localStorage.getItem("user")).id;

    let dataComment = {
      comment: commentRef.current.value,
      user: idUser,
      itinerary: id,
    };
    addNewCommentRedux(dataComment);
  }
  return (
    <div className="Comments-container">
      <button type="button" className="comments-button" onClick={handleOpen}>
        {open ? "Close " : ""}Comments
      </button>
      {open ? (
        <>
          <div className="Comments-cards">
            {comments?.map((e) => (
              <CommentsCard edit={addNewCommentRedux} data={e} key={e._id} />
            ))}
          </div>
          {user.role !== "" ?
          (<>
          <button className="comments-button" onClick={openComment}>
            ➕
          </button> 
          </>)
          : null}
          {openNew  ? (
            <form onSubmit={newComment}>
              <input
                className="Input-input"
                type="text"
                id={props.itineraryId}
                name="comment-input"
                ref={commentRef}
              ></input>
              <button className="Profile-buttonEdit">✔</button>
            </form>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

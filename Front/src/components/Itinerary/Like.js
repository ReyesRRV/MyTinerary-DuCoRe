import React, { useState, useEffect } from "react";
import { useLikeDislikeMutation } from "../../features/itineraryAPI";

export default function Like(props) {
  let [like, setLike] = useState(false);
  let [heart, setHeart] = useState();
  let [addLike, { data: res }] = useLikeDislikeMutation();
  let array = res?.response;
  let items = props.data.likes;
  let [likes, setLikes] = useState(items.length);
  let id = props.data._id;
  let idUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;

  useEffect(() => {
    items.includes(idUser) ? setHeart("🖤") : setHeart("🤍");
  }, []);

  useEffect(() => {
    like ? setLike(false) : setLike(true);
    if (res?.success) {
      setLikes(array.length);
      array.includes(idUser) ? setHeart("🖤") : setHeart("🤍");
    }
  }, [array]);

  function likeDislike() {
    addLike(id);
  }

  return (
    <>
      <div className="likeDislike">
        <div onClick={likeDislike}>
          {heart}
          <div className="like-counter"> {likes} </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../index";

export function AddPost() {
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();

  const addPostAction = () => {
    dispatch(addPost({ content: newPost }));

    setNewPost("");
  };

  return (
    <form className="w-11/12 m-8 relative">
      <label htmlFor="newPost"> </label>
      <textarea
        type="text"
        placeholder="What's on your mind?"
        className="p-2 w-full h-32 rounded-lg border-2 resize-none border-coolGray-300 focus:border-coolGray-500 focus:outline-none focus:ring-2 focus:ring-coolGray-500"
        id="newPost"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        maxLength="140"
      />
      <small
        className={
          newPost.length >= 120
            ? "text-red-500 absolute right-1 bottom-3 font-bold text-base"
            : "absolute right-1 bottom-3 text-base"
        }
      >
        {140 - newPost.length}
      </small>
      <button
        type="button"
        disabled={newPost ? false : true}
        className={
          newPost
            ? "text-white py-2 px-6 bg-blue-500 rounded-lg"
            : "text-white py-2 px-6 bg-blue-500 rounded-lg opacity-50 cursor-default"
        }
        onClick={addPostAction}
      >
        Add Post
      </button>
    </form>
  );
}

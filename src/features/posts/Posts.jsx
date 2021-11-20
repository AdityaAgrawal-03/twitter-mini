import { useSelector } from "react-redux";
import {
  selectToken,
  selectAllPosts,
  selectAllUsers,
  selectCurrentUser,
} from "../index";

export function Posts() {
  const token = useSelector(selectToken);
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);

  console.log({ posts });

  if (!posts.length) {
    return <div className="loader"></div>;
  }

  return (
    <div className="flex flex-col items-center">
      {posts &&
        posts.map((post) => (
          <div className="post-card" key={post._id}>
            <p className="font-bold"> {post?.user?.username} </p>
            <p> {post?.content} </p>
          </div>
        ))}
    </div>
  );
}

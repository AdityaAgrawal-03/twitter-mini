import { useSelector } from "react-redux";
import { selectAllPosts } from "../index";

export function Posts() {
  const posts = useSelector(selectAllPosts);

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

import { useSelector } from "react-redux";
import { selectAllPosts, selectFetchedUser } from "../index";

export function Posts() {
  const posts = useSelector(selectAllPosts);
  const fetchedUser = useSelector(selectFetchedUser);

  const sortedPosts = posts.filter(
    (post) =>
      fetchedUser?.following.includes(post?.user?._id) ||
      post?.user?._id === fetchedUser?._id
  );

  if (!posts.length) {
    return <div className="loader"></div>;
  }

  return (
    <div className="flex flex-col items-center">
      {sortedPosts &&
        sortedPosts.map((post) => (
          <div className="post-card" key={post._id}>
            <p className="font-bold"> {post?.user?.username} </p>
            <p> {post?.content} </p>
          </div>
        ))}
    </div>
  );
}

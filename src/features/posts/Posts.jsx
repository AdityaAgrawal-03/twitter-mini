import { useSelector } from "react-redux"
import { selectToken, selectAllPosts, selectAllUsers } from "../index"

export function Posts() {
  const token = useSelector(selectToken)
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);

  console.log({ posts });
  console.log({ users });

  return (
    <>
      <h1> Posts  </h1>
    </>
  )
}
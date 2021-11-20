import { useSelector } from "react-redux"
import { selectToken } from "../index"

export function Posts() {
  const token = useSelector(selectToken)
  return (
    <>
      <h1> Posts {token} </h1>
    </>
  )
}
import { Posts, AddPost, UsersSuggestion } from "../features/index";

export function Home() {
  return (
    <div className="flex min-w-full">
      <div className="flex flex-col w-1/2">
        <AddPost />
        <Posts />
      </div>
      <div className="w-1/2 mt-8">
        <UsersSuggestion />
      </div>
    </div>
  )
}

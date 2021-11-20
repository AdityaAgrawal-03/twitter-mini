import { useDispatch, useSelector } from "react-redux";
import {
  selectAllUsers,
  selectUserStatus,
  updateFollowingAndFollowers,
  selectFetchedUser,
} from "../index";

export function UsersSuggestion() {
  const userStatus = useSelector(selectUserStatus);
  const fetchedUser = useSelector(selectFetchedUser);
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const filteredUsers = users?.filter((user) => user?._id !== fetchedUser?._id);

  const updateFollowing = (targetUserId) => {
    dispatch(
      updateFollowingAndFollowers({
        username: fetchedUser?.username,
        target_userId: targetUserId,
      })
    );
  };

  return (
    <div>
      {userStatus === "success" ? (
        <>
          {filteredUsers.map((user) => (
            <div
              key={user?._id}
              className="flex bg-coolGray-50 p-4 w-1/2 ml-8 mt-2 justify-between"
            >
              <p> {user?.username} </p>
              <button
                className={
                  !fetchedUser?.following.includes(user?._id)
                    ? "bg-blue-500 text-white px-4 py-2"
                    : "bg-red-500 text-white px-4 py-2"
                }
                onClick={() => updateFollowing(user?._id)}
              >
                {!fetchedUser?.following.includes(user?._id) ? (
                  <> Follow </>
                ) : (
                  <> Unfollow </>
                )}
              </button>
            </div>
          ))}
        </>
      ) : (
        <div className="loader"> </div>
      )}
    </div>
  );
}

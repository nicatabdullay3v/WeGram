import { useEffect, useState } from "react"
import { AppDispatch, RootState } from "../../../redux/store"
import "./RecomendedUsers.scss"
import { useDispatch, useSelector } from "react-redux"
import { getAllData, getUserById } from "../../../redux/Slices/usersSlice"
import { useNavigate } from "react-router-dom"

const RecomendedUsers = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const allUsers = useSelector((state: RootState) => state.users.users)
    const LocalUser = useSelector((state: RootState) => state.users.user)
    const LocalUserID = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    useEffect(() => {

        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))
    }, [])

    const uniqueSecondLevelFollowings = Array.from(
        new Set(
            LocalUser?.followings
                .map((following: { _id: string }) =>
                    allUsers
                        .find((user) => user._id === following._id)
                        ?.followings.map((secondLevelFollowing: { _id: string }) => secondLevelFollowing._id)
                )
                .flat()
                .filter((id) => id !== undefined)
        )
    );

    const filteredSecondLevelFollowings = uniqueSecondLevelFollowings.filter(
        (userId) => !LocalUser?.followings.some((following: { _id: string }) => following._id === userId)
    );





    return (
        <>
            <aside id="recomended_users">
                <div className="title">
                    <p>Recomend for you</p>
                </div>
                {filteredSecondLevelFollowings.length <3 ? <li>There was no recomended users</li> : filteredSecondLevelFollowings?.map((userId) => {
                    const recUser = allUsers.find((x) => x._id == userId)
                    if (recUser?.username) {
                        return <div onClick={() => {
                            navigate(`/home/${userId}`)
                        }} className="user" key={userId}>
                            <div className="user-info">
                                <div className="user_picture">
                                    <img style={{borderRadius:"50%"}} src={`http://localhost:3001/profilePictures/${recUser?.profilePicture}`} alt="" />
                                </div>
                                <div className="user_username">
                                    {recUser?.username}
                                </div>
                            </div>
                        </div>

                    }

                })}
                { }

            </aside>
        </>
    )
}

export default RecomendedUsers
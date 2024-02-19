import "./MyFollowers.scss"
import { useEffect, useState } from "react"
import { AppDispatch, RootState } from "../../../redux/store"
import "./MyFollowers.scss"
import { useDispatch, useSelector } from "react-redux"
import { getAllData, getUserById } from "../../../redux/Slices/usersSlice"
import { useNavigate } from "react-router-dom"
const MyFollowers = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const allUsers = useSelector((state: RootState) => state.users.users)
    const LocalUser = useSelector((state: RootState) => state.users.user)
    const LocalUserID = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    useEffect(() => {

        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))
    }, [])
    return (
        <aside id="my_followers">
            <div className="title">
                <p>My Followers</p>
            </div>
            {LocalUser?.followers.map((elem: { _id: string }) => {
                const myfollower = allUsers.find((x: { _id: string }) => x._id == elem._id)
                if (myfollower?.username) {
                    return <div onClick={() => {
                        navigate(`/home/${elem._id}`)
                    }} className="user" key={elem._id}>
                        <div className="user-info">
                            <div className="user_picture">
                                <img style={{borderRadius:"50%"}} src={`http://localhost:3001/profilePictures/${myfollower?.profilePicture}`} alt="" />
                            </div>
                            <div className="user_username">
                                {myfollower?.username}
                            </div>
                        </div>
                    </div>
                }
            })}

        </aside>
    )
}

export default MyFollowers
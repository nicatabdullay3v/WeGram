import { useDispatch, useSelector } from "react-redux"
import { getAllData, getUserById } from "./../../redux/Slices/usersSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { IoMdPersonAdd } from "react-icons/io";
import "./Detail.scss"
import { Decode } from "../Home/Home"
import { TbLock } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Users } from "../../interfaces/UsersInterface"
import NavBar from "../../components/NavBar/NavBar"
import { jwtDecode } from "jwt-decode";
import { WiTime9 } from "react-icons/wi";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import RecomendedUsers from "../../components/Home/RecomendedUsers/RecomendedUsers";
const Detail = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    const LocalUser = useSelector((state: RootState) => state.users.user)

    useEffect(() => {
        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))

    }, [])
    const user = users.find((x) => x._id == id)
    const findID = user?.followers.find((x: { _id: string }) => x._id == LocalUserID)
    const findrequest = user?.requests.find((x: { _id: string }) => x._id == LocalUserID)

    return (
        <>
            <NavBar />

            <div id="user_profile">

                <div className="container">
                    <div className="user_profile">
                        <div className="user_profile_up">

                            <div className="user_profile_back_img">
                                <div className="user_profile_picture">
                                    <img src={user?.profilePicture} alt="" />
                                </div>
                                <img src="https://pitnik.wpkixx.com/pitnik/images/resources/profile-image.jpg" alt="" />
                            </div>
                            <ul className="user_profile_up_about">
                                <li>{user?.username}</li>
                                <li>Vidios</li>
                                <li>Photos</li>
                                <li>History</li>
                                <li>Followers <sup>{user?.followers.length}</sup></li>
                                <li>Followings <sup>{user?.followings.length}</sup></li>

                                {findID == undefined && findrequest == undefined ?
                                    <button>
                                        <IoMdPersonAdd onClick={() => {
                                            axios.defaults.withCredentials = true;
                                            if (user?.isPublic) {
                                                if (findID == undefined) {
                                                    axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                                        withCredentials: true,
                                                        followers: [...user.followers, { _id: LocalUserID }]
                                                    }).then(() => {
                                                        alert("artirildim ayqam ayqam")

                                                        dispatch(getAllData())
                                                    })
                                                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                        withCredentials: true,
                                                        followings: [...LocalUser?.followings!, { _id: user?._id }]
                                                    })
                                                }
                                            }
                                            else {
                                                axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                                    withCredentials: true,
                                                    requests: [...user?.requests!, { _id: LocalUserID }]

                                                }).then(() => {
                                                    alert("request gonderildi")
                                                    dispatch(getAllData())
                                                })
                                            }
                                        }} className="add_icon" /></button> : findrequest != undefined ?
                                        <>
                                            <button >
                                                <WiTime9 onClick={() => {
                                                    axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                                        requests: user?.requests.filter((x: { _id: string }) => x._id != LocalUserID)
                                                    }).then(() => {
                                                        alert("request qaytarildi")
                                                        dispatch(getAllData())
                                                    })
                                                }} className="add_icon" />
                                            </button>
                                        </> : <button className="unfollow" >
                                            <AiOutlineUserDelete style={{ backgroundColor: "red" }} className="add_icon" onClick={() => {
                                                axios.defaults.withCredentials = true;
                                                axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                                    withCredentials: true,
                                                    followers: user?.followers.filter((x: { _id: string }) => x._id != LocalUserID)
                                                }).then(() => {
                                                    alert("cixdian ayqam")
                                                    dispatch(getAllData())
                                                })
                                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                    withCredentials: true,
                                                    followings: LocalUser?.followings.filter((x: { _id: string }) => x._id != user?._id)
                                                })
                                            }} />
                                        </button>}
                            </ul>
                        </div>
                        <div className="user_profile_down">
                            <RecomendedUsers />

                            <div className="posts">
                                <div className="posts_length">
                                    <p>Posts <sup>
                                        {user?.posts.length}
                                    </sup></p>
                                </div>
                                <div className="post-cards">
                                    {user?.isPublic || findID ? user?.posts.map((elem: any) => {
                                        return <div key={elem._id} className="post_card">
                                            <div className="post">
                                                <img src={`http://localhost:3001/${elem.img}`} alt="" />
                                            </div>
                                        </div>
                                    }) : null}
                                    {user?.isPublic == false && findID == undefined ? <div className="private"><TbLock className="icon" /><p>PRIVATE</p></div> : null}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail


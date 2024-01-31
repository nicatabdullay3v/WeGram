import { useDispatch, useSelector } from "react-redux"
import { getAllData } from "./../../redux/Slices/usersSlice"
import { AppDispatch,RootState } from "../../redux/store"
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
const Detail = () => {
const navigate = useNavigate()
    const [localUser, setuser] = useState<Users | undefined>();
    const { id } = useParams()
    const token: any = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    useEffect(() => {
        if (token) {
            const decoded: Decode = jwtDecode(token);
            const userData: any = decoded.findUser
            setuser(userData);
        }
        if (token) {
        }
        else {
            navigate("/")

        }
        dispatch(getAllData())
    }, [])
    const user = users.find((x) => x._id == id)
    const LocalUser = users.find((x) => x._id == localUser?._id)
    const findID = user?.followers.find((x: { _id: string }) => x._id == localUser?._id)
    const findrequest = user?.requests.find((x: { _id: string }) => x._id == localUser?._id)

    return (
        <>
            <NavBar />
            {user && <div className="user_profile">
                <div className="profile_up">
                    <div className="profile_up_img_name">
                        <div className="profile_up_img">
                            <img src={user.img} alt="" />
                        </div>
                        <div className="profile_name">
                            <p>{user.name}</p>
                        </div>
                        <div className="profile_bio">
                            <p>salam men eldaram</p>
                        </div>
                    </div>
                    <div className="profile_up_posts_followers_followings_follow">
                        <div className="profile_up_posts count">
                            <p>{user.posts.length}</p>
                            <span>posts</span>
                        </div>
                        <div className="profile_up_followers count">
                            <p>{user.followers.length}</p>
                            <span>followers</span>
                        </div>
                        <div className="profile_up_followings count">
                            <p>{user.followings.length}</p>
                            <span>followings</span>
                        </div>
                        <div className="profile_up_follow count">
                            {findID == undefined && findrequest == undefined ?
                                <button>
                                    <IoMdPersonAdd onClick={() => {
                                        if (user.isPublic) {
                                            if (findID == undefined) {
                                                axios.patch(`http://localhost:3001/users/${user._id}`, {
                                                    followers: [...user.followers, { _id: localUser?._id }]
                                                }).then(() => {
                                                    alert("artirildim ayqam ayqam")

                                                    dispatch(getAllData())
                                                })
                                                axios.patch(`http://localhost:3001/users/${localUser?._id}`, {
                                                    followings: [...LocalUser?.followings!, { _id: user?._id }]
                                                })
                                            }
                                        }
                                        else {
                                            axios.patch(`http://localhost:3001/users/${user._id}`, {
                                                requests: [...user?.requests, { _id: localUser?._id }]

                                            }).then(() => {
                                                alert("request gonderildi")
                                                dispatch(getAllData())
                                            })
                                        }
                                    }} className="add_icon" /></button> : findrequest != undefined ?
                                    <>
                                        <button >
                                            <WiTime9 onClick={() => {
                                                axios.patch(`http://localhost:3001/users/${user?._id}`, {
                                                    requests: user?.requests.filter((x: { _id: string }) => x._id != localUser?._id)
                                                }).then(() => {
                                                    alert("request qaytarildi")
                                                    dispatch(getAllData())
                                                })
                                            }} className="add_icon" />
                                        </button>
                                    </> : <button className="unfollow" >
                                        <AiOutlineUserDelete style={{ backgroundColor: "red" }} className="add_icon" onClick={() => {
                                            axios.patch(`http://localhost:3001/users/${user._id}`, {
                                                followers: user.followers.filter((x: { _id: string }) => x._id != localUser?._id)
                                            }).then(() => {
                                                alert("cixdian ayqam")
                                                dispatch(getAllData())
                                            })
                                            axios.patch(`http://localhost:3001/users/${localUser?._id}`, {
                                                followings: LocalUser?.followings.filter((x: { _id: string }) => x._id != user?._id)
                                            })
                                        }} />
                                    </button>}
                        </div>
                    </div>

                </div>
                <div className="user_posts">
                    {user.isPublic|| findID ? user.posts.map((elem: any) => {
                        return <div key={elem._id} className="post_card">
                            <div className="post">
                                <img src={`http://localhost:3001/${elem.img}`} alt="" />
                            </div>
                        </div>
                    }) :null}
                </div>
                {user.isPublic == false && findID == undefined ? <div className="private"><TbLock className="icon" /><p>PRIVATE</p></div>:null}
            </div>}
        </>
    )
}

export default Detail

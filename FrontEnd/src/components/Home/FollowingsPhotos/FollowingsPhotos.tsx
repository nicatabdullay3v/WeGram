"use client"
import { useDispatch, useSelector } from "react-redux"
import { getAllData } from "../../../redux/Slices/usersSlice"
import "./FollowingsPhotos.scss"
import { AppDispatch, RootState } from "../../../redux/store"
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react"
import { Users } from "../../../interfaces/UsersInterface";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Decode } from "../../../pages/Home/Home";
import { jwtDecode } from "jwt-decode";
import { FaRegShareSquare } from "react-icons/fa";
import SideBar from "../SideBar/SideBar"
import RecomendedUsers from "../RecomendedUsers/RecomendedUsers"
import axios from "axios"
const FollowingsPhotos = () => {
    const [heartCount, setHeartCount] = useState(0);

    const dispatch = useDispatch<AppDispatch>()
    const [user, setuser] = useState<Users | undefined>();
    const token: any = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const users = useSelector((state: RootState) => state.users.users)
    useEffect(() => {
        if (token) {
            const decoded: Decode = jwtDecode(token);
            const userData: any = decoded.findUser
            setuser(userData);
        }
        dispatch(getAllData())
    }, [])
    const LocalUser = users?.find((x) => x._id == user?._id)
    // SortAll Posts-=-=-=-==-=-=--=-=-=
    const allPosts: { img: File; time: string; userId: string; id: string; likes: [] }[] = [];
    users.forEach((followingUser) => {
        if (LocalUser?.followings.find((elem: { _id: string }) => elem._id === followingUser._id)) {
            allPosts.push(
                ...followingUser.posts.map((post: { img: File; time: string; id: string, likes: [] }) => ({
                    ...post,
                    userId: followingUser._id,
                }))
            );
        }
    });
    const sortedPosts = allPosts.slice().sort((a, b) => {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
    // HandleLike-=-=-=-=-=-=-=-=-=-=-=-=-
    const like = (followingUser: Users, element: { img: File; time: string; userId: string, id: string; likes: [] }) => {
        const findIndex = followingUser.posts.findIndex((x: { id: string }) => x.id == element.id)
        setHeartCount(6); // You can adjust the number of hearts to display
        setTimeout(() => setHeartCount(0), 1000);
        axios.patch(`http://localhost:3001/users/${followingUser._id}/posts/${element.id}`, {
            likes: [...followingUser.posts[findIndex].likes, { _id: LocalUser?._id }]
        }).then(() => {
            dispatch(getAllData())
        })
    }
    const unLike = (followingUser: Users, element: { img: File; time: string; userId: string, id: string; likes: [] }) => {
        const findIndex = followingUser.posts.findIndex((x: { id: string }) => x.id == element.id)
        axios.patch(`http://localhost:3001/users/${followingUser._id}/posts/${element.id}`, {
            likes: followingUser.posts[findIndex].likes.filter((x: { _id: string }) => x._id != LocalUser?._id)
        }).then(() => {
            dispatch(getAllData())
        })
    }
    return (
        <section id='followings_photos'>
            <div className="container">
                <SideBar />
                <div className="followings_photos">
                    <div className="followings_photos">
                        {sortedPosts.map((element: { img: File; time: string; userId: string, id: string; likes: [] }) => {
                            const followingUser = users.find((u) => u._id === element.userId);
                            return followingUser ? (
                                <div key={element.id} className="card" >
                                    <div className="card_up">
                                        <div className="card_up_profile_img">
                                            <img src={followingUser.img} alt="" />
                                        </div>
                                        <div className="card_up_name">
                                            <span>{followingUser.name}</span>
                                        </div>
                                    </div>
                                    <div className="card_center">
                                        <div className="card_post">
                                            <img src={`http://localhost:3001/${element.img}`} alt="" />
                                        </div>
                                    </div>
                                    <div className="card_down">
                                        <div className="card_like_comment_share">
                                            <div className="like">
                                                {followingUser.posts[followingUser.posts.findIndex((x: { id: string }) => x.id == element.id)].likes.find((x: { _id: string }) => x._id == LocalUser?._id) == undefined ? <CiHeart className={`post-like ${heartCount > 0 ? 'hidden' : ''}`} onClick={() => {
                                                    like(followingUser, element)
                                                }} /> : <FaHeart className="post-like" style={{ color: "red", fontSize: "24px", marginLeft: "5px", marginBottom: "5px" }} onClick={() => {
                                                    unLike(followingUser, element)
                                                }} />
                                                }
                                                <div className="likes-count">
                                                    <span>
                                                        {followingUser.posts[followingUser.posts.findIndex((x: { id: string }) => x.id == element.id)].likes.length}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="comment">
                                                <FaRegComment />
                                            </div>
                                            <div className="share">
                                                <FaRegShareSquare />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>

                <RecomendedUsers />
            </div>
        </section>
    )
}

export default FollowingsPhotos
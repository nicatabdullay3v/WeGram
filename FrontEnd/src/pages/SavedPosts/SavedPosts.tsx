import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import "./SavedPosts.scss"
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import { FaBookmark, FaComment, FaHeart } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { HiHeart } from "react-icons/hi2";
import { BsHeart } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { useNavigate } from "react-router-dom";
const SavedPosts = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const LocalUser = useSelector((state: RootState) => state.users.user)
    const users = useSelector((state: RootState) => state.users.users)

    const LocalUserID = JSON.parse(localStorage.getItem("user-info") || "{}")._id;
    useEffect(() => {

        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))


    }, [])

    return (
        <>
            <NavBar />
            <div className="saved_posts">
                {LocalUser?.wishList.map((item: { userId: string, postId: string }) => {
                    const post_user = users?.find((x) => x._id == item.userId)
                    const post = post_user?.posts.find((x) => x.id == item.postId)
                    return <>
                        <div className="post_card">
                            <div className="post_card_up">
                                <div style={{ cursor: "pointer" }} onClick={() => {
                                    navigate(`/home/${post_user?._id}`)
                                }} className="post_user">
                                    <div className="post_user_img">
                                        <img src={post_user?.profilePicture} alt="" />
                                    </div>
                                    <div className="post_user_name">
                                        <p>{post_user?.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="post_card_center">
                                <div className="post">
                                    <img src={`http://localhost:3001/${post?.img}`} alt="" />
                                </div>
                            </div>
                            <div className="post_card_down">
                                <div className="like_comment_save">
                                    <div className="like">
                                        {post?.likes.find((x: { _id: string }) => x._id == LocalUserID) ?

                                            <FaHeart onClick={() => {
                                                axios.patch(`http://localhost:3001/api/users/${post_user?._id}/posts/${post?.id}`, {
                                                    likes: post.likes.filter((x: { _id: string }) => x._id != LocalUserID)
                                                }).then(() => {
                                                    dispatch(getAllData())
                                                    dispatch(getUserById(LocalUserID))
                                                })
                                            }} style={{ color: "red", cursor: "pointer" }} /> :
                                            <BsHeart style={{ cursor: "pointer" }} onClick={() => {
                                                axios.patch(`http://localhost:3001/api/users/${post_user?._id}/posts/${post?.id}`, {
                                                    likes: [...post?.likes!, { _id: LocalUserID }]
                                                }).then(() => {
                                                    dispatch(getAllData())
                                                    dispatch(getUserById(LocalUserID))
                                                })
                                            }} />}
                                        <sub>{post?.likes.length}</sub>

                                    </div>
                                    <div style={{ cursor: "pointer" }} className="save">
                                        <FaBookmark onClick={() => {
                                            axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                wishList: LocalUser.wishList.filter((x: { postId: string }) => x.postId != post?.id)
                                            }).then(() => {
                                                console.log();

                                                dispatch(getAllData())
                                                dispatch(getUserById(LocalUserID))
                                            })
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                })}
            </div>
        </>
    )
}

export default SavedPosts
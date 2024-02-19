import { useDispatch, useSelector } from "react-redux"
import { getAllData, getUserById } from "./../../redux/Slices/usersSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { IoMdPersonAdd } from "react-icons/io";
import "./Detail.scss"
import Swal from 'sweetalert2'
import { TbLock } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import NavBar from "../../components/NavBar/NavBar"
import { WiTime9 } from "react-icons/wi";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import RecomendedUsers from "../../components/Home/RecomendedUsers/RecomendedUsers";
import { GoBlocked } from "react-icons/go";
import { FaBookmark, FaComment, FaHeart } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";
import { BsHeart, BsX } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { IoSettings } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
const Detail = () => {

    const navigate = useNavigate()
    const [openModal, setopenModal] = useState(false)
    const [DetailPost, setDetailPost] = useState<any>()
    const [sett, setSett] = useState(false)
    const [backinput, setbackinput] = useState("")
    const [reply, setreply] = useState('')
    const [followersModal, setfollowersModal] = useState(false)
    const [blockListModal, setblockListModal] = useState(false)
    const [followingsModal, setFollowingsModal] = useState(false)
    const [replyModal, setreplyModal] = useState(false)
    const [comment, setcomment] = useState('')
    const [commentAll, setcommentAll] = useState<any>()
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    const LocalUser = useSelector((state: RootState) => state.users.user)
    const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    const user = users.find((x) => x._id == id)
    const findID = user?.followers.find((x: { _id: string }) => x._id == LocalUserID)
    const findrequest = user?.requests.find((x: { _id: string }) => x._id == LocalUserID)
    const findBlockUser = LocalUser?.blockList.find((x: { _id: string }) => x._id == user?._id)
    const findIfIBlock = user?.blockList.find((x: { _id: string }) => x._id == LocalUserID)

    if (id == "undefined") {
        navigate("/profile")

    }

    useEffect(() => {
        if (findIfIBlock) {
            navigate("/home")
        }

        console.log("salam");

        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))

    }, [])

    return (
        <>
            <NavBar />
            <div id="user_profile">
                <ToastContainer />

                {openModal ? <div className="post_modal">
                    <BsX className="postx" style={{ cursor: "pointer" }} onClick={() => {
                        setopenModal(false)

                    }} />

                    <div className="post_modal_left">
                        <div className="post">
                            {user?.posts.find((x) => x.id == DetailPost.id)?.img.toString().includes("mp4") ?
                                <video controls width="100%" >
                                    <source src={`http://localhost:3001/${user?.posts.find((x) => x.id == DetailPost.id)?.img}`} type="video/mp4" />
                                </video> : <img src={`http://localhost:3001/${user?.posts.find((x) => x.id == DetailPost.id)?.img}`} alt="" />}
                        </div>
                        <p style={{ marginTop: "20px" }}>
                            {DetailPost?.title != "Default Title" ? DetailPost?.title : null}

                        </p>
                        <div className="post_modal_down">
                            {user?.posts.find((x) => x.id == DetailPost.id)?.likes.find((x: { _id: string }) => x._id == LocalUserID) ? <div onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${user?._id}/posts/${DetailPost.id}`, {
                                    likes: user?.posts.find((x) => x.id == DetailPost.id)!.likes.filter((x: { _id: string }) => x._id != LocalUserID)
                                }).then(() => {

                                    dispatch(getUserById(LocalUserID))
                                    dispatch(getAllData())
                                })
                            }} className="post_heart">
                                <HiHeart style={{ color: "red", fontSize: "26px" }} className="icon" /> <sub>{user?.posts.find((x) => x.id == DetailPost.id)?.likes.length}</sub>
                            </div> : <div onClick={() => {
                                console.log(DetailPost);

                                axios.patch(`http://localhost:3001/api/users/${user?._id}/posts/${DetailPost.id}`, {
                                    likes: [...user?.posts.find((x) => x.id == DetailPost.id)?.likes!, { _id: LocalUserID }]
                                }).then(() => {
                                    dispatch(getUserById(LocalUserID))

                                    dispatch(getAllData())


                                })
                            }} className="post_heart">
                                <BsHeart className="icon" /> <sub>{user?.posts.find((x) => x.id == DetailPost.id)?.likes.length}</sub>
                            </div>}
                            {LocalUser?.wishList.find((x: { postId: string }) => x.postId == DetailPost.id) ?
                                <FaBookmark style={{ marginBottom: "15px", fontSize: "20px",cursor:"pointer" }} onClick={() => {
                                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                        wishList: LocalUser?.wishList.filter((x: { postId: string }) => x.postId != DetailPost.id)
                                    }).then(() => {
                                        dispatch(getAllData())
                                        dispatch(getUserById(LocalUserID))
                                    })
                                }} /> : <FiBookmark onClick={() => {
                                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                        wishList: [...LocalUser?.wishList!, {
                                            postId: DetailPost.id,
                                            userId: id
                                        }]
                                    }).then(() => {
                                        dispatch(getAllData())
                                        dispatch(getUserById(LocalUserID))
                                    })
                                }} style={{ marginBottom: "15px", fontSize: "20px",cursor:"pointer" }} />}


                        </div>
                    </div>     <div className="post_modal_right">
                        <div className="post_comments">
                            {replyModal ? <div className="reply">
                                <div>
                                    <div style={{ textAlign: "end" }} className="user_comment">
                                        <BsX style={{ cursor: "pointer" }} onClick={() => {
                                            setreplyModal(false)

                                        }} />

                                        {commentAll.replys.map((x: { reply: string, _id: string }) => {
                                            const replyUser = users.find((z) => z._id == x._id)
                                            return <div style={{ textAlign: "start" }} className="user_replys">
                                                <div className="user">
                                                    <div className="user_picture">
                                                        <img src={replyUser?.profilePicture ? replyUser?.profilePicture : LocalUser?.profilePicture} alt="" />
                                                    </div>
                                                    <div className="user_name">
                                                        <p>
                                                            {replyUser?.username ? replyUser.username : LocalUser?.username}:
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="replyy">{x.reply}</p>

                                            </div>


                                        })}
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <div>           <input onChange={(e) => {
                                    setreply(e.target.value)
                                }} type="text" /><span><button onClick={() => {
                                    axios.patch(`http://localhost:3001/api/users/${user?._id}/posts/${DetailPost.id}/comments/${commentAll.commentID}`, {
                                        comment: commentAll.comment,
                                        commentID: commentAll.commentID,
                                        _id: commentAll._id,
                                        replys: [...commentAll?.replys, { reply: reply, _id: LocalUserID, replyID: uuidv4() }]

                                    }).then(() => {
                                        dispatch(getAllData())
                                        dispatch(getUserById(LocalUserID))
                                        setreply('')
                                        setreplyModal(false)
                                    })
                                }}>send</button></span></div>
                            </div> : null}

                            {user?.posts.find((x) => x.id == DetailPost.id)?.comments.map((x: { comment: string, _id: string, commentID: string, replys: any }) => {
                                const commentUser = users.find((z) => z._id == x._id)
                                return <div>
                                    <div className="user">
                                        <div className="user_picture">
                                            <img src={commentUser?.profilePicture ? commentUser.profilePicture : LocalUser?.profilePicture} alt="" />
                                        </div>
                                        <div className="user_name">
                                            <p>{commentUser?.username ? commentUser?.username : LocalUser?.username}</p>
                                        </div>

                                    </div>
                                    <div className="user_comment">
                                        <p className="comment">{x.comment}</p>
                                    </div>
                                    <button style={{ marginBottom: "10px", color: "white", fontWeight: "700" }} onClick={() => {
                                        setcommentAll(x)
                                        setreplyModal(true)
                                    }}>more...</button>
                                </div>
                            })}
                        </div>

                        <div className="posts_comments_down">
                            <input value={comment} onChange={(e) => {
                                setcomment(e.target.value)
                            }} type="text" />
                            <button onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${user?._id}/posts/${DetailPost.id}`, {
                                    comments: [...user?.posts.find((x) => x.id == DetailPost.id)?.comments!, { _id: LocalUserID, commentID: uuidv4(), replys: [], comment: comment }]
                                }).then(() => {
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                    setcomment('')

                                })
                            }}>send</button>
                        </div>
                    </div>
                </div> : null}
                {blockListModal ? <div className="followings_modal">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="title">
                            <p>BlockList</p>
                        </div>
                        <BsX onClick={() => {
                            setblockListModal(false)
                        }} style={{ fontSize: "22px", cursor: "pointer" }} />
                    </div>
                    {user?.blockList.map((x: { _id: string }) => {

                        const following = users.find((z) => z._id == x._id)
                        return <div style={{ cursor: "pointer" }} onClick={() => {
                            navigate(`/home/${following?._id}`)
                            setblockListModal(false)

                        }} className="following">

                            <div className="following_picture">
                                <img src={following?.profilePicture ? following?.profilePicture : LocalUser?.profilePicture} alt="" />

                            </div>
                            <div className="following_name">
                                <p>{following?.username ? following.username : LocalUser?.username}</p>

                            </div>

                        </div>
                    })}
                </div> : null}
                {followersModal ? <div className="followings_modal">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="title">
                            <p>Followers</p>
                        </div>
                        <BsX onClick={() => {
                            setfollowersModal(false)
                        }} style={{ fontSize: "22px", cursor: "pointer" }} />
                    </div>
                    {user?.followers.map((x: { _id: string }) => {

                        const following = users.find((z) => z._id == x._id)
                        return <div style={{ cursor: "pointer" }} onClick={() => {
                            navigate(`/home/${following?._id}`)
                            setfollowersModal(false)

                        }} className="following">

                            <div className="following_picture">
                                <img src={following?.profilePicture ? following?.profilePicture : LocalUser?.profilePicture} alt="" />
                            </div>
                            <div className="following_name">
                                <p>{following?.username ? following.username : LocalUser?.username}</p>
                            </div>

                        </div>
                    })}
                </div> : null}
                {followingsModal ? <div className="followings_modal">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="title">
                            <p>Followings</p>
                        </div>
                        <BsX onClick={() => {
                            setFollowingsModal(false)
                        }} style={{ fontSize: "22px", cursor: "pointer" }} />
                    </div>
                    {user?.followings.map((x: { _id: string }) => {

                        const following = users.find((z) => z._id == x._id)
                        return <div style={{ cursor: "pointer" }} onClick={() => {
                            navigate(`/home/${following?._id}`)
                            setFollowingsModal(false)

                        }} className="following">

                            <div className="following_picture">
                                <img src={following?.profilePicture ? following?.profilePicture : LocalUser?.profilePicture} alt="" />

                            </div>
                            <div className="following_name">
                                <p>{following?.username ? following.username : LocalUser?.username}</p>

                            </div>

                        </div>
                    })}
                </div> : null}
                <div className="container">
                    <div className="user_profile">
                        <div className="user_profile_up">

                            <div className="user_profile_back_img">
                                <div className="user_profile_picture">
                                    <img src={user?.profilePicture} alt="" />
                                </div>
                                <img src={user?.backGroundPicture} alt="" />

                            </div>
                            <ul className="user_profile_up_about">
                                <li>{user?.username}</li>
                                <li style={{ cursor: "pointer" }} onClick={() => {
                                    setfollowersModal(true)
                                }}>Followers <sup>{user?.followers.length}</sup></li>
                                <li style={{ cursor: "pointer" }} onClick={() => {
                                    setFollowingsModal(true)
                                }}>Followings <sup>{user?.followings.length}</sup></li>
                                <li style={{ cursor: "pointer" }} onClick={() => {
                                    setblockListModal(true)
                                }}>BlockList <sup>{user?.blockList.length}</sup></li>

                                {!findBlockUser ? <div>
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
                                                            toast.success('artirildin', {
                                                                position: "top-center",
                                                                autoClose: 2000,
                                                                hideProgressBar: false,
                                                                closeOnClick: true,
                                                                pauseOnHover: true,
                                                                draggable: true,
                                                                progress: undefined,
                                                                theme: "light",
                                                            });

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
                                                        toast.success('request gonderildi', {
                                                            position: "top-center",
                                                            autoClose: 2000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "light",
                                                        });
                                                        dispatch(getAllData())
                                                    })
                                                }
                                            }} className="add_icon" />
                                        </button> : findrequest != undefined ?
                                            <>
                                                <button >
                                                    <WiTime9 onClick={() => {
                                                        axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                                            requests: user?.requests.filter((x: { _id: string }) => x._id != LocalUserID)
                                                        }).then(() => {
                                                            toast.success('request silindi', {
                                                                position: "top-center",
                                                                autoClose: 2000,
                                                                hideProgressBar: false,
                                                                closeOnClick: true,
                                                                pauseOnHover: true,
                                                                draggable: true,
                                                                progress: undefined,
                                                                theme: "light",
                                                            });
                                                            dispatch(getAllData())
                                                        })
                                                    }} className="add_icon" />
                                                </button>
                                            </> : <button style={{ backgroundColor: "red" }} className="unfollow" >
                                                <AiOutlineUserDelete className="add_icon" onClick={() => {
                                                    axios.defaults.withCredentials = true;
                                                    axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                                        withCredentials: true,
                                                        followers: user?.followers.filter((x: { _id: string }) => x._id != LocalUserID)
                                                    }).then(() => {
                                                        toast.success('cixarildin', {
                                                            position: "top-center",
                                                            autoClose: 2000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "light",
                                                        });
                                                        dispatch(getAllData())
                                                    })
                                                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                        withCredentials: true,
                                                        followings: LocalUser?.followings.filter((x: { _id: string }) => x._id != user?._id)
                                                    })
                                                }} />
                                            </button>}
                                </div> : null}
                                <GoBlocked style={{ backgroundColor: LocalUser?.blockList.find((x: { _id: string }) => x._id == user?._id) ? "red" : "black" }} onClick={() => {
                                    if (findBlockUser) {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                    blockList: LocalUser?.blockList.filter((x: { _id: string }) => x._id != user?._id)
                                                }).then(() => {
                                                    dispatch(getUserById(LocalUserID))
                                                    dispatch(getAllData())
                                                    Swal.fire({
                                                        title: "Deleted from block-list",
                                                        icon: "success"
                                                    });
                                                })

                                            }
                                        });
                                    }
                                    else {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                    blockList: [...LocalUser?.blockList!, { _id: user?._id }],
                                                    followings: LocalUser?.followings.filter((x: { _id: string }) => x._id != user?._id),
                                                    followers: LocalUser?.followers.filter((x: { _id: string }) => x._id != user?._id),

                                                }).then(() => {
                                                    dispatch(getUserById(LocalUserID))
                                                    dispatch(getAllData())
                                                    Swal.fire({
                                                        title: "Add to block-list",
                                                        icon: "success"
                                                    });
                                                })
                                                axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                                    followers: user?.followers.filter((x: { _id: string }) => x._id != LocalUserID),
                                                    followings: user?.followings.filter((x: { _id: string }) => x._id != LocalUserID)
                                                }).then(() => {
                                                    dispatch(getUserById(LocalUserID))
                                                    dispatch(getAllData())
                                                })
                                            }
                                        });

                                    }

                                }} className="block" />
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
                                {/* {user?.posts.length! <= 0 || !findID ? <div style={{ fontSize: "40px" }}>no picture yet</div> : null} */}
                                {findBlockUser ? null : <div className="post-cards">
                                    {user?.isPublic || findID ? user?.posts.map((elem: any) => {
                                        return <div key={elem._id} className="post_card">
                                            <div onClick={() => {
                                                setopenModal(true)
                                                setDetailPost(elem)
                                            }} className="post">
                                                <div className="icons">
                                                    <FaHeart className="icon" />

                                                    <span>{elem.likes.length}</span>

                                                    <FaComment className="icon" />

                                                    <span>{elem.comments.length}</span>

                                                </div>
                                                {elem.img.includes("mp4") ?
                                                    <video width="100%" >
                                                        <source src={`http://localhost:3001/${elem.img}`} type="video/mp4" />
                                                    </video> : <img src={`http://localhost:3001/${elem.img}`} alt="" />}
                                            </div>
                                        </div>

                                    }) : null}
                                    {user?.isPublic == false && findID == undefined ? <div className="private"><TbLock className="icon" /><p>PRIVATE</p></div> : null}

                                </div>}
                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}

export default Detail


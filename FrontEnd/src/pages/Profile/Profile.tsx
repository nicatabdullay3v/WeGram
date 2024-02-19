import "./Profile.scss"
import NavBar from "../../components/NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react"
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import 'cookie-store';
import RecomendedUsers from "../../components/Home/RecomendedUsers/RecomendedUsers";
import { FaComment, FaTrash } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";
import { BsHeart, BsX } from "react-icons/bs";
import { Users } from "../../interfaces/UsersInterface";
import Swal from 'sweetalert2'
import { IoSettings } from "react-icons/io5";
import { PiDotsThree } from "react-icons/pi";
import { FaDeleteLeft, FaX } from "react-icons/fa6";
const Profile = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [stories, setstories] = useState(false)
    const [title, setTitle] = useState("")
    const [storiesModal, setstoriesModal] = useState(false)
    const [comment, setcomment] = useState('')
    const [backinput, setbackinput] = useState("")
    const [replyComment, setreplyComment] = useState("")
    const [replyCommentUsername, setreplyCommentUsername] = useState('')
    const [replyModal, setreplyModal] = useState(false)
    const [blockListModal, setblockListModal] = useState(false)
    const [postId, setpostId] = useState('')
    const [reply, setreply] = useState('')
    const [CommentUser, setCommentUser] = useState<Users>()
    const [likes, setlikes] = useState([])
    const [postModal, setpostModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    const [followersModal, setfollowersModal] = useState(false)
    const [followingsModal, setFollowingsModal] = useState(false)
    const [sett, setSett] = useState(false)
    const [AxiosComment, setAxiosComment] = useState<any>()
    const [file, setFile] = useState<File | undefined>()
    const dispatch = useDispatch<AppDispatch>()
    const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    const user = useSelector((state: RootState) => state.users.user)
    const users = useSelector((state: RootState) => state.users.users)
    useEffect(() => {

        if (localStorage.getItem("user-info")) {
        }
        else {
            navigate("/")
        }
        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))
    }, [])


    console.log(user);
    const handleStoryUpload = () => {
        if (!file) {
            console.error("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', uuidv4());
        formData.append('title', title);

        axios.patch(`http://localhost:3001/api/users/${LocalUserID}/addStory`, formData)
            .then((res) => {
                dispatch(getUserById(LocalUserID));
                setstoriesModal(false);
            })
            .catch((error) => {
                console.error("Error uploading story:", error);
            });

        setTitle("");
        setFile(undefined);
    };

    const handleUpload = () => {
        if (!file) {
            console.error("Please select a file");
            return;
        }
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('id', uuidv4());
        formdata.append('title', title);
        formdata.append('likes', JSON.stringify(likes));
        axios.patch(`http://localhost:3001/api/users/${LocalUserID}/addPostImage`, formdata)
            .then((res) => {
                dispatch(getUserById(LocalUserID))
            })
            .catch((error) => {
                console.error("Error uploading post:", error);
            });

        setModal(false)
        setTitle("")
        setFile(undefined)
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = user?.posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const detailPost = user?.posts.find((x) => x.id == postId)
    return (
        <>
            <NavBar />

            <div id="user_profile">
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
                                <img src={following?.profilePicture} alt="" />
                            </div>
                            <div className="following_name">
                                <p>{following?.username}</p>
                            </div>

                        </div>
                    })}
                </div> : null}
                {followersModal ? <div className="followings_modal">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="title">
                            <p>My Followers</p>
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
                                <img src={following?.profilePicture} alt="" />
                            </div>
                            <div className="following_name">
                                <p>{following?.username}</p>
                            </div>

                        </div>
                    })}
                </div> : null}
                {followingsModal ? <div className="followings_modal">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="title">
                            <p>My Followings</p>
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
                                <img src={following?.profilePicture} alt="" />
                            </div>
                            <div className="following_name">
                                <p>{following?.username}</p>
                            </div>

                        </div>
                    })}
                </div> : null}
                {postModal ? <div className="post_modal">
                    <BsX className="postx" style={{ cursor: "pointer" }} onClick={() => {
                        setpostModal(false)

                    }} />
                    <AiFillDelete onClick={() => {
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
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                                axios.delete(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}`).then(() => {
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                    setpostModal(false)
                                })
                            }
                        });

                    }} style={{ color: "red", cursor: "pointer" }} className="post_dots" />
                    <div className="post_modal_left">
                        <div className="post">
                            {detailPost?.img.toString().includes("mp4") ?
                                <video controls width="100%" height="100%">
                                    <source src={`http://localhost:3001/${detailPost?.img}`} type="video/mp4" />
                                </video> : <img src={`http://localhost:3001/${detailPost?.img}`} alt="" />}
                        </div>
                        <p style={{ marginTop: "20px" }}>
                            {detailPost?.title != "Default Title" ? detailPost?.title : null}

                        </p>
                        <div className="post_modal_down">

                            {detailPost?.likes.find((x: { _id: string }) => x._id == LocalUserID) ? <div onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}`, {
                                    likes: detailPost.likes.filter((x: { _id: string }) => x._id != LocalUserID)
                                }).then(() => {
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                })
                            }} className="post_heart">
                                <HiHeart style={{ color: "red", fontSize: "26px" }} className="icon" /> <sub>{detailPost.likes.length}</sub>
                            </div> : <div onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}`, {
                                    likes: [...detailPost?.likes!, { _id: user?._id }]
                                }).then(() => {
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                })
                            }} className="post_heart">
                                <BsHeart className="icon" /> <sub>{detailPost?.likes.length}</sub>
                            </div>}
                        </div>
                    </div>
                    <div className="post_modal_right">
                        <div className="post_comments">
                            {replyModal ? <div className="reply">

                                <div>
                                    <div style={{ textAlign: "end" }} className="user_comment">
                                        <BsX style={{ cursor: "pointer" }} onClick={() => {
                                            setreplyModal(false)

                                        }} />

                                        {AxiosComment.replys.map((x: { reply: string, _id: string }) => {
                                            const replyUser = users.find((z) => z._id == x._id)
                                            return <div style={{ textAlign: "start" }} className="user_replys">
                                                <div className="user">
                                                    <div className="user_picture">
                                                        <img src={replyUser?.profilePicture ? replyUser?.profilePicture : user?.profilePicture} alt="" />
                                                    </div>
                                                    <div className="user_name">
                                                        <p>
                                                            {replyUser?.username ? replyUser.username : user?.username}:
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
                                <div>           <input value={reply} onChange={(e) => {
                                    setreply(e.target.value)
                                }} type="text" /><span><button onClick={() => {
                                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}/comments/${AxiosComment.commentID}`, {
                                        comment: AxiosComment.comment,
                                        commentID: AxiosComment.commentID,
                                        _id: AxiosComment._id,
                                        replys: [...AxiosComment?.replys, { reply: reply, _id: LocalUserID, replyID: uuidv4() }]

                                    }).then(() => {
                                        dispatch(getAllData())
                                        dispatch(getUserById(LocalUserID))
                                        setreply('')
                                        setreplyModal(false)
                                    })
                                }}>send</button></span></div>
                            </div> : null}
                            {detailPost?.comments.map((x: { comment: string, _id: string, replys: any }) => {
                                const commentUser = users.find((z) => z._id == x._id)
                                return <div className="user_comments">
                                    <div className="user">
                                        <div className="user_picture">
                                            <img src={commentUser?.username ? commentUser?.profilePicture : user?.profilePicture} alt="" />

                                        </div>
                                        <div className="user_name">
                                            <p> {commentUser?.username ? commentUser?.username : user?.username} :</p>
                                        </div>

                                    </div>
                                    <div className="comment">
                                        <p>{x.comment}</p>
                                    </div>
                                    <button onClick={() => {
                                        setreplyComment(x.comment)
                                        setreplyCommentUsername(commentUser?.username!)
                                        setreplyModal(true)
                                        setAxiosComment(x)
                                        setCommentUser(commentUser)

                                    }}>more...</button>
                                </div>
                            })}

                        </div>
                        <div className="posts_comments_down">
                            <input value={comment} onChange={(e) => {
                                setcomment(e.target.value)
                            }} type="text" />
                            <button onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}`, {
                                    comments: [...detailPost?.comments!, { _id: LocalUserID, commentID: uuidv4(), replys: [], comment: comment }]
                                }).then(() => {
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                    setcomment('')
                                })
                            }}>send</button>
                        </div>
                    </div>
                </div> : null}
                {stories ? <div className="stories">
                    <FaX onClick={() => {
                        setstories(false)
                    }} className="icon" />
                    {user?.stories.map((item: { img: string ,id:string}) => {
                        return <div className="storie">
                            <div className="storie_img">
                                <img src={`http://localhost:3001/${item.img}`} alt="" />
                            </div>
                        <FaTrash onClick={()=>{
                            axios.delete(`http://localhost:3001/api/users/${LocalUserID}/stories/${item.id}`).then(()=>{
                                dispatch(getAllData())
                                dispatch(getUserById(LocalUserID))
                            })
                        }} className="trash_icon"/>

                        </div>
                    })}
                </div> : null}
                {modal ? <div className="modal">
                    <div style={{ textAlign: 'end' }} className="close">
                        <AiOutlineClose onClick={() => {
                            setModal(false)
                        }} style={{ fontSize: "25px", cursor: "pointer", color: "purple" }} />

                    </div>
                    <div className="file-input-container">
                        <input
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            type="file"
                            id="fileInput"
                            className="input-file"
                        />
                        <label htmlFor="fileInput" className="file-label">
                            Choose a File
                        </label>
                        {file && <p>Selected File: {file.name}</p>}
                    </div>
                    <div className="file_title">
                        <input onChange={(e) => {
                            setTitle(e.target.value)
                        }} type="text" className="file-input-text" placeholder="Enter file title" />
                    </div>
                    <button onClick={handleUpload} className="add_button">Add Post</button>
                </div> : null}
                {storiesModal ? <div className="modal">
                    <div style={{ textAlign: 'end' }} className="close">
                        <AiOutlineClose onClick={() => {
                            setstoriesModal(false)
                        }} style={{ fontSize: "25px", cursor: "pointer", color: "purple" }} />

                    </div>
                    <div className="file-input-container">
                        <input
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            type="file"
                            id="fileInput"
                            className="input-file"
                        />
                        <label htmlFor="fileInput" className="file-label">
                            Choose a File
                        </label>
                        {file && <p>Selected File: {file.name}</p>}
                    </div>
                    <div className="file_title">
                        <input onChange={(e) => {
                            setTitle(e.target.value)
                        }} type="text" className="file-input-text" placeholder="Enter file title" />
                    </div>
                    <button onClick={handleStoryUpload} className="add_button">Add story</button>
                </div> : null}
                <div className="container">
                    <div className="user_profile">
                        <div className="user_profile_up">

                            <div className="user_profile_back_img">
                                <div className="user_profile_picture">
                                    <img src={user?.profilePicture} alt="" />
                                </div>
                                <IoSettings onClick={() => {
                                    setSett(sett === true ? false : true)
                                }} style={{ position: "absolute", top: "20px", right: "20px", fontSize: "22px", color: "white", cursor: "pointer" }} />
                                {sett ? <div className="backGroundSettings">
                                    <input placeholder="Set new photo url" onChange={(e) => {
                                        setbackinput(e.target.value)
                                    }} type="text" />
                                    <button onClick={() => {
                                        axios.patch(`http://localhost:3001/api/users/${user?._id}`, {
                                            backGroundPicture: backinput
                                        }).then(() => {
                                            dispatch(getAllData())
                                            dispatch(getUserById(LocalUserID))
                                            setbackinput('')
                                            setSett(false)
                                        })
                                    }} >set</button>
                                </div> : null}
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

                                <li style={{ width: "400px" }}> <p style={{ fontWeight: "700", fontSize: "20px", backgroundColor: "lightgrey", width: "100%", padding: "5px", borderRadius: "6px", paddingLeft: "20px" }}>{user?.bio}</p></li>
                            </ul>
                        </div>
                        <div className="user_profile_down">
                            <RecomendedUsers />

                            <div className="posts">
                                <div style={{display:"flex",flexWrap:"wrap"}} className="posts_length">
                                    <p style={{ cursor: "pointer" }} onClick={() => {
                                        setstories(true)
                                    }}>Stories <sup>
                                            {user?.stories.length}
                                        </sup></p>
                                    <p>Posts <sup>
                                        {user?.posts.length}
                                    </sup></p>
                                    <p className="add" onClick={() => {
                                        setModal(true)
                                    }}>add new post</p>
                                    <p className="add" onClick={() => {
                                        setstoriesModal(true)
                                    }}>add new storie</p>
                                </div>
                                <div className="post-cards">
                                    {currentPosts?.map((elem: any) => {
                                        return <div onClick={() => {
                                            setpostModal(true)
                                            setpostId(elem.id)

                                        }} key={elem._id} className="post_card">
                                            <div className="post">
                                                {elem.img.includes("mp4") ?
                                                    <video width="100%" >
                                                        <source src={`http://localhost:3001/${elem.img}`} type="video/mp4" />
                                                    </video> : <img src={`http://localhost:3001/${elem.img}`} alt="" />}
                                            </div>
                                            <div>
                                                <div className="heart"> <HiHeart className="icon" /> <p>{elem.likes.length}</p></div>
                                                <div className="comment"> <FaComment className="icon" /><p>{elem.comments.length}</p></div>
                                            </div>

                                        </div>

                                    })}
                                </div>

                                <Pagination
                                    style={{ position: "static", backgroundColor: "white" }}
                                    count={Math.ceil(user?.posts.length! / postsPerPage)}
                                    page={currentPage}
                                    onChange={(_, page) => paginate(page)}
                                    variant="outlined"
                                    shape="rounded"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile




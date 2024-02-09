import "./Profile.scss"
import NavBar from "../../components/NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import 'cookie-store';
import RecomendedUsers from "../../components/Home/RecomendedUsers/RecomendedUsers";
import { FaComment } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";
import { BsHeart } from "react-icons/bs";
const Profile = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState("")
    const [comment, setcomment] = useState('')
    const [postId, setpostId] = useState('')
    const [likes, setlikes] = useState([])
    const [postModal, setpostModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
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
                {postModal ? <div className="post_modal">
                    <div className="post_modal_left">
                        <div className="post">
                            <img src={`http://localhost:3001/${detailPost?.img}`} alt="" />
                        </div>
                        <div className="post_modal_down">
                            {detailPost?.likes.find((x: { _id: string }) => x._id == LocalUserID) ? <div onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}`, {
                                    likes: detailPost.likes.filter((x: { _id: string }) => x._id != LocalUserID)
                                }).then(() => {
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                })
                            }} className="post_heart">
                                <HiHeart style={{ color: "red", fontSize: "26px" }} className="icon" />
                            </div> : <div onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}`, {
                                    likes: [...detailPost?.likes!, { _id: user?._id }]
                                }).then(() => {
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                })
                            }} className="post_heart">
                                <BsHeart className="icon" />
                            </div>}
                        </div>
                    </div>
                    <div className="post_modal_right">
                        <div className="post_comments">
                            {detailPost?.comments.map((x: { comment: string, _id: string }) => {
                                const commentUser = users.find((z) => z._id == x._id)
                                return <li>{commentUser?.username ? commentUser?.username : user?.username}: {x.comment}</li>
                            })}

                        </div>
                        <div className="posts_comments_down">
                            <input value={comment} onChange={(e) => {
                                setcomment(e.target.value)
                            }} type="text" />
                            <button onClick={() => {
                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}/posts/${postId}`, {
                                    comments: [...detailPost?.comments!, { _id: LocalUserID, commentID: uuidv4(), replys: [], comment: comment }]
                                }).then(()=>{
                                    dispatch(getAllData())
                                    dispatch(getUserById(LocalUserID))
                                    setcomment('')
                                })
                            }}>send</button>
                        </div>
                    </div>
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
                            </ul>
                        </div>
                        <div className="user_profile_down">
                            <RecomendedUsers />

                            <div className="posts">
                                <div className="posts_length">
                                    <p>Posts <sup>
                                        {user?.posts.length}
                                    </sup></p>
                                    <p className="add" onClick={() => {
                                        setModal(true)
                                    }}>add new post</p>
                                </div>
                                <div className="post-cards">
                                    {currentPosts?.map((elem: any) => {
                                        return <div onClick={() => {
                                            setpostModal(true)
                                            setpostId(elem.id)

                                        }} key={elem._id} className="post_card">
                                            <div className="post">
                                                <img src={`http://localhost:3001/${elem.img}`} alt="" />
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




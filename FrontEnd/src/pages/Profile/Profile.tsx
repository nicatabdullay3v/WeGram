"use client"
import "./Profile.scss"
import { Decode } from "../Home/Home";
import { Users } from "./../../interfaces/UsersInterface"
import NavBar from "../../components/NavBar/NavBar"
import { jwtDecode } from "jwt-decode";
import { FaRegPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { getAllData } from "../../redux/Slices/usersSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState("")
    const [localUser, setuser] = useState<Users | undefined>();
    const [likes, setlikes] = useState([])
    const [file, setFile] = useState<File | undefined>()
    const token: any = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)    
    useEffect(() => {
        if (token) {
            const decoded: Decode = jwtDecode(token);
            const userData: any = decoded.findUser
            setuser(userData)
        }
        if (token) {
        }
        else {
            navigate("/")
        }
        dispatch(getAllData())
    }, [])
    const LocalUser = users.find((x) => x._id == localUser?._id)
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
        axios.patch(`http://localhost:3001/users/${localUser?._id}/addPostImage`, formdata)
            .then((res) => {
                console.log(res.data);
                dispatch(getAllData());
            })
            .catch((error) => {
                console.error("Error uploading post:", error);
            });
        setModal(false)
        setTitle("")
        setFile(undefined)
    }
    return (
        <>
            <NavBar />
            {LocalUser &&
                <div className="user_profile">
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
                        <button onClick={handleUpload} className="add-button">Add Post</button>
                    </div> : null}
                    <div className="profile_up">
                        <div className="profile_up_img_name">
                            <div className="profile_up_img">
                                <img src={LocalUser?.img} alt="" />
                            </div>
                            <div className="profile_name">
                                <p>{LocalUser.name}</p>
                            </div>
                            <div className="add_photo response2">
                                <FaRegPlusSquare onClick={() => {
                                    setModal(true)
                                }} className="icon" />
                                <br />
                                new post
                            </div>

                        </div>
                        <div className="profile_up_posts_followers_followings_follow">
                            <div className="profile_up_posts count">
                                <p>{LocalUser.posts.length}</p>
                                <span>posts</span>
                            </div>
                            <div className="profile_up_followers count">
                                <p>{LocalUser.followers.length}</p>
                                <span>followers</span>
                            </div>
                            <div className="profile_up_followings count">
                                <p>{LocalUser.followings.length}</p>
                                <span>followings</span>
                            </div>
                            <div className="add_photo response1">
                                <FaRegPlusSquare onClick={() => {
                                    setModal(true)
                                }} className="icon" />
                                <br />
                                new post
                            </div>
                        </div>
                    </div>
                    
                    <div className="profile_bio">
                            <p>salam men eldaram</p>
                        </div>
                    <div className="add_post">
                    </div>
                    <div className="user_posts">
                        {LocalUser.posts.map((elem: any) => {
                            return <div className="post_card">
                                <div className="post">
                                    <img src={`http://localhost:3001/${elem.img}`} alt="" />
                                </div>
                            </div>
                        })}
                    </div>
                </div>}
        </>
    )
}

export default Profile
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
import RecomendedUsers from "../../components/Home/RecomendedUsers/RecomendedUsers";
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
            <div id="user_profile">
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
                                    <img src={LocalUser?.img} alt="" />
                                </div>
                                <img src="https://pitnik.wpkixx.com/pitnik/images/resources/profile-image.jpg" alt="" />
                            </div>
                            <ul className="user_profile_up_about">
                                <li>{LocalUser?.name} {LocalUser?.username}</li>
                                <li>Vidios</li>
                                <li>Photos</li>
                                <li>History</li>
                                <li>Followers <sup>{LocalUser?.followers.length}</sup></li>
                                <li>Followings <sup>{LocalUser?.followings.length}</sup></li>
                            </ul>
                        </div>
                        <div className="user_profile_down">
                            <RecomendedUsers />

                            <div className="posts">
                                <div className="posts_length">
                                    <p>Posts <sup>
                                        {LocalUser?.posts.length}
                                    </sup></p>
                                    <p className="add" onClick={() => {
                                        setModal(true)
                                    }}>add new post</p>
                                </div>
                                <div className="post-cards">
                                    {LocalUser?.posts.map((elem: any) => {
                                        return <div className="post_card">
                                            <div className="post">
                                                <img src={`http://localhost:3001/${elem.img}`} alt="" />
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile




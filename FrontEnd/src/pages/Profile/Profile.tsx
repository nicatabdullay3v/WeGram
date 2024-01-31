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
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
    const navigate = useNavigate()
    const [localUser, setuser] = useState<Users | undefined>();
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
    const handleUpload = ()=>{
        const formdata = new FormData();
        file && formdata.append('file', file);
        axios.patch(`http://localhost:3001/users/${localUser?._id}/addPostImage`, formdata).then((res) => {
          console.log(res.data);
          dispatch(getAllData());
        });
        
    }
    return (
        <>
            <NavBar />
            {LocalUser && <div className="user_profile">
                <div className="profile_up">
                    <div className="profile_up_img_name">
                        <div className="profile_up_img">
                            <img src={LocalUser?.img} alt="" />
                        </div>
                        <div className="profile_name">
                            <p>{LocalUser.name}</p>
                        </div>
                        <div className="profile_bio">
                            <p>salam men eldaram</p>
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
                    </div>
                </div>
                <div className="add_post">
                    <FaRegPlusSquare onClick={handleUpload} className="icon" />
                    <input onChange={(e) => e.target.files && setFile(e.target.files[0])} type="file" />
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
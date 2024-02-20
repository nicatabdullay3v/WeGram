import "./NavBar.scss"
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { GrLanguage, GrUserAdmin } from "react-icons/gr";
import { Users } from "../../interfaces/UsersInterface";
import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell, FaRegHeart } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoChatboxOutline } from "react-icons/io5";
import SideBar from "../Home/SideBar/SideBar";
import { FiBookmark } from "react-icons/fi";

import axios from "axios";
const NavBar: React.FC = () => {
    const [close, setClose] = useState<boolean>(false)
    const [openRequest, setOpenRequest] = useState(false)
    const [filteredData, setFilteredData] = useState<Users[]>([])
    const [inputValue, setInputValue] = useState("")
    const [searchOpen, setSearchOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const users = useSelector((state: RootState) => state.users.users)
    const user = useSelector((state: RootState) => state.users.user)

    const LocalUserID = JSON.parse(localStorage.getItem("user-info") || "{}")._id;
    const CurrentLocalUser = JSON.parse(localStorage.getItem("user-info") || "{}")


    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))

    }, []);
    useEffect(() => {
        setFilteredData(inputValue.trim() == "" ? [] : users.filter((x) => {
            return x.username.trim().toLowerCase().includes(inputValue.trim().toLowerCase()) && x.username != user?.username
        }))
    }, [users, inputValue])
        ;

    const LocalUser = users?.find((x) => x._id === LocalUserID);



    return (
        <nav>
            <SideBar close={close} setClose={setClose} />
            {/* <SettingsBar close={close} setClose={setClose} /> */}
            <div className="container">
                <div className="nav">

                    <div style={{ cursor: "pointer" }} onClick={() => {
                        navigate('/home')
                    }} className="nav_logo">
                        <span>WeGram</span>
                    </div>
                    <div className="nav_center">
                        <div style={{ borderRadius: searchOpen ? "20px 20px 0px 0px" : "10px" }} className="nav_search">
                            <input onChange={(e) => {
                                setInputValue(e.target.value)
                            }} onBlur={() => {
                                setTimeout(() => {
                                    setSearchOpen(false)
                                }, 300);
                            }} onFocus={() => {
                                setSearchOpen(true)
                            }} placeholder="Search..." type="text" />
                            <div className="icon">
                                <BsSearch />
                            </div>
                            {searchOpen ? <div className="nav_search_down">

                                {filteredData.map((elem) => {
                                    const findIfIBlock = elem?.blockList.find((x: { _id: string }) => x._id == LocalUserID)
                                    if (findIfIBlock) {

                                    }
                                    else {
                                        return <div key={elem._id} onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            navigate(`/home/${elem._id}`)
                                        }} className="user">
                                            <div className="users_profile_img">
                                                <img src={`http://localhost:3001/profilePictures/${elem?.profilePicture}`} alt="" />
                                            </div>
                                            <div className="users_name">
                                                {elem.username}
                                            </div>
                                        </div>
                                    }

                                })}
                            </div> : null}
                        </div>
                        <div className="profile_tab">
                            <p>
                                PORFILE TABS
                            </p>
                        </div>
                        <div className="sections">
                            <IoHomeOutline onClick={() => {
                                navigate('/home')
                            }} className="icon" />
                        </div>
                        <div className="sections">
                            <IoChatboxOutline onClick={() => {
                                navigate('/chat')
                            }} className="icon" />
                        </div>
                        <div className="sections">
                            <FaRegBell style={{ cursor: "pointer" }} onClick={() => {
                                setOpenRequest(openRequest == false ? true : false)
                            }} className="icon" />
                            <div className="length">
                        <p>{user?.requests.length}</p>
                            </div>
                        </div>
                        <div className="sections">
                            <FiBookmark onClick={() => {
                                navigate('/savedposts')
                            }} className="icon" />
                        </div>

                        {CurrentLocalUser.Admin === true ? <div style={{ cursor: "pointer" }} className="sections">
                            <GrUserAdmin onClick={() => {
                                navigate('/admin')
                            }} className="icon" />
                        </div> : null}
                    </div>
                    <ul className="nav_right">
                        <div className="profile">
                            <div className="profile_picture">
                                <img src={`http://localhost:3001/profilePictures/${user?.profilePicture}`} alt="" />
                            </div>
                            <div className="profile_name">
                                <p>{user?.username}</p>
                            </div>
                        </div>
                        <div className="requets">
                            {openRequest ? <div className="requests_box">
                                {user?.requests.map((x: { _id: string }) => {


                                    return users.filter((elem) => elem._id == x._id).map((element) => {
                                        return <>
                                            <div className="user">
                                                <div className="user_picture">
                                                    <img style={{borderRadius:"50%"}} src={`http://localhost:3001/profilePictures/${element?.profilePicture}`} alt="" />
                                                </div>
                                                <div className="user_name">
                                                    <p>{element.username}</p>
                                                </div>


                                            </div>
                                            <li style={{ marginTop: "10px", marginBottom: "20px" }}>{element.username} wanna be your friend <button onClick={() => {
                                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                    followers: [...user.followers, { _id: element._id }],
                                                    requests: user.requests.filter((x: { _id: string }) => x._id != element._id)
                                                }).then(() => {
                                                    dispatch(getAllData())
                                                    dispatch(getUserById(LocalUserID))
                                                })
                                                axios.patch(`http://localhost:3001/api/users/${element._id}`, {
                                                    followings: [...element.followings, { _id: user._id }]
                                                }).then(() => {
                                                    dispatch(getAllData())
                                                    dispatch(getUserById(LocalUserID))
                                                })
                                            }}>accept</button><button onClick={() => {
                                                axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                                                    requests: user.requests.filter((x: { _id: string }) => x._id != element._id)
                                                }).then(() => {
                                                    dispatch(getAllData())
                                                    dispatch(getUserById(LocalUserID))
                                                })
                                            }}>delete</button> </li>
                                        </>
                                    })
                                })}
                            </div> : null}
                        </div>

                        <p style={{ marginLeft: "40px" }}>
                            <GiHamburgerMenu className="responsive_side_bar" onClick={() => {
                                setClose(close ? false : true)
                            }} style={{ fontSize: "25px", cursor: "pointer", color: "white" }} />
                        </p>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
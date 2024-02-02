import { jwtDecode } from "jwt-decode";
import { Decode } from "../../pages/Home/Home";
import "./NavBar.scss"
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../redux/Slices/usersSlice";
import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { GrLanguage } from "react-icons/gr";
import { Users } from "../../interfaces/UsersInterface";
import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoChatboxOutline } from "react-icons/io5";
import SettingsBar from "../SetiingsBar/SettingsBar";
import SideBar from "../Home/SideBar/SideBar";
const NavBar: React.FC = () => {
    const [close, setClose] = useState<boolean>(false)
    const [openRequest, setOpenRequest] = useState(false)
    const [filteredData, setFilteredData] = useState<Users[]>([])
    const [inputValue, setInputValue] = useState("")
    const [searchOpen, setSearchOpen] = useState(false)
    const [user, setuser] = useState<Users | undefined>();
    const token: any = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            const decoded: Decode = jwtDecode(token);
            const userData: any = decoded.findUser
            setuser(userData);
        }
        dispatch(getAllData())
    }, []);
    useEffect(() => {
        setFilteredData(inputValue.trim() == "" ? [] : users.filter((x) => {
            return x.name.trim().toLowerCase().includes(inputValue.trim().toLowerCase()) && x.name != user?.name
        }))
    }, [users, inputValue])
    const LocalUser = users?.find((x) => x._id == user?._id)
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
                            }} placeholder="Search" type="text" />
                            <div className="icon">
                                <BsSearch />
                            </div>
                            {searchOpen ? <div className="nav_search_down">
                                {filteredData.map((elem) => {
                                    return <div key={elem._id} onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        navigate(`/home/${elem._id}`)
                                    }} className="user">
                                        <div className="users_profile_img">
                                            <img src={elem.img} alt="" />
                                        </div>
                                        <div className="users_name">
                                            {elem.name}
                                        </div>
                                    </div>
                                })}
                            </div> : null}
                        </div>
                        <div className="profile_tab">
                            <p>
                                PORFILE TABS
                            </p>
                        </div>
                        <div className="sections">
                            <IoHomeOutline className="icon" />
                        </div>
                        <div className="sections">
                            <IoChatboxOutline className="icon" />
                        </div>
                        <div className="sections">
                            <FaRegBell className="icon" />
                        </div>

                        <div className="sections">
                            <HiOutlineUsers className="icon" />
                        </div>

                        <div className="sections">
                            <GrLanguage className="icon" />
                        </div>
                    </div>
                    <ul className="nav_right">
                        <div className="profile">
                            <div className="profile_picture">
                                <img src={LocalUser?.img} alt="" />
                            </div>
                            <div className="profile_name">
                                <p>{LocalUser?.name}</p>
                            </div>
                        </div>
                        <div className="requets">
                            {openRequest ? <div className="requests_box">

                            </div> : null}
                            {/* <FaRegHeart className="heart_icon" onClick={() => {
                                setOpenRequest(openRequest == false ? true : false)
                            }} style={{ width: "40px", cursor: "pointer" }} />
                            <span className="request_count">{LocalUser?.requests.length}</span> */}
                        </div>
                        {/* <p style={{ marginLeft: "40px" }}>
                            <GiHamburgerMenu className="setting_icon" onClick={() => {
                                setClose(true)
                            }} style={{ fontSize: "25px", cursor: "pointer" }} />
                        </p> */}
                        <p style={{ marginLeft: "40px" }}>
                            <GiHamburgerMenu className="responsive_side_bar" onClick={() => {
                                setClose(close?false:true)
                            }} style={{ fontSize: "25px", cursor: "pointer",color:"white" }} />
                        </p>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
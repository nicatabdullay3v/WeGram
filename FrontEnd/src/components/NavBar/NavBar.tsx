"use client"
import { LiaWeebly } from "react-icons/lia";
import { jwtDecode } from "jwt-decode";
import { Decode } from "../../pages/Home/Home"; 
import "./NavBar.scss"
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../redux/Slices/usersSlice";
import { BsSearch } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { AppDispatch,RootState } from "../../redux/store";
import { Users } from "../../interfaces/UsersInterface";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
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
        setFilteredData(inputValue.trim() == "" ? [] : users.filter((x) =>{
           return  x.name.trim().toLowerCase().includes(inputValue.trim().toLowerCase()) &&  x.name != user?.name
        } ))
    }, [users, inputValue])
    const LocalUser = users?.find((x)=>x._id == user?._id)
    return (
        <nav>
            <div className="container">
                <div className="nav">
                    <div style={{cursor:"pointer"}} onClick={()=>{
                        navigate('/home')
                    }} className="nav_logo">
                        <LiaWeebly className="logo" />
                        <span>eGram</span>
                    </div>
                    <div style={{ borderRadius: searchOpen ? "20px 20px 0px 0px" : "40px" }} className="nav_search">
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

                    <ul className="nav_right">
                      <div onClick={()=>{
                      }} style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} className="info">
                      </div>
                       <div className="requets">
                       <FaUserPlus  onClick={()=>{

                       }} style={{width:"40px",cursor:"pointer"}} /> 
                       <span className="request_count">{LocalUser?.requests.length}</span>
                       </div>

                        <p style={{ marginLeft: "40px" }}>
                            <IoSettingsOutline style={{ fontSize: "25px" }} />
                        </p>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
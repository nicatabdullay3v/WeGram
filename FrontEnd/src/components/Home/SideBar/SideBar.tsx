import "./SideBar.scss"
import { BsChat } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { GiPolarStar } from "react-icons/gi";
import { motion } from "framer-motion"
interface SettingsBarProps {
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    close: boolean;
}
const SideBar: React.FC<SettingsBarProps> = ({ setClose, close }) => {
    const navigate = useNavigate()


    return (
        <>
            <motion.aside
                initial={{
                    opacity: 0,
                    x: -350
                }}
                animate={{
                    opacity: close ? 1 : 0,
                    x: close ? 0 : -350
                }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}

                id="side_bar">
                <div className="profile_info">
                    <div onClick={() => {
                        setClose(false)
                    }} className="close">
                        <IoMdClose /><span>Close Menu</span>
                    </div>
                    <div className="sections">
                        <div onClick={() => {
                            navigate("/profile")
                        }} className="profile_page section">
                            <FaRegUser className="icon" /><span>Profile</span>
                        </div>
                        <div onClick={() => {
                            navigate("/chat")
                        }} className="profile_chat section">
                            <BsChat className="icon" /> <span>Chat</span>
                        </div>
                        <div className="profile_notifications section">
                            <IoNotificationsOutline className="icon" /> <span>Notifications</span>
                        </div>
                        <div className="profile_logout section">
                            <LuLogOut className="icon" /><span>LogOut</span>
                        </div>
                    </div>
                </div>
            </motion.aside>  <motion.aside
                initial={{
                    opacity: 0,
                    x: 0
                }}
                animate={{
                    opacity: close ? 0 : 1,
                    x: close ? -80 : 0
                }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
                id="side_bar_second">
                <div className="sections">
                    <div onClick={() => {
                        setClose(true)
                    }} id="section_menu" className="section ">
                        <MdOutlineMenu className="icon" />
                    </div>
                    <div onClick={() => {
                        navigate("/profile")
                    }} className="section">
                        <FaRegUser className="icon" />
                    </div>
                    <div onClick={() => {
                        navigate("/chat")
                    }} className="section">
                        <IoChatbubbleOutline className="icon" />

                    </div>
                    <div className="section">
                        <FaRegUser className="icon" />

                    </div>
                    <div className="section">
                        <FaRegUser className="icon" />

                    </div>
                    <div className="section">
                        <FaRegUser className="icon" />

                    </div>
                    <div className="section">
                        <FaRegUser className="icon" />

                    </div>
                    <div className="section">
                        <FaRegUser className="icon" />

                    </div>
                    <div className="section">
                        <FaRegUser className="icon" />

                    </div>
                    <div className="section">
                        <GiPolarStar className="icon" />

                    </div><div className="section">
                        <IoSettingsOutline className="icon" />

                    </div>

                </div>
            </motion.aside>

        </>
    )
}

export default SideBar  
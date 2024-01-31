import "./SideBar.scss"
import { BsChat } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
const SideBar = () => {
    return (
        <>
            <aside id="side_bar">
                <div className="profile_info">
                    <div className="profile_picture">
                        <img src="https://thumbs.img-sprzedajemy.pl/1000x901c/33/16/4a/portret-karykatura-portret-slubny-malowanie-mazowieckie-warszawa-490227530.jpg" alt="" />
                    </div>
                    <div className="profile_user_name">
                        <p>Eldar Memedov</p>
                    </div>
                    <div className="sections">
                        <div className="profile_page section">
                            <FaRegUser className="icon" /><span>Profile</span>
                        </div>
                        <div className="profile_chat section">
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
            </aside>
        </>
    )
}

export default SideBar  
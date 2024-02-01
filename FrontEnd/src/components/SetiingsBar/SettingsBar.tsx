import { useState } from "react";
import "./SetiingsBar.scss"
import { easeIn, motion } from "framer-motion"
import { IoCloseSharp } from "react-icons/io5";
interface SettingsBarProps {
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    close: boolean;
}
const SettingsBar: React.FC<SettingsBarProps> = ({ setClose, close }) => {
    // Import to NavBar
    return (
        <>
            {close ? <motion.aside
                initial={
                    {
                        opacity: 0,
                        x: 600
                    }
                }
                animate={
                    {
                        opacity: 1,
                        x: 0,

                    }
                }
                transition={{ ease: "easeOut", duration: 0.3 }}
                id="settings_bar">
                <div className="settings_bar_close">
                    <IoCloseSharp onClick={() => {
                        setClose(false)
                    }} className="close" />
                </div>
            </motion.aside> : null}
        </>
    )
}

export default SettingsBar
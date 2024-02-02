"use client"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { infinity } from 'ldrs'
import NavBar from "../../components/NavBar/NavBar"
import 'ldrs/ring'
import UsersStories from "../../components/Home/UsersStories/UsersStories";
import FollowingsPhotos from "../../components/Home/FollowingsPhotos/FollowingsPhotos"
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Home/SideBar/SideBar";
import RecomendedUsers from "../../components/Home/RecomendedUsers/RecomendedUsers";
export interface Decode {
    findUser: object
}
export default function Home() {
    const navigate = useNavigate()
    const [loading, setloading] = useState(true)
    infinity.register()

    const token = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (token) {
        const decoded: Decode = jwtDecode(token);
        const userData = decoded.findUser
    }
    useEffect(() => {
        if (token) {
        }
        else {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 660);
    }, [])
    return (
        <>
            <NavBar />
            {loading ? <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="loading">
                <l-infinity
                    size="100"
                    stroke="6"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3"
                    color="#ad99da"
                ></l-infinity>
            </div> : <>
                <FollowingsPhotos />
            </>}

        </>
    );
}

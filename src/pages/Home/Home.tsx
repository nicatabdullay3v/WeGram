"use client"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// import { infinity } from 'ldrs'
import NavBar from "../../components/NavBar/NavBar"
// import 'ldrs/ring'
import UsersStories from "../../components/Home/UsersStories/UsersStories";
import FollowingsPhotos from "../../components/Home/FollowingsPhotos/FollowingsPhotos"
export interface Decode {
    findUser: object
}
export default function Home() {
    const [loading, setloading] = useState(false)
    // infinity.register()

    const token = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (token) {
        const decoded: Decode = jwtDecode(token);
        const userData = decoded.findUser
    }
    useEffect(() => {
        if (token) {
        }
        else {

        }
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])
    return (
        <>
            <NavBar />
            {loading ? <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="loading">
                {/* <l-infinity
          size="100"
          stroke="6"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="#ad99da"
        ></l-infinity> */}
            </div> : <>
                <UsersStories />
                    <FollowingsPhotos />
            </>}

        </>
    );
}

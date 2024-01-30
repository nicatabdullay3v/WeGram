"use client"
import {  useDispatch, useSelector } from "react-redux"
import { getAllData } from "../../../redux/Slices/usersSlice"
import "./FollowingsPhotos.scss"
import { AppDispatch,RootState } from "../../../redux/store"
import { CiHeart } from "react-icons/ci";
import { useEffect } from "react"
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
const FollowingsPhotos = () => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    useEffect(() => {
        dispatch(getAllData())
    }, [])

    return (
        <section id='followings_photos'>
            <div className="container">
                <div className="followings_photos">
                    <div className="card">
                        <div className="card_up">
                            <div className="card_up_profile_img">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mona_Lisa-restored.jpg/1024px-Mona_Lisa-restored.jpg" alt="" />
                            </div>
                            <div className="card_up_name">
                                <span>Eldar</span>
                            </div>
                        </div>
                        <div className="card_center">
                            <div className="card_post">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mona_Lisa-restored.jpg/1024px-Mona_Lisa-restored.jpg" alt="" />
                            </div>
                        </div>
                        <div className="card_down">
                            <div className="card_like_comment_share">
                                <div className="like">
                                    <CiHeart />
                                </div>
                                <div className="comment">
                                    <FaRegComment />
                                </div>
                                <div className="share">
                                    <FaRegShareSquare />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FollowingsPhotos
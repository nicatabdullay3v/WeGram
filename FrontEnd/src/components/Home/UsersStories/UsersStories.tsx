"use client"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "./UsersStories.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllData, getUserById } from '../../../redux/Slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { Decode } from '../../../pages/Home/Home';
import { Users } from "../../../interfaces/UsersInterface";
import { PiShootingStarDuotone } from "react-icons/pi";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
const UsersStories = () => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    const LocalUser = useSelector((state: RootState) => state.users.user)
    const [storieUserID, setstorieUserID] = useState<any>([])
    const [storieModal, setstorieModal] = useState(false)

    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    useEffect(() => {
        dispatch(getAllData())
        dispatch(getUserById(LocalUserID))

    }, [])

    const storieUser = users?.find((x: { _id: string }) => x._id == storieUserID)
    return (
        <section id='stories'>

            {storieModal ? <div className="storie_modal">
                <div className="line-container">
                    {storieUser?.stories.map((_, index) => (
                        <div
                            key={index}
                            className={`line ${index === currentSlideIndex ? 'active' : ''}`}
                        ></div>
                    ))}
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}

                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
                >
                    {storieUser?.stories.map((x: { img: string }) => {
                        return <div className='user'>

                            <SwiperSlide className='s'>
                                <div style={{ width: "100%", height: "600px", cursor: "pointer" }} className="user_storie">
                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={`http://localhost:3001/${x.img}`} alt="" />
                                </div>
                            </SwiperSlide>

                        </div>
                    })}

                </Swiper>
                <input placeholder='type...' type="text" /><span><FaHeart/></span>

                <FaX className='x' onClick={() => {
                    setstorieModal(false)
                }} />

            </div> : null}
            <div style={{ maxWidth: "420px", margin: "0 auto" }} className="swiper_container">
                <div className="stories">
                    <div className="line"></div>
                    <div className="stories_up">

                        <PiShootingStarDuotone />  <p> Stories</p>

                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={40}
                        slidesPerView={3}

                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        {LocalUser && LocalUser?.followings.map((elem: { _id: string, profilePicture: string }) => {
                            return users.filter((x: { _id: string }) => x._id == elem._id).map((element) => {
                                if (element.stories.length >= 1) {
                                    return <SwiperSlide onClick={() => {
                                        setstorieModal(true)
                                        setstorieUserID(element._id)
                                    }} key={element._id} >
                                        <div className="storie">
                                            <img src={element.profilePicture} alt="" />
                                        </div>
                                    </SwiperSlide>
                                }

                            })
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default UsersStories

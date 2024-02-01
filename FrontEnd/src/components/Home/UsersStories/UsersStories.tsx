"use client"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import "./UsersStories.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllData } from '../../../redux/Slices/usersSlice';
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
const UsersStories = () => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    const [user, setuser] = useState<Users | undefined>();
    const token: any = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    useEffect(() => {
        if (token) {
            const decoded: Decode = jwtDecode(token);
            const userData: any = decoded.findUser
            setuser(userData);
        }
        dispatch(getAllData())
    }, [])
    const LocalUser = users.find((x) => x._id == user?._id)

    return (
        <section id='stories'>
            <div style={{ maxWidth: "600px", margin: "0 auto" }} className="swiper_container">
                <div className="stories">
                    <div className="line"></div>
                    <div className="stories_up">

                        <PiShootingStarDuotone />  <p> Stories</p>

                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={0}
                        slidesPerView={4}
                        breakpoints={{
                            320: {
                                width: 320,
                                slidesPerView: 3,
                            },

                        }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        {LocalUser && LocalUser?.followings.map((elem: { _id: string, img: string }) => {
                            return users.filter((x) => x._id == elem._id).map((element) => {
                                return <SwiperSlide key={element._id} >
                                    <div className="storie">
                                        <img src={element.img} alt="" />
                                    </div></SwiperSlide>
                            })
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default UsersStories

import "./PostsDetail.scss"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { getAllData, getUserById } from "../../redux/Slices/usersSlice"

const PostsDetail = () => {
    const { id, userId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.users.users)
    const user = useSelector((state: RootState) => state.users.user)

    useEffect(() => {
        dispatch(getAllData())
        dispatch(getUserById(userId!))
    }, [])

    const userPost = user?.posts.find((x) => x.id == id)



    return (
        userPost && <div className="post_detail">
            <div className="post">
                <div className="post_img">
                    <img src={`http://localhost:3001/${userPost.img}`} alt="" />

                </div>
            </div>
            <div className="post_comments">

            </div>

        </div>
    )
}

export default PostsDetail
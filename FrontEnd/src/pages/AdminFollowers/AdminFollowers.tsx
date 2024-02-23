import { useNavigate, useParams } from "react-router-dom"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { FaComment } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { FaX } from "react-icons/fa6";
const AdminFollowers = () => {
    const dispacth = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    const LocalUser = useSelector((state: RootState) => state.users.user)

    const [post, setpost] = useState<any>()
    const [commentModal, setcommentModal] = useState(false)
    const users = useSelector((state: RootState) => state.users.users)
    useEffect(() => {
        dispacth(getAllData())
        dispacth(getUserById(LocalUserID))

    }, [])
    const { id } = useParams()
    const user = users?.find((x) => x._id == id)
    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 330 },
        {
            field: 'username', headerName: 'username', width: 130,
            renderCell: (params) => (
                <div className="img">
                    <p>{users.find((x) => x._id == params.row._id)?.username?users.find((x) => x._id == params.row._id)?.username:LocalUser?.username}</p>
                </div>
            )
        },
        {
            field: 'email', headerName: 'email', width: 130,
            renderCell: (params) => (
                <div className="img">
                    <p>{users.find((x) => x._id == params.row._id)?.email?users.find((x) => x._id == params.row._id)?.email:LocalUser?.email}</p>
                </div>
            )
        },
        {
            field: 'img', headerName: 'img', width: 130,
            renderCell: (params) => (
                <div className="img">
                    <img src={`http://localhost:3001/profilePictures/${users.find((x) => x._id == params.row._id)?.profilePicture ? users.find((x) => x._id == params.row._id)?.profilePicture : LocalUser?.profilePicture}`} alt="" />
                </div>
            )
        },
        {
            field: 'lastName', headerName: 'delete', width: 130, renderCell: (params) => (
                <MdDeleteForever onClick={() => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            axios.patch(`http://localhost:3001/api/users/${id}`, {
                                followers: user?.followers.filter((x: { _id: string }) => x._id != params.row._id)
                            }).then(() => {
                                dispacth(getAllData())
                                dispacth(getUserById(LocalUserID))
                            })
                            axios.patch(`http://localhost:3001/api/users/${params.row._id?params.row._id:LocalUserID}`, {
                                followings: LocalUser?.followings.filter((x: { _id: string }) => x._id != user?._id)
                            }).then(() => {
                                dispacth(getAllData())
                                dispacth(getUserById(LocalUserID))
                            })
                        }
                    });

                }} style={{ cursor: "pointer" }} />
            )
        },
    ];
    return (
        <div className="admin_posts">
            <div className="container">
                {commentModal ? <div className="comment_modal">
                    <div className="title">
                        <p>Comments</p>
                    </div>
                    <FaX onClick={() => {
                        setcommentModal(false)
                    }} className="x" />
                    {post.comments.map((x: { comment: string, _id: string, commentID: string, replys: [] }, i: number) => {
                        return <li key={i} style={{ marginBottom: "20px" }}><div>from:{x._id}</div>{i}: {x.comment} <MdDeleteForever onClick={() => {
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    axios.patch(`http://localhost:3001/api/users/${id}/posts/${post.id}/comments/${x.commentID}`, {
                                        comment: "Deleted Comment",
                                        commentID: x.commentID,
                                        replys: x.replys,
                                        _id: x._id

                                    }).then(() => {
                                        dispacth(getAllData())
                                    })
                                }
                            });
                        }} style={{ backgroundColor: "red", color: "white", borderRadius: "10px", cursor: "pointer" }} /></li>
                    })}
                </div> : null}
                <div style={{ height: 400, width: '100%' }}>
                    {user?.posts && Array.isArray(user.posts) ? (
                        <DataGrid
                            rows={user.followers}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            getRowId={(res) => res._id}
                            checkboxSelection
                        />
                    ) : null
                    }

                </div>
            </div>
        </div>
    )
}

export default AdminFollowers
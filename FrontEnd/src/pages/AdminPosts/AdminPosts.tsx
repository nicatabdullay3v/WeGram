import { useNavigate, useParams } from "react-router-dom"


import "./AdminPosts.scss"
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
const AdminPosts = () => {
    const dispacth = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id
    const LocalUser = useSelector((state: RootState) => state.users.user)

    const [post, setpost] = useState<any>()
    const [commentModal, setcommentModal] = useState(false)
    const users = useSelector((state: RootState) => state.users.users)
    console.log(LocalUser?.Admin);
    
 
    useEffect(() => {
        dispacth(getAllData())
        dispacth(getUserById(LocalUserID))

    }, [])
    const { id } = useParams()

    // if (!LocalUser?.Admin) {
    //     navigate('/home')
    //     }


    const user = users?.find((x) => x._id == id)
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 330 },
        { field: 'title', headerName: 'title', width: 330 },

        {
            field: 'img', headerName: 'img', width: 130,
            renderCell: (params) => (
                <div className="img">
                    <img src={`http://localhost:3001/${params.row?.img}`} alt="" />
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
                            axios.delete(`http://localhost:3001/api/users/${id}/posts/${params.row.id}`).then(() => {
                                dispacth(getAllData())
                            })
                        }
                    });

                }} style={{ cursor: "pointer" }} />
            )
        },
        {
            field: 'comment', headerName: 'comments', width: 330,
            renderCell: (params) => (
                <FaComment onClick={() => {
                    setpost(params.row)
                    setcommentModal(true)
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
                            rows={user.posts}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    ) : null
                    }

                </div>
            </div>
        </div>
    )
}

export default AdminPosts
import "./Admin.scss"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import { LuDelete } from "react-icons/lu";
import { MdAutoDelete, MdAutoStories, MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { PiPictureInPicture } from "react-icons/pi";
import Swal from 'sweetalert2'
import axios from "axios";
import TextField from '@mui/material/TextField';
import { FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaUser } from "react-icons/fa";
import { BsLock } from "react-icons/bs";

const Admin = () => {
  const navigate = useNavigate()
  const dispacth = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.users)
  const [username, setusername] = useState('')
  const [isAdmin, setisAdmin] = useState<boolean>()
  const [backGroundImage, setBackGround] = useState('')
  const [email, setemail] = useState('')
  const [profilePicture, setprofilePicture] = useState('')
  const [gender, setgender] = useState('')
  const [isPublic, setisPublic] = useState<boolean>()
  const [editModal, setEditModal] = useState(false)
  const [userId, setuserId] = useState('')
  const user = users.find((x) => x._id == userId)
  const LocalUser: any = JSON.parse(localStorage.getItem("user-info") || "{}")
  useEffect(() => {
    dispacth(getAllData())
    setusername(user?.username!)
    setemail(user?.email!)
    setisPublic(user?.isPublic)
    setBackGround(user?.backGroundPicture!)
    setprofilePicture(user?.profilePicture!)
  }, [editModal])
  if (LocalUser.Admin === true) {

  }
  else {
    navigate('/home')
  }

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 230 },
    { field: 'username', headerName: 'username', width: 100 },
    { field: 'email', headerName: 'email', width: 150 },
    {
      field: 'isPublic',
      headerName: 'isPublic',
      width: 70,

    },
    {
      field: 'delete',
      headerName: 'delete',
      width: 70,
      renderCell: (params) => (
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
              axios.delete(`http://localhost:3001/api/users/${params.row._id}`).then(() => {
                dispacth(getAllData())
              })
            }
          });

        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
    {
      field: 'edit',
      headerName: 'edit',
      width: 50,
      renderCell: (params) => (
        <CiEdit onClick={() => {
          setEditModal(true)
          setuserId(params.row._id)
        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
    {
      field: 'posts',
      headerName: 'posts',
      width: 70,
      renderCell: (params) => (
        <PiPictureInPicture onClick={() => {
          navigate(`/admin/posts/${params.row._id}`)
        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
    {
      field: 'stories',
      headerName: 'stories',
      width: 70,
      renderCell: (params) => (
        <MdAutoStories onClick={() => {
          navigate(`/admin/stories/${params.row._id}`)
        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
    {
      field: 'wishList',
      headerName: 'WishList',
      width: 70,
      renderCell: (params) => (
        <FaBookmark onClick={() => {
          navigate(`/admin/wishList/${params.row._id}`)
        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
    {
      field: 'followers',
      headerName: 'followers',
      width: 90,
      renderCell: (params) => (
        <FaUser onClick={() => {
          navigate(`/admin/followers/${params.row._id}`)
        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
    {
      field: 'followings',
      headerName: 'followings',
      width: 90,
      renderCell: (params) => (
        <FaUser onClick={() => {
          navigate(`/admin/followings/${params.row._id}`)
        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
    {
      field: 'blocks',
      headerName: 'blocks',
      width: 70,
      renderCell: (params) => (
        <BsLock onClick={() => {
          navigate(`/admin/blockList/${params.row._id}`)
        }} style={{ cursor: "pointer" }} />
      )
      ,
    },
  ];
  return (
    <>
      <div className="admin">
        {editModal ? <div className="edit_modal">
          <FaX onClick={() => {
            setEditModal(false)
          }} className="close" />
          <div className="title">
            <p>Edit</p>
          </div>
          <div className="user_info">
            <TextField onChange={(e) => {
              setusername(e.target.value)
            }} value={username} id="outlined-basic" label="username" variant="outlined" />
            <TextField onChange={(e) => {
              setemail(e.target.value)
            }} value={email} id="outlined-basic" label="email" variant="outlined" />
            <TextField onChange={(e) => {
              setBackGround(e.target.value)
            }} value={backGroundImage} id="outlined-basic" label="backGroundImage" variant="outlined" />
            <div>
            <TextField onChange={(e) => {
              setprofilePicture(e.target.value)
            }} value={profilePicture} id="outlined-basic" label="profilePicture" variant="outlined" />
              
              <p>Select isPrivate</p>
              <select onChange={(e) => {
                setisPublic(e.target.value === 'true');
                console.log(e.target.value);
              }}>
                <option value="select">select</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div>
              <p>Select isAdmin</p>
              <select onChange={(e) => {
                setisAdmin(e.target.value === 'true');
                console.log(e.target.value);
              }}>
                <option value="select">select</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div>
              <p>Select gender</p>
              <select onChange={(e) => {
                setgender(e.target.value);
                console.log(e.target.value);
              }}>
                <option value="select">select</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <CiEdit onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, edit it!"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Edited!",
                  text: "Your file has been edited.",
                  icon: "success"
                });
                axios.patch(`http://localhost:3001/api/users/${userId}`, {
                  username: username,
                  email: email,
                  isPublic: isPublic,
                  Admin: isAdmin,
                  backGroundPicture:backGroundImage,
                  gender:gender,
                  profilePicture:profilePicture

                }).then(() => {
                  dispacth(getAllData())
                  setEditModal(false)
                })
              }
            });
          }} className="edit" />
        </div> : null}
        <div className="container">
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 50, 100]}
              checkboxSelection
              getRowId={(x) => x._id}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
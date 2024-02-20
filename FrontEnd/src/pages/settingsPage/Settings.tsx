import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import { AppDispatch, RootState } from "../../redux/store"
import "./Settings.scss"
import { useDispatch, useSelector } from "react-redux"
import { getAllData, getUserById } from "../../redux/Slices/usersSlice"
import axios from "axios"
import { AiOutlineClose } from "react-icons/ai"
const Settings = () => {
  const [modal, setModal] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const LocalUser = useSelector((state: RootState) => state.users.user)
  const LocalUserID = JSON.parse(localStorage.getItem("user-info") || "{}")._id
  useEffect(() => {

    dispatch(getUserById(LocalUserID))
  }, [])
  const [name, setName] = useState<string>("");
  const [nameInput, setnameInput] = useState(false)
  const [surname, setSurname] = useState<string>("");
  const [surnameInput, setSurnameInput] = useState(false)
  const [bio, setBio] = useState<string>("");
  const [bioInput, setBioInput] = useState(false)
  const [img, setImg] = useState<string>("");
  const [file, setFile] = useState<File | undefined>()
  const [imgInput, setImgInput] = useState(false)
  const handelProfilePicture = () => {
    if (!file) {
      console.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.patch(`http://localhost:3001/api/users/${LocalUserID}/addProfilePicture`, formData)
      .then((res) => {
        dispatch(getUserById(LocalUserID));
      })
      .catch((error) => {
        console.error("Error uploading story:", error);
      });

    setFile(undefined);
  };
  return (
    <>
      <NavBar />

      <div className="container">
        <div className="settings">
          {modal ? <div className="modal">
            <div style={{ textAlign: 'end' }} className="close">
              <AiOutlineClose  onClick={() => {
                setModal(false)
              }} style={{ fontSize: "25px", cursor: "pointer", color: "#3e6c7b" }} />

            </div>
            <div className="file-input-container">
              <input
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                type="file"
                id="fileInput"
                className="input-file"
              />
              <label htmlFor="fileInput" className="file-label">
                Choose a File
              </label>
              {file && <p>Selected File: {file.name}</p>}
            </div>
            <div className="file_title">
            </div>
            <button onClick={handelProfilePicture} style={{padding:"10px 12px"}} className="add_button">Add ProfilePicture</button>
          </div> : null}
          <div className="user_settings">
            <div className="user_name_profile_picture">
              <div className="user_settings_name_surname">
                <div className="user_settings_name edit">
                  <p>Username: {LocalUser?.username}</p>
                  <input onChange={(e) => {
                    setName(e.target.value)
                  }} style={{ display: nameInput ? "block" : "none" }} value={name} type="text" />

                  <button style={{ display: nameInput ? "none" : "block" }} onClick={() => {
                    setName(LocalUser?.username!)
                    setnameInput(true)
                    console.log(name);

                  }}>Edit</button>
                  <button style={{ display: nameInput ? "block" : "none" }} onClick={() => {


                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                      username: name
                    }).then(() => {
                      dispatch(getUserById(LocalUserID))
                    })
                  }}> change</button>
                  <button onClick={() => {
                    setnameInput(false)
                  }} style={{ display: nameInput ? "block" : "none" }}>close</button>
                </div>
                <div className="user_settings_surname edit">
                  <p>Surname: {LocalUser?.surname ? LocalUser.surname : "empty"}</p>
                  <input onChange={(e) => {
                    setSurname(e.target.value)
                  }} style={{ display: surnameInput ? "block" : "none" }} value={surname} type="text" />

                  <button style={{ display: surnameInput ? "none" : "block" }} onClick={() => {
                    setSurname(LocalUser?.surname!)
                    setSurnameInput(true)
                    console.log(name);

                  }}>Edit</button>
                  <button style={{ display: surnameInput ? "block" : "none" }} onClick={() => {


                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                      surname: surname
                    }).then(() => {
                      dispatch(getUserById(LocalUserID))
                    })
                  }}> change</button>
                  <button onClick={() => {
                    setSurnameInput(false)
                  }} style={{ display: surnameInput ? "block" : "none" }}>close</button>
                </div>
                <div className="user_settings_bio edit">
                  <p>isPublic: {LocalUser?.isPublic === true ? "true" : "false"}</p>
                  <button onClick={() => {
                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                      isPublic: LocalUser?.isPublic === true ? false : true
                    }).then(() => {
                      dispatch(getUserById(LocalUserID))
                      dispatch(getAllData())
                    })
                  }}>change</button>



                </div>
                <div className="user_settings_bio edit">
                  <p>Bio: {LocalUser?.bio ? LocalUser.bio : "empty"}</p>
                  <input onChange={(e) => {
                    setBio(e.target.value)
                  }} style={{ display: bioInput ? "block" : "none" }} value={bio} type="text" />

                  <button style={{ display: bioInput ? "none" : "block" }} onClick={() => {
                    setBio(LocalUser?.bio!)
                    setBioInput(true)
                    console.log(name);

                  }}>Edit</button>
                  <button style={{ display: bioInput ? "block" : "none" }} onClick={() => {
                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                      bio: bio
                    }).then(() => {
                      dispatch(getUserById(LocalUserID))
                    })

                  }}> change</button>
                  <button onClick={() => {
                    setBioInput(false)
                  }} style={{ display: bioInput ? "block" : "none" }}>close</button>
                </div>
              </div>

              <div className="user_settings_profile_picture">
                <img src={`http://localhost:3001/profilePictures/${LocalUser?.profilePicture}`} alt="" />
                <div className="user_settings_bio edit">
                  <p style={{ marginLeft: "40px" }}>img</p>
                  <input onChange={(e) => {
                    setImg(e.target.value)
                  }} style={{ display: imgInput ? "block" : "none" }} value={img} type="text" />

                  <button style={{ display: imgInput ? "none" : "block" }} onClick={() => {
                    setModal(true)

                  }}>Edit</button>
                  <button style={{ display: imgInput ? "block" : "none" }} onClick={() => {


                    axios.patch(`http://localhost:3001/api/users/${LocalUserID}`, {
                      profilePicture: img
                    }).then(() => {
                      dispatch(getUserById(LocalUserID))
                    })
                    setImgInput(false)

                  }}> change</button>
                  <button onClick={() => {
                    setImgInput(false)
                  }} style={{ display: imgInput ? "block" : "none" }}>close</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Settings
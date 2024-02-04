import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AppDispatch, RootState } from "../../redux/store";
import "./Chat.scss";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import axios from "axios";
import { getAllMessages } from "../../redux/Slices/MessagesSLice";

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id;

  const users = useSelector((state: RootState) => state.users.users);
  const user = useSelector((state: RootState) => state.users.user);
  const messages = useSelector((state: RootState) => state.messages.messages);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("")


  useEffect(() => {
    dispatch(getAllData());
    dispatch(getUserById(LocalUserID));

  }, []);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    dispatch(getAllMessages(selectedUserId!))


  };



  return (
    <>
      <NavBar />
      <div className="chat">
        <div className="chat_left">
          <div className="chat_left_up">
            <input placeholder="search" type="text" />
            <GoSearch onClick={() => {

            }} className="icon" />
          </div>
          <div className="chat_left_down">
            <div className="chat_users">
              {user &&
                user.followings.map((elem: { _id: string }) => {
                  const userElement = users.find((x) => x._id === elem._id);

                  return (
                    userElement && (
                      <div
                        key={userElement._id}
                        className={`chat_user ${selectedUserId === userElement._id ? "selected" : ""}`}
                        onClick={() => handleUserClick(userElement._id)}
                      >
                        <div className="user_profile_pic">
                          <img src={userElement.profilePicture} alt="" />
                        </div>
                        <div className="user_name">
                          <p>{userElement.username}</p>
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
        <div className="chat_right">
          <div className="chat_right_up">
            <p>TO: {selectedUserId ? users.find((u) => u._id === selectedUserId)?.username : "Select a user"}</p>
          </div>
          <div className="chat_right_center">
            {selectedUserId ? <div className="messages">
              {messages && messages.map((message:{senderId:string}) => {
                
                return <div style={{color:message.senderId == LocalUserID?"red":"blue"}} className="message">
                  <p>{message.message}</p>
                </div>
              })}
            </div> : <p>Hello qaqa</p>}
          </div>
          <div className="chat_right_down">
            <div className="message_input">
              <input onChange={(e) => {
                setInputValue(e.target.value)
              }} placeholder="type" type="text" />
            </div>
            <div onClick={() => {
              axios.defaults.withCredentials = true;
              axios.post(
                `http://localhost:3001/api/messages/send/${selectedUserId}`,
                { message: inputValue },
                { withCredentials: true, headers: { crossDomain: true, "Content-Type": "application/json" } }
              )
                .then(response => {
                  console.log(response.data);
                })
                .catch(error => {
                  console.error("Error sending message:", error);
                });
            }} className="message_send_button">send</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

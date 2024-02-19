import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AppDispatch, RootState } from "../../redux/store";
import "./Chat.scss";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getUserById } from "../../redux/Slices/usersSlice";
import axios from "axios";
import { motion } from "framer-motion"
import { getAllMessages, setMessages } from "../../redux/Slices/MessagesSLice";
import { useSocketContext } from "../../context/SocketContext";
import { BsSend } from "react-icons/bs";
import { GrReturn } from "react-icons/gr";

interface Message {
  _id: string;
  senderId: string;
  message: string;
  createdAt: string;
  shouldShake: boolean
}

const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id;
  const { onlineUsers } = useSocketContext()!
  const [display, setDisplay] = useState(true)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  console.log(onlineUsers);
  const { socket } = useSocketContext() || {}
const [searchInput, setsearchInput] = useState('')
  const [isTyping, setIsTyping] = useState(false);
  console.log(screenX);

  useEffect(() => {
    const handleTyping = (senderId: string) => {
      if (senderId === selectedUserId) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = (senderId: string) => {
      if (senderId === selectedUserId) {
        setIsTyping(false);
      }
    };

    if (socket) {
      socket.on("typing", handleTyping);
      socket.on("stopTyping", handleStopTyping);
    }

    return () => {
      if (socket) {
        socket.off("typing", handleTyping);
        socket.off("stopTyping", handleStopTyping);
      }
    };
  }, [socket, selectedUserId]);

  const handleTyping = () => {
    if (selectedUserId) {
      socket?.emit("typing", selectedUserId);
    }
  };

  const handleStopTyping = () => {
    if (selectedUserId) {
      socket?.emit("stopTyping", selectedUserId);
    }
  };

  const messages = useSelector((state: RootState) => state.messages.messages);

  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      console.log("salm");

      newMessage.shouldShake = true;

      dispatch(setMessages([...messages, newMessage]));
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, dispatch, messages]);

  const users = useSelector((state: RootState) => state.users.users);
  const user = useSelector((state: RootState) => state.users.user);

  const [inputValue, setInputValue] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRe = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getAllData());
    dispatch(getUserById(LocalUserID));
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRe.current) {
      messagesContainerRe.current.scrollTop = messagesContainerRe.current.scrollHeight;
    }
  }, [messages]);
  const handleUserClick = async (userId: string) => {
    setSelectedUserId(userId);
    setDisplay(false)
    dispatch(getAllMessages(userId));
    const sound = new Audio("/sounds/click-21156.mp3");
    sound.play()
    console.log(messages);
  };

  return (
    <>
      <NavBar />
      <div className="chat">
        <div className="chat_border">
          <div className="chat_left">
            <div className="chat_left_up">
              <input onChange={(e)=>{
                  setsearchInput(e.target.value)
              }} placeholder="search" type="text" />
              <GoSearch onClick={() => { }} className="icon" />
            </div>
            <div className="chat_left_down">
              <div className="chat_users">
                {user &&
                  user.followings.map((elem: { _id: string }) => {
                    const userElement = users.find((x) => x._id === elem._id);
                    const isOnline = onlineUsers.includes(elem._id);
                    if (userElement?.username.toLowerCase().trim().includes(searchInput.toLowerCase().trim())) {
                      return (
                        userElement && (
                          <div
                            key={userElement._id}
                            className={`chat_user ${selectedUserId === userElement._id ? "selected" : ""}`}
                            onClick={() => handleUserClick(userElement._id)}
                          >
                            <div className="user_profile_pic">
                              <img src={`http://localhost:3001/profilePictures/${userElement?.profilePicture}`} alt="" />
                              <p className={isOnline ? "online" : "xexe"}></p>
                            </div>
                            <div className="user_name">
                              <p >{userElement.username}</p>
                            </div>
                          </div>
                        )
                      );
                    }
                
                  })}
              </div>
            </div>
          </div>
          <div className="chat_right">
            <div className="chat_right_up">
              <p>TO: {selectedUserId ? users.find((u) => u._id === selectedUserId)?.username : "Select a user"}</p>
            </div>
            <div className="chat_right_center" ref={messagesContainerRe}>
              {selectedUserId ? (
                <div className="messages">
                  {messages &&
                    messages.map((message: any) => {
                      const timestampObj = new Date(message.createdAt);

                      timestampObj.setUTCHours(timestampObj.getUTCHours());

                      const formattedTime = timestampObj.toLocaleString("en-AZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Baku",
                      });
                      console.log("sal");

                      return (
                        <div key={message._id} className={message.senderId === LocalUserID ? "my" : "his"}>
                          <p>
                            {" "}
                            <sub style={{ fontSize: "10px", marginRight: "20px" }}>{formattedTime}</sub>
                            {message.message}
                          </p>
                        </div>

                      );
                    })}
                  <motion.span
                    id="typing-indicator"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isTyping ? 1 : 0,
                      y: isTyping ? 0 : 10,
                      transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0 }}
                  >
                    typing...
                  </motion.span>
                </div>
              ) : (
                <p>1.Salam deyerli user adam sec yazismaq ucun.<br />
                  2.Birinci mesaj catin yaradilmasi ucundu
                </p>
              )}
            </div>
            <div className="chat_right_down">
              <div className="message_input">
                <textarea
                  onFocus={handleTyping}
                  onBlur={handleStopTyping}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  placeholder="type"
                />
              </div>
              <div
                onClick={() => {
                  axios.defaults.withCredentials = true;
                  axios
                    .post(
                      `http://localhost:3001/api/messages/send/${selectedUserId}`,
                      { message: inputValue },
                      { withCredentials: true, headers: { crossDomain: true, "Content-Type": "application/json" } }
                    )
                    .then((response) => {
                      dispatch(setMessages([...messages, response.data]));
                      const sound = new Audio("/sounds/happy-pop-2-185287.mp3");
                      sound.play()
                    })
                    .catch((error) => {
                      console.error("Error sending message:", error);
                    });
                  setInputValue("");
                  console.log(messages);
                }}
                className="message_send_button"
              >
                <BsSend />
              </div>
            </div>
          </div>
        </div>
      </div>















      
      <div className="chat_res">
        <div style={{ display: display ? "block" : "none" }} className="chat_left">
          <div className="chat_left_up">
            <input onChange={(e)=>{
              setsearchInput(e.target.value)
            }} placeholder="search" type="text" />
            <GoSearch onClick={() => { }} className="icon" />
          </div>
          <div className="chat_left_down">
            <div className="chat_users">
              {user &&
                user.followings.map((elem: { _id: string }) => {
                  const userElement = users.find((x) => x._id === elem._id);
                  const isOnline = onlineUsers.includes(elem._id);
                  if (userElement?.username.toLowerCase().trim().includes(searchInput.toLowerCase().trim())) {
                    return (
                      userElement && (
                        <div
                          key={userElement._id}
                          className={`chat_user ${selectedUserId === userElement._id ? "selected" : ""}`}
                          onClick={() => handleUserClick(userElement._id)}
                        >
                          <div className="user_profile_pic">
                            <img src={`http://localhost:3001/profilePictures/${userElement?.profilePicture}`} alt="" />
                            <p className={isOnline ? "online" : "xexe"}></p>
                          </div>
                          <div className="user_name">
                            <p >{userElement.username}</p>
                          </div>
                        </div>
                      )
                    );
                  }
                })}
            </div>
          </div>
        </div>
        <div style={{ display: display ? "none" : "block" }} className="chat_right">
          <div className="chat_right_up">
            <span onClick={() => {
              setDisplay(true)
              const sound = new Audio("/sounds/click-21156.mp3");
              sound.play()
            }} style={{ color: "white" }}><GrReturn style={{ padding: "5px", fontSize: "28px", backgroundColor: "white", color: "#30305b", borderRadius: "10px", cursor: "pointer" }} /></span><p>TO: {selectedUserId ? users.find((u) => u._id === selectedUserId)?.username : "Select a user"}</p>
          </div>
          <div className="chat_right_center" ref={messagesContainerRef}>
            {selectedUserId ? (
              <div className="messages">
                {messages &&
                  messages.map((message: any) => {
                    const timestampObj = new Date(message.createdAt);

                    timestampObj.setUTCHours(timestampObj.getUTCHours());

                    const formattedTime = timestampObj.toLocaleString("en-AZ", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Asia/Baku",
                    });
                    console.log("sal");

                    return (
                      <div key={message._id} className={message.senderId === LocalUserID ? "my" : "his"}>
                        <p>
                          {" "}
                          <sub style={{ fontSize: "10px", marginRight: "20px" }}>{formattedTime}</sub>
                          {message.message}
                        </p>
                      </div>

                    );
                  })}
                <motion.span
                  id="typing-indicator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isTyping ? 1 : 0,
                    y: isTyping ? 0 : 10,
                    transition: { duration: 0.3 },
                  }}
                  exit={{ opacity: 0 }}
                >
                  typing...
                </motion.span>
              </div>
            ) : (
              <p>Hello qaqa</p>
            )}
          </div>
          <div className="chat_right_down">
            <div className="message_input">
              <textarea
                onFocus={handleTyping}
                onBlur={handleStopTyping}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="type"
              />
            </div>
            <div
              onClick={() => {
                axios.defaults.withCredentials = true;
                axios
                  .post(
                    `http://localhost:3001/api/messages/send/${selectedUserId}`,
                    { message: inputValue },
                    { withCredentials: true, headers: { crossDomain: true, "Content-Type": "application/json" } }
                  )
                  .then((response) => {
                    dispatch(setMessages([...messages, response.data]));
                    const sound = new Audio("/sounds/happy-pop-2-185287.mp3");
                    sound.play()
                  })
                  .catch((error) => {
                    console.error("Error sending message:", error);
                  });
                setInputValue("");
                console.log(messages);
              }}
              className="message_send_button"
            >
              <BsSend />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

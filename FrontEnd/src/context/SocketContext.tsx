import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "../redux/store";
import { getUserById } from "../redux/Slices/usersSlice";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id;

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.users.user)
    useEffect(() => {

        dispatch(getUserById(LocalUserID));
    }, [])


    useEffect(() => {
        if (user) {
          const socket = io("http://localhost:3001", {
            query: {
              userId: user._id,
            },
          });
      
          setSocket(socket);
      
          socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
          });
      
          return () => {
            socket.close();
            setSocket(null);
          };
        } else {
          if (socket) {
            socket.close();
            setSocket(null);
          }
        }
      }, [user]);
      
      // Cleanup on component unmount
      useEffect(() => {
        return () => {
          if (socket) {
            socket.close();
            setSocket(null);
          }
        };
      }, []);
      

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
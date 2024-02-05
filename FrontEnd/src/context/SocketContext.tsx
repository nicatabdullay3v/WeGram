import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { AppDispatch, RootState } from "../redux/store";
import { getUserById } from "../redux/Slices/usersSlice";
interface SocketContextProps {
  socket: any | undefined;
  onlineUsers: any[];
}
const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = () => {
  return useContext(SocketContext);
};
interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const LocalUserID: string = JSON.parse(localStorage.getItem("user-info") || "{}")._id;

  const [socket, setSocket] = useState<any>(null)
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>()
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
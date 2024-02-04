import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Messages, MessagesState } from '../../interfaces/Messages';
export const getAllMessages = createAsyncThunk(
    'users/getAllMessages',
    async (id:string) => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:3001/api/messages/${id}`, { withCredentials: true });
            return response.data as Messages[];
        } catch (error: any) {
            // if (error.name == "AxiosError") {
            //     localStorage.removeItem("user-info")
            // }
            console.error('Error fetching data:', error.name);
            throw error;
        }
    }
);

const initialState: MessagesState = {
    messages: [],
}
export const MessagesSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Messages[]>) => {
            state.messages = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMessages.fulfilled, (state: MessagesState, action) => {
            state.messages= action.payload
        })
    },
})
export const { setMessages} = MessagesSlice.actions

export default MessagesSlice.reducer
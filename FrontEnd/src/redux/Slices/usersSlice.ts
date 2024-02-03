import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Users } from '../../interfaces/UsersInterface'
import { UsersState } from '../../interfaces/UsersInterface'
export const getAllData = createAsyncThunk(
    'users/getData',
    async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:3001/api/users`, { withCredentials: true });
            return response.data as Users[];
        } catch (error: any) {
            if (error.name == "AxiosError") {
                localStorage.removeItem("user-info")
            }
            console.error('Error fetching data:', error.name);
            throw error;
        }
    }
);
export const getUserById = createAsyncThunk(
    'users/getUserByID',
    async (id: string) => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`http://localhost:3001/api/users/${id}`, { withCredentials: true });
            return response.data as Users;
        } catch (error: any) {
            if (error.name == "AxiosError") {
                localStorage.removeItem("user-info")
            }
            console.error('Error fetching data:', error.name);
            throw error;
        }
    }
);

const initialState: UsersState = {
    users: [],
    user: null,
}
export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllData.fulfilled, (state: UsersState, action) => {
            state.users = action.payload
        }),
            builder.addCase(getUserById.fulfilled, (state: UsersState, action) => {
                state.user = action.payload
            })
    },
})
export const { } = UsersSlice.actions

export default UsersSlice.reducer
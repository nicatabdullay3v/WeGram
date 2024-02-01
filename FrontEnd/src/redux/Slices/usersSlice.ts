import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Users } from '../../interfaces/UsersInterface'
import { UsersState } from '../../interfaces/UsersInterface'
export const getAllData = createAsyncThunk(
    'users/getData',
    async () => {
        const response = await axios.get(`http://localhost:3001/users`)
        return response.data as Users[]
    }
)

const initialState: UsersState = {
    users: [],
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllData.fulfilled, (state: UsersState, action) => {
            state.users = action.payload
        })
    },
})
export const {  } = UsersSlice.actions

export default UsersSlice.reducer
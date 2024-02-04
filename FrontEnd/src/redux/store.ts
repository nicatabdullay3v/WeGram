import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './Slices/usersSlice'
import MessagesSLice from './Slices/MessagesSLice'

export const store = configureStore({
  reducer: {
    users:usersSlice,
    messages:MessagesSLice
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
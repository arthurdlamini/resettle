import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isLoggedIn: false,
    isAdmin:false,
	isLoading:false
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
        setAdmin: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
            state.isAdmin = true;
		},
		logoutUser: (state) => {
			state.user = null;
			state.isLoggedIn = false;
            state.isAdmin = false;
			state.isLoading = false;
		},loading: (state,action) => {
            state.isLoading = action.payload;
		},
	},
});
export const { setUser, logoutUser,setAdmin,loading } = userSlice.actions;
export default userSlice.reducer;

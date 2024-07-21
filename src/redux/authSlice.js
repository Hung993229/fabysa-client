import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        changePass: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;

            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = false;

            state.changePass.isFetching = false;
            state.changePass.error = false;
            state.changePass.success = false;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;

            state.changePass.isFetching = false;
            state.changePass.error = true;

            state.register.isFetching = false;
            state.register.error = true;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
            state.changePass.isFetching = true;
            state.register.isFetching = true;
        },

        changePasswordSuccess: (state) => {
            state.changePass.isFetching = false;
            state.changePass.error = false;
            state.changePass.success = true;
        },
        changePasswordFailed: (state) => {
            state.changePass.isFetching = false;
            state.changePass.error = true;
            state.changePass.success = false;
        },
        changePasswordStart: (state) => {
            state.changePass.isFetching = true;
        },
    },
});
export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    changePasswordSuccess,
    changePasswordFailed,
    changePasswordStart,
} = authSlice.actions;
export default authSlice.reducer;

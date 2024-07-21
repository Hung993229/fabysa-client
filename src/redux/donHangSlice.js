import { createSlice } from "@reduxjs/toolkit";
const donHangSlice = createSlice({
    name: "donHang",
    initialState: {
        donHang: {
            donHang: null,
            isFetching: false,
            error: false,
            success: false,
            alldonHang: null,
        },
    },
    reducers: {
        logOutSuccessdonHang: (state) => {
            state.donHang.donHang = null;
            state.donHang.isFetching = false;
            state.donHang.error = false;
            state.donHang.success = false;
            state.donHang.alldonHang = null;
        },
        updatedonHangStart: (state) => {
            state.donHang.isFetching = true;
        },
        updatedonHangSuccess: (state, action) => {
            state.donHang.isFetching = false;
            state.donHang.donHang = action.payload;
            state.donHang.success = true;
        },
        updatedonHangFailed: (state) => {
            state.donHang.isFetching = false;
            state.donHang.error = true;
        },
        registerdonHangStart: (state) => {
            state.donHang.isFetching = true;
        },
        registerdonHangSuccess: (state, action) => {
            state.donHang.isFetching = false;
            state.donHang.error = false;
            state.donHang.donHang = action.payload;
            state.donHang.success = true;
        },
        registerdonHangFailed: (state) => {
            state.donHang.isFetching = false;
            state.donHang.error = true;
            state.donHang.success = false;
        },
        getdonHangStart: (state) => {
            state.donHang.isFetching = true;
        },
        getdonHangSuccess: (state, action) => {
            state.donHang.isFetching = false;
            state.donHang.alldonHang = action.payload;
            state.donHang.success = true;
        },
        getdonHangFailed: (state) => {
            state.donHang.isFetching = false;
            state.donHang.error = true;
        },
        getOnedonHangStart: (state) => {
            state.donHang.isFetching = true;
        },
        getOnedonHangSuccess: (state, action) => {
            state.donHang.isFetching = false;
            state.donHang.donHang = action.payload;
            state.donHang.success = true;
        },
        getOnedonHangFailed: (state) => {
            state.donHang.isFetching = false;
            state.donHang.error = true;
        },
        deletedonHangStart: (state) => {
            state.donHang.isFetching = true;
        },
        deletedonHangSuccess: (state, action) => {
            state.donHang.isFetching = false;
            state.donHang.donHang = action.payload;
            state.donHang.success = true;
        },
        deletedonHangFailed: (state) => {
            state.donHang.isFetching = false;
            state.donHang.error = true;
            state.donHang.success = false;
        },
    },
});

export const {
    updatedonHangStart,
    updatedonHangSuccess,
    updatedonHangFailed,
    registerdonHangStart,
    registerdonHangSuccess,
    registerdonHangFailed,
    getdonHangStart,
    getdonHangSuccess,
    getdonHangFailed,
    getOnedonHangStart,
    getOnedonHangSuccess,
    getOnedonHangFailed,
    deletedonHangStart,
    deletedonHangSuccess,
    deletedonHangFailed,
    logOutSuccessdonHang,
} = donHangSlice.actions;

export default donHangSlice.reducer;

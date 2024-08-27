import { createSlice } from "@reduxjs/toolkit";
const taiKhoanSlice = createSlice({
    name: "taiKhoan",
    initialState: {
        taiKhoan: {
            taiKhoan: null,
            isFetching: false,
            error: false,
            success: false,
            allTaiKhoan: null,
        },
    },
    reducers: {
        logOutSuccessTaiKhoan: (state) => {
            state.taiKhoan.taiKhoan = null;
            state.taiKhoan.isFetching = false;
            state.taiKhoan.error = false;
            state.taiKhoan.success = false;
            state.taiKhoan.allTaiKhoan = null;
        },
        updateTaiKhoanStart: (state) => {
            state.taiKhoan.isFetching = true;
        },
        updateTaiKhoanSuccess: (state, action) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.taiKhoan = action.payload;
            state.taiKhoan.success = true;
        },
        updateTaiKhoanFailed: (state) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.error = true;
        },

        registerTaiKhoanStart: (state) => {
            state.taiKhoan.isFetching = true;
        },
        registerTaiKhoanSuccess: (state, action) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.error = false;
            state.taiKhoan.taiKhoan = action.payload;
            state.taiKhoan.success = true;
        },
        registerTaiKhoanFailed: (state) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.error = true;
            state.taiKhoan.success = false;
        },
        getTaiKhoanStart: (state) => {
            state.taiKhoan.isFetching = true;
        },
        getTaiKhoanSuccess: (state, action) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.taiKhoan = action.payload;
            state.taiKhoan.success = true;
        },
        getTaiKhoanFailed: (state) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.error = true;
        },
        getAllTaiKhoanStart: (state) => {
            state.taiKhoan.isFetching = true;
        },
        getAllTaiKhoanSuccess: (state, action) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.allTaiKhoan = action.payload;
            state.taiKhoan.success = true;
        },
        getAllTaiKhoanFailed: (state) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.error = true;
        },
        deleteTaiKhoanStart: (state) => {
            state.taiKhoan.isFetching = true;
        },
        deleteTaiKhoanSuccess: (state, action) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.taiKhoan = action.payload;
            state.taiKhoan.success = true;
        },
        deleteTaiKhoanFailed: (state) => {
            state.taiKhoan.isFetching = false;
            state.taiKhoan.error = true;
            state.taiKhoan.success = false;
        },
    },
});

export const {
    updateTaiKhoanStart,
    updateTaiKhoanSuccess,
    updateTaiKhoanFailed,

    registerTaiKhoanStart,
    registerTaiKhoanSuccess,
    registerTaiKhoanFailed,

    getTaiKhoanStart,
    getTaiKhoanSuccess,
    getTaiKhoanFailed,

    getAllTaiKhoanStart,
    getAllTaiKhoanSuccess,
    getAllTaiKhoanFailed,

    deleteTaiKhoanStart,
    deleteTaiKhoanSuccess,
    deleteTaiKhoanFailed,
    
    logOutSuccessTaiKhoan,
} = taiKhoanSlice.actions;

export default taiKhoanSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const gioHangSlice = createSlice({
    name: "gioHang",
    initialState: {
        gioHang: {
            gioHang: null,
            isFetching: false,
            error: false,
            success: false,
            allgioHang: null,
        },
    },
    reducers: {
        logOutSuccessgioHang: (state) => {
            state.gioHang.gioHang = null;
            state.gioHang.isFetching = false;
            state.gioHang.error = false;
            state.gioHang.success = false;
            state.gioHang.allgioHang = null;
        },
        updategioHangStart: (state) => {
            state.gioHang.isFetching = true;
        },
        updategioHangSuccess: (state, action) => {
            state.gioHang.isFetching = false;
            state.gioHang.gioHang = action.payload;
            state.gioHang.success = true;
        },
        updategioHangFailed: (state) => {
            state.gioHang.isFetching = false;
            state.gioHang.error = true;
        },

        registergioHangStart: (state) => {
            state.gioHang.isFetching = true;
        },
        registergioHangSuccess: (state, action) => {
            state.gioHang.isFetching = false;
            state.gioHang.error = false;
            state.gioHang.gioHang = action.payload;
            state.gioHang.success = true;
        },
        registergioHangFailed: (state) => {
            state.gioHang.isFetching = false;
            state.gioHang.error = true;
            state.gioHang.success = false;
        },

        getAllGioHangStart: (state) => {
            state.gioHang.isFetching = true;
        },
        getAllGioHangSuccess: (state, action) => {
            state.gioHang.isFetching = false;
            state.gioHang.allgioHang = action.payload;
            state.gioHang.success = true;
        },
        getAllGioHangFailed: (state) => {
            state.gioHang.isFetching = false;
            state.gioHang.error = true;
        },

        getgioHangStart: (state) => {
            state.gioHang.isFetching = true;
        },
        getgioHangSuccess: (state, action) => {
            state.gioHang.isFetching = false;
            state.gioHang.gioHang = action.payload;
            state.gioHang.success = true;
        },
        getgioHangFailed: (state) => {
            state.gioHang.isFetching = false;
            state.gioHang.error = true;
        },
        deletegioHangStart: (state) => {
            state.gioHang.isFetching = true;
        },
        deletegioHangSuccess: (state, action) => {
            state.gioHang.isFetching = false;
            state.gioHang.gioHang = action.payload;
            state.gioHang.success = true;
        },
        deletegioHangFailed: (state) => {
            state.gioHang.isFetching = false;
            state.gioHang.error = true;
            state.gioHang.success = false;
        },
    },
});

export const {
    updategioHangStart,
    updategioHangSuccess,
    updategioHangFailed,
    registergioHangStart,
    registergioHangSuccess,
    registergioHangFailed,
    getAllGioHangStart,
    getAllGioHangSuccess,
    getAllGioHangFailed,
    getgioHangStart,
    getgioHangSuccess,
    getgioHangFailed,
    deletegioHangStart,
    deletegioHangSuccess,
    deletegioHangFailed,
    logOutSuccessgioHang,
} = gioHangSlice.actions;

export default gioHangSlice.reducer;

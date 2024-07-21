import { createSlice } from "@reduxjs/toolkit";
const sanPhamSlice = createSlice({
    name: "sanPham",
    initialState: {
        sanPham: {
            sanPham: null,
            isFetching: false,
            error: false,
            success: false,
            allsanPham: null,
            arrsanPham: null,
            sanPhamDan: null,
        },
    },
    reducers: {
        logOutSuccessSanPham: (state) => {
            state.sanPham.sanPham = null;
            state.sanPham.isFetching = false;
            state.sanPham.error = false;
            state.sanPham.success = false;
            state.sanPham.allsanPham = null;
            state.sanPham.arrsanPham = null;
            state.sanPham.sanPhamDan = null;
        },
        updateSanPhamStart: (state) => {
            state.sanPham.isFetching = true;
        },
        updateSanPhamSuccess: (state, action) => {
            state.sanPham.isFetching = false;
            state.sanPham.sanPham = action.payload;
            state.sanPham.success = true;
        },
        updateSanPhamFailed: (state) => {
            state.sanPham.isFetching = false;
            state.sanPham.error = true;
        },

        registerSanPhamStart: (state) => {
            state.sanPham.isFetching = true;
        },
        registerSanPhamSuccess: (state, action) => {
            state.sanPham.isFetching = false;
            state.sanPham.error = false;
            state.sanPham.sanPham = action.payload;
            state.sanPham.success = true;
        },
        registerSanPhamFailed: (state) => {
            state.sanPham.isFetching = false;
            state.sanPham.error = true;
            state.sanPham.success = false;
        },
        getSanPhamStart: (state) => {
            state.sanPham.isFetching = true;
        },
        getSanPhamSuccess: (state, action) => {
            state.sanPham.isFetching = false;
            state.sanPham.allsanPham = action.payload;
            state.sanPham.success = true;
        },
        getSanPhamFailed: (state) => {
            state.sanPham.isFetching = false;
            state.sanPham.error = true;
        },
        getArrSanPhamStart: (state) => {
            state.sanPham.isFetching = true;
        },
        getArrSanPhamSuccess: (state, action) => {
            state.sanPham.isFetching = false;
            state.sanPham.arrsanPham = action.payload;
            state.sanPham.success = true;
        },
        getArrSanPhamFailed: (state) => {
            state.sanPham.isFetching = false;
            state.sanPham.error = true;
            state.sanPham.arrsanPham = null;
        },
        getSanPhamDanStart: (state) => {
            state.sanPham.isFetching = true;
        },
        getSanPhamDanSuccess: (state, action) => {
            state.sanPham.isFetching = false;
            state.sanPham.sanPhamDan = action.payload;
            state.sanPham.success = true;
        },
        getSanPhamDanFailed: (state) => {
            state.sanPham.isFetching = false;
            state.sanPham.error = true;
        },
        deleteSanPhamStart: (state) => {
            state.sanPham.isFetching = true;
        },
        deleteSanPhamSuccess: (state, action) => {
            state.sanPham.isFetching = false;
            state.sanPham.sanPham = action.payload;
            state.sanPham.success = true;
        },
        deleteSanPhamFailed: (state) => {
            state.sanPham.isFetching = false;
            state.sanPham.error = true;
            state.sanPham.success = false;
        },
    },
});

export const {
    updateSanPhamStart,
    updateSanPhamSuccess,
    updateSanPhamFailed,
    registerSanPhamStart,
    registerSanPhamSuccess,
    registerSanPhamFailed,
    getSanPhamStart,
    getSanPhamSuccess,
    getSanPhamFailed,
    getArrSanPhamStart,
    getArrSanPhamSuccess,
    getArrSanPhamFailed,
    getSanPhamDanStart,
    getSanPhamDanSuccess,
    getSanPhamDanFailed,

    deleteSanPhamStart,
    deleteSanPhamSuccess,
    deleteSanPhamFailed,
    logOutSuccessSanPham,
} = sanPhamSlice.actions;

export default sanPhamSlice.reducer;

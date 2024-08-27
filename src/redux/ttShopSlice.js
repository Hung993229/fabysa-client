import { createSlice } from "@reduxjs/toolkit";
const ttShopSlice = createSlice({
    name: "ttShop",
    initialState: {
        ttShop: {
            ttShop: null,
            isFetching: false,
            error: false,
            success: false,
            allttShop: null,
            allShopTimKiem: null,
        },
    },
    reducers: {
        logOutSuccessttShop: (state) => {
            state.ttShop.ttShop = null;
            state.ttShop.isFetching = false;
            state.ttShop.error = false;
            state.ttShop.success = false;
            state.ttShop.allttShop = null;
            state.ttShop.allShopTimKiem = null;
        },
        updatettShopStart: (state) => {
            state.ttShop.isFetching = true;
        },
        updatettShopSuccess: (state, action) => {
            state.ttShop.isFetching = false;
            state.ttShop.ttShop = action.payload;
            state.ttShop.success = true;
        },
        updatettShopFailed: (state) => {
            state.ttShop.isFetching = false;
            state.ttShop.error = true;
        },

        registerttShopStart: (state) => {
            state.ttShop.isFetching = true;
        },
        registerttShopSuccess: (state, action) => {
            state.ttShop.isFetching = false;
            state.ttShop.error = false;
            state.ttShop.ttShop = action.payload;
            state.ttShop.success = true;
        },
        registerttShopFailed: (state) => {
            state.ttShop.isFetching = false;
            state.ttShop.error = true;
            state.ttShop.success = false;
        },
        getttShopStart: (state) => {
            state.ttShop.isFetching = true;
        },
        getttShopSuccess: (state, action) => {
            state.ttShop.isFetching = false;
            state.ttShop.ttShop = action.payload;
            state.ttShop.success = true;
        },
        getttShopFailed: (state) => {
            state.ttShop.isFetching = false;
            state.ttShop.error = true;
        },
        getAllttShopStart: (state) => {
            state.ttShop.isFetching = true;
        },
        getAllttShopSuccess: (state, action) => {
            state.ttShop.isFetching = false;
            state.ttShop.allttShop = action.payload;
            state.ttShop.success = true;
        },
        getAllttShopFailed: (state) => {
            state.ttShop.isFetching = false;
            state.ttShop.error = true;
        },

        getAllttShopTimKiemStart: (state) => {
            state.ttShop.isFetching = true;
        },
        getAllttShopTimKiemSuccess: (state, action) => {
            state.ttShop.isFetching = false;
            state.ttShop.allShopTimKiem = action.payload;
            state.ttShop.success = true;
        },
        getAllttShopTimKiemFailed: (state) => {
            state.ttShop.isFetching = false;
            state.ttShop.error = true;
        },

        deletettShopStart: (state) => {
            state.ttShop.isFetching = true;
        },
        deletettShopSuccess: (state, action) => {
            state.ttShop.isFetching = false;
            state.ttShop.ttShop = action.payload;
            state.ttShop.success = true;
        },
        deletettShopFailed: (state) => {
            state.ttShop.isFetching = false;
            state.ttShop.error = true;
            state.ttShop.success = false;
        },
    },
});

export const {
    updatettShopStart,
    updatettShopSuccess,
    updatettShopFailed,
    registerttShopStart,
    registerttShopSuccess,
    registerttShopFailed,
    getttShopStart,
    getttShopSuccess,
    getttShopFailed,
    getAllttShopStart,
    getAllttShopSuccess,
    getAllttShopFailed,
    getAllttShopTimKiemStart,
    getAllttShopTimKiemSuccess,
    getAllttShopTimKiemFailed,
    deletettShopStart,
    deletettShopSuccess,
    deletettShopFailed,
    logOutSuccessttShop,
} = ttShopSlice.actions;

export default ttShopSlice.reducer;

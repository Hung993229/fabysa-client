import { createSlice } from "@reduxjs/toolkit";
const statusSlice = createSlice({
    name: "status",
    initialState: {
        status: {
            status: null,
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        logOutSuccessStatus: (state) => {
            state.status.status= null;
            state.status.isFetching= false;
            state.status.error= false;
            state.status.success= false;
        },
        updateStatusStart: (state) => {
            state.status.isFetching = true;
        },
        updateStatusSuccess: (state, action) => {
            state.status.isFetching = false;
            state.status.status = action.payload;
            state.status.success = true;
        },
        updateStatusFailed: (state) => {
            state.status.isFetching = false;
            state.status.error = true;
        },

        registerStatusStart: (state) => {
            state.status.isFetching = true;
        },
        registerStatusSuccess: (state,action) => {
            state.status.isFetching = false;
            state.status.status = action.payload;
            state.status.error = false;
            state.status.success = true;
        },
        registerStatusFailed: (state) => {
            state.status.isFetching = false;
            state.status.error = true;
            state.status.success = false;
        },
        getStatusStart: (state) => {
            state.status.isFetching = true;
        },
        getStatusSuccess: (state, action) => {
            state.status.isFetching = false;
            state.status.status = action.payload;
            state.status.success = true;
        },
        getStatusFailed: (state) => {
            state.status.isFetching = false;
            state.status.error = true;
        },
    },
});

export const {
    updateStatusStart,
    updateStatusSuccess,
    updateStatusFailed,
    registerStatusStart,
    registerStatusSuccess,
    registerStatusFailed,
    getStatusStart,
    getStatusSuccess,
    getStatusFailed,
    logOutSuccessStatus
} = statusSlice.actions;

export default statusSlice.reducer;

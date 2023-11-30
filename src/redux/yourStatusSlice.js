import { createSlice } from "@reduxjs/toolkit";
const yourStatusSlice = createSlice({
    name: "yourStatus",
    initialState: {
        yourStatus: {
            yourStatus: null,
            isFetching: false,
            error: false,
            success: false,
            allYourStatus: null,
        },
    },
    reducers: {
        logOutSuccessYourStatus: (state) => {
            state.yourStatus.yourStatus= null;
            state.yourStatus.isFetching= false;
            state.yourStatus.error= false;
            state.yourStatus.success= false;
            state.yourStatus.allYourStatus= null;
        },
        updateyourStatusStart: (state) => {
            state.yourStatus.isFetching = true;
        },
        updateyourStatusSuccess: (state, action) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.yourStatus = action.payload;
            state.yourStatus.success = true;
        },
        updateyourStatusFailed: (state) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.error = true;
        },

        registeryourStatusStart: (state) => {
            state.yourStatus.isFetching = true;
        },
        registeryourStatusSuccess: (state, action) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.error = false;
            state.yourStatus.yourStatus = action.payload;
            state.yourStatus.success = true;
        },
        registeryourStatusFailed: (state) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.error = true;
            state.yourStatus.success = false;
        },
        getyourStatusStart: (state) => {
            state.yourStatus.isFetching = true;
        },
        getyourStatusSuccess: (state, action) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.allYourStatus = action.payload;
            state.yourStatus.success = true;
        },
        getyourStatusFailed: (state) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.error = true;
        },
        deleteyourStatusStart: (state) => {
            state.yourStatus.isFetching = true;
        },
        deleteyourStatusSuccess: (state, action) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.yourStatus = action.payload;
            state.yourStatus.success = true;
        },
        deleteyourStatusFailed: (state) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.error = true;
            state.yourStatus.success = false;
        },

        deleteAllYourStatusStart: (state) => {
            state.yourStatus.isFetching = true;
        },
        deleteAllYourStatusSuccess: (state, action) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.allYourStatus = action.payload;
            state.yourStatus.success = true;
        },
        deleteAllYourStatusFailed: (state) => {
            state.yourStatus.isFetching = false;
            state.yourStatus.error = true;
        },
    },
});

export const {
    updateyourStatusStart,
    updateyourStatusSuccess,
    updateyourStatusFailed,
    registeryourStatusStart,
    registeryourStatusSuccess,
    registeryourStatusFailed,
    getyourStatusStart,
    getyourStatusSuccess,
    getyourStatusFailed,
    deleteyourStatusStart,
    deleteyourStatusSuccess,
    deleteyourStatusFailed,
    deleteAllYourStatusStart,
    deleteAllYourStatusSuccess,
    deleteAllYourStatusFailed,
    logOutSuccessYourStatus
} = yourStatusSlice.actions;

export default yourStatusSlice.reducer;

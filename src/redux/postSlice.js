import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name: "post",
    initialState: {
        post: {
            myDetail: null,
            isFetching: false,
            error: false,
            success: false,
            allPosts: null,
        },
    },
    reducers: {
        logOutSuccessPost: (state) => {
            state.post.myDetail = null;
            state.post.isFetching = false;
            state.post.error = false;
            state.post.success = false;
            state.post.allPosts = null;
        },
        registerPostStart: (state) => {
            state.post.isFetching = true;
        },
        registerPostSuccess: (state, action) => {
            state.post.isFetching = false;
            state.post.error = false;
            state.post.myDetail = action.payload;
            state.post.success = true;
        },
        registerPostFailed: (state) => {
            state.post.isFetching = false;
            state.post.error = true;
            state.post.success = false;
        },

        updatePostStart: (state) => {
            state.post.isFetching = true;
        },
        updatePostSuccess: (state, action) => {
            state.post.isFetching = false;
            state.post.myDetail = action.payload;
            state.post.success = true;
        },
        updatePostFailed: (state) => {
            state.post.isFetching = false;
            state.post.error = true;
        },

        getPostStart: (state) => {
            state.post.isFetching = true;
        },
        getPostSuccess: (state, action) => {
            state.post.isFetching = false;
            state.post.myDetail = action.payload;
            state.post.success = true;
        },
        getPostFailed: (state) => {
            state.post.isFetching = false;
            state.post.error = true;
        },
        getAllPostsStart: (state) => {
            state.post.isFetching = true;
        },
        getAllPostsSuccess: (state, action) => {
            state.post.isFetching = false;
            state.post.allPosts = action.payload;
            state.post.success = true;
        },
        getAllPostsFailed: (state) => {
            state.post.isFetching = false;
            state.post.error = true;
        },
    },
});

export const {
    registerPostStart,
    registerPostSuccess,
    registerPostFailed,
    updatePostStart,
    updatePostSuccess,
    updatePostFailed,
    getPostStart,
    getPostSuccess,
    getPostFailed,
    getAllPostsStart,
    getAllPostsSuccess,
    getAllPostsFailed,
    logOutSuccessPost,
} = postSlice.actions;

export default postSlice.reducer;

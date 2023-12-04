import axios from "./apiCustomize";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
} from "./authSlice";
import {
    deleteUserFailed,
    deleteUsersSuccess,
    deleteUserStart,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
    logOutSuccessUser,
} from "./userSlice";
import {
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
} from "./postSlice";

import {
    updateStatusStart,
    updateStatusSuccess,
    updateStatusFailed,
    registerStatusStart,
    registerStatusSuccess,
    registerStatusFailed,
    getStatusStart,
    getStatusSuccess,
    getStatusFailed,
    logOutSuccessStatus,
} from "./statusSlice";

import {
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
    logOutSuccessYourStatus,
} from "./yourStatusSlice";
import {
    updateSanPhamStart,
    updateSanPhamSuccess,
    updateSanPhamFailed,
    registerSanPhamStart,
    registerSanPhamSuccess,
    registerSanPhamFailed,
    getSanPhamStart,
    getSanPhamSuccess,
    getSanPhamFailed,
    deleteSanPhamStart,
    deleteSanPhamSuccess,
    deleteSanPhamFailed,
    logOutSuccessSanPham,
} from "./sanPhamSlice";
import {
    updatettShopStart,
    updatettShopSuccess,
    updatettShopFailed,
    registerttShopStart,
    registerttShopSuccess,
    registerttShopFailed,
    getttShopStart,
    getttShopSuccess,
    getttShopFailed,
    deletettShopStart,
    deletettShopSuccess,
    deletettShopFailed,
    logOutSuccessttShop,
} from "./ttShopSlice";

import {
    updatedonHangStart,
    updatedonHangSuccess,
    updatedonHangFailed,
    registerdonHangStart,
    registerdonHangSuccess,
    registerdonHangFailed,
    getdonHangStart,
    getdonHangSuccess,
    getdonHangFailed,
    deletedonHangStart,
    deletedonHangSuccess,
    deletedonHangFailed,
    logOutSuccessdonHang,
} from "./donHangSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/mini-game");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/dang-nhap");
    } catch (err) {
        dispatch(registerFailed());
    }
};
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get("/v1/user", {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailed());
    }
};
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete(`/v1/user/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUsersSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailed(err.response.data));
    }
};
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logOutSuccess());
        dispatch(logOutSuccessPost());
        dispatch(logOutSuccessSanPham());
        dispatch(logOutSuccessStatus());
        dispatch(logOutSuccessUser());
        dispatch(logOutSuccessYourStatus());
        dispatch(logOutSuccessttShop());
        dispatch(logOutSuccessdonHang());
        navigate("/dang-nhap");
    } catch (err) {
        dispatch(logOutFailed());
    }
};
export const registerPost = async (post, dispatch, navigate, setloading) => {
    dispatch(registerPostStart());
    try {
        const res = await axios.post("/v1/post/", post);
        dispatch(registerPostSuccess(res.data));
        setloading(0);
        navigate("/ca-nhan");
    } catch (err) {
        dispatch(registerPostFailed());
    }
};

export const updatePost = async (newPost, id, dispatch) => {
    dispatch(updatePostStart());
    try {
        const res = await axios.put(`/v1/post/${id}`, newPost);
        dispatch(updatePostSuccess(res.data));
        if (res) {
        }
    } catch (err) {
        dispatch(updatePostFailed(err));
    }
};

export const getPost = async (id, dispatch) => {
    dispatch(getPostStart());
    try {
        const res = await axios.get(`/v1/post/${id}`);
        dispatch(getPostSuccess(res.data));
    } catch (err) {
        dispatch(getPostFailed());
    }
};

export const getAllPosts = async (
    dispatch,
    gioiTinh2,
    tinhTrangHonNhan2,
    tonGiao2,
    thuNhap2,
    tuoiHop2,
    tuoiHop3,
    huyenDs,
    huyenQq,
    skip
) => {
    dispatch(getAllPostsStart());
    try {
        const res = await axios.get(
            `/v1/post/?gioiTinh2=${gioiTinh2}&tinhTrangHonNhan2=${tinhTrangHonNhan2}&tonGiao2=${tonGiao2}&thuNhap2=${thuNhap2}&tuoiHop2=${tuoiHop2}&tuoiHop3=${tuoiHop3}&huyenDs=${huyenDs}&huyenQq=${huyenQq}
            `
        );
        dispatch(getAllPostsSuccess(res.data));
    } catch (err) {
        dispatch(getAllPostsFailed());
    }
};
export const updateStatusUser = async (statusUser, id, dispatch) => {
    dispatch(updateStatusStart());
    try {
        const res = await axios.put(`/v1/status/${id}`, statusUser);
        dispatch(updateStatusSuccess(res.data));
    } catch (err) {
        dispatch(updateStatusFailed(err.response.data));
    }
};
export const registerStatus = async (statusUser, dispatch) => {
    dispatch(registerStatusStart());
    try {
        const res = await axios.post("/v1/status/add-status", statusUser);
        dispatch(registerStatusSuccess(res.data));
    } catch (err) {
        dispatch(registerStatusFailed());
    }
};
export const getStatus = async (id, dispatch) => {
    dispatch(getStatusStart());
    try {
        const res = await axios.get(`/v1/status/${id}`);
        dispatch(getStatusSuccess(res.data));
    } catch (err) {
        dispatch(getStatusFailed());
    }
};

export const updateYourStatusUser = async (statusUser, id, dispatch) => {
    dispatch(updateyourStatusStart());
    try {
        const res = await axios.put(`/v1/your-status/${id}`, statusUser);
        dispatch(updateyourStatusSuccess(res.data));
    } catch (err) {
        dispatch(updateyourStatusFailed(err.response.data));
    }
};
export const registerYourStatus = async (statusUser, dispatch) => {
    dispatch(registeryourStatusStart());
    try {
        const res = await axios.post("/v1/your-status/add-status", statusUser);
        dispatch(registeryourStatusSuccess(res.data));
    } catch (err) {
        dispatch(registeryourStatusFailed());
    }
};
export const getYourStatus = async (id, dispatch) => {
    dispatch(getyourStatusStart());
    try {
        const res = await axios.get(`/v1/your-status/${id}`);
        dispatch(getyourStatusSuccess(res.data));
    } catch (err) {
        dispatch(getyourStatusFailed());
    }
};
export const deleteYourStatus = async (id, dispatch) => {
    dispatch(deleteyourStatusStart());
    try {
        const res = await axios.delete(`/v1/your-status/${id}`);
        dispatch(deleteyourStatusSuccess(res.data));
    } catch (err) {
        dispatch(deleteyourStatusFailed());
    }
};

export const deleteAllYourStatus = async (id, dispatch) => {
    dispatch(deleteAllYourStatusStart());
    try {
        const res = await axios.delete(`/v1/your-status//delete-many/${id}`);
        dispatch(deleteAllYourStatusSuccess(res.data));
    } catch (err) {
        dispatch(deleteAllYourStatusFailed());
    }
};
// sanPham
export const registerSanPham = async (newSanPham, dispatch) => {
    dispatch(registerSanPhamStart());
    try {
        const res = await axios.post("/v1/shop/san-pham", newSanPham);
        dispatch(registerSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(registerSanPhamFailed());
    }
};
export const getSanPham = async (user, dispatch) => {
    dispatch(getSanPhamStart());
    try {
        const res = await axios.get(`/v1/shop/san-pham/?user=${user}`);
        dispatch(getSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamFailed());
    }
};

export const getSanPhamDan = async (huyen, dispatch) => {
    dispatch(getSanPhamStart());
    try {
        const res = await axios.get(`/v1/shop/san-pham-dan/?huyen=${huyen}`);
        dispatch(getSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamFailed());
    }
};
export const getKhoTongSi = async (huyen, dispatch) => {
    dispatch(getSanPhamStart());
    try {
        const res = await axios.get(`/v1/shop/kho-tong-si/?huyen=${huyen}`);
        dispatch(getSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamFailed());
    }
};

export const deleteSanPham = async (id, dispatch) => {
    dispatch(deleteSanPhamStart());
    try {
        const res = await axios.delete(`/v1/shop/san-pham/${id}`);
        dispatch(deleteSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(deleteSanPhamFailed());
    }
};
export const updateSanPham = async (newSanPham, id, dispatch) => {
    dispatch(updateSanPhamStart());
    try {
        const res = await axios.put(`/v1/shop/san-pham/${id}`, newSanPham);
        dispatch(updateSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(updateSanPhamFailed(err.response.data));
    }
};
// ttShop
export const registerttShop = async (newShop, dispatch) => {
    dispatch(registerttShopStart());
    try {
        const res = await axios.post("/v1/shop/thong-tin-shop", newShop);
        dispatch(registerttShopSuccess(res.data));
    } catch (err) {
        dispatch(registerttShopFailed());
    }
};

export const getttShop = async (userId, dispatch) => {
    dispatch(getttShopStart());
    try {
        const res = await axios.get(
            `/v1/shop/thong-tin-shop/?userId=${userId}`
        );
        dispatch(getttShopSuccess(res.data));
    } catch (err) {
        dispatch(getttShopFailed());
    }
};

export const updatettShop = async (newShop, id, dispatch) => {
    dispatch(updatettShopStart());
    try {
        const res = await axios.put(`/v1/shop/thong-tin-shop/${id}`, newShop);
        dispatch(updatettShopSuccess(res.data));
    } catch (err) {
        dispatch(updatettShopFailed(err.response.data));
    }
};
// donHang

export const registerDonHang = async (newDonHang, dispatch) => {
    dispatch(registerdonHangStart());
    try {
        const res = await axios.post("/v1/shop/don-hang", newDonHang);
        dispatch(registerdonHangSuccess(res.data));
    } catch (err) {
        dispatch(registerdonHangFailed());
    }
};
export const updateDonHang = async (newDonHang, id, dispatch) => {
    dispatch(updatedonHangStart());
    try {
        const res = await axios.put(`/v1/shop/don-hang/${id}`, newDonHang);
        dispatch(updatedonHangSuccess(res.data));
    } catch (err) {
        dispatch(updatedonHangFailed(err.response.data));
    }
};
export const getDonHang = async (userId, trangThaiDH, dispatch) => {
    dispatch(getdonHangStart());
    try {
        const res = await axios.get(
            `/v1/shop/don-hang/?userId=${userId}&trangThaiDH=${trangThaiDH}`
        );
        dispatch(getdonHangSuccess(res.data));
    } catch (err) {
        dispatch(getdonHangFailed());
    }
};

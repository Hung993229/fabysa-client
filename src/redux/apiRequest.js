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
    changePasswordSuccess,
    changePasswordFailed,
    changePasswordStart,
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
    getAllttShopStart,
    getAllttShopSuccess,
    getAllttShopFailed,
    getAllttShopTimKiemStart,
    getAllttShopTimKiemSuccess,
    getAllttShopTimKiemFailed,
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
    getOnedonHangStart,
    getOnedonHangSuccess,
    getOnedonHangFailed,
    deletedonHangStart,
    deletedonHangSuccess,
    deletedonHangFailed,
    logOutSuccessdonHang,
} from "./donHangSlice";

import {
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
} from "./gioHangSlice";

import {
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
} from "./taiKhoanSlice";
export const loginUser = async (user, setdangNhapOk, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        setdangNhapOk(1);
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const changePassword = async (userNew, setdoiThanhCong, dispatch) => {
    dispatch(changePasswordStart());
    try {
        const res = await axios.post("/v1/auth/change-password", userNew);
        dispatch(changePasswordSuccess(res.data));
        setdoiThanhCong(true);
    } catch (err) {
        dispatch(changePasswordFailed());
    }
};

export const registerUser = async (user, setthanhCong, dispatch) => {
    dispatch(registerStart());
    try {
        await axios.post("/v1/auth/register", user);
        dispatch(registerSuccess());
        setthanhCong(1);
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
export const logOut = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logOutSuccess());
        dispatch(logOutSuccessSanPham());
        dispatch(logOutSuccessStatus());
        dispatch(logOutSuccessUser());
        dispatch(logOutSuccessPost());
        dispatch(logOutSuccessYourStatus());
        dispatch(logOutSuccessttShop());
        dispatch(logOutSuccessdonHang());
        dispatch(logOutSuccessgioHang());
        dispatch(logOutSuccessTaiKhoan());
    } catch (err) {
        dispatch(logOutFailed());
    }
};
export const registerPost = async (post, dispatch) => {
    dispatch(registerPostStart());
    try {
        const res = await axios.post("/v1/post/", post);
        dispatch(registerPostSuccess(res.data));
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

export const updateYourStatusUser = async (
    statusUser,
    id,
    setloading,
    dispatch
) => {
    dispatch(updateyourStatusStart());
    try {
        const res = await axios.put(`/v1/your-status/${id}`, statusUser);
        dispatch(updateyourStatusSuccess(res.data));
        setloading(0);
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
export const registerSanPham = async (newSanPham, dispatch, setloading) => {
    dispatch(registerSanPhamStart());
    try {
        const res = await axios.post("/v1/shop/san-pham", newSanPham);
        dispatch(registerSanPhamSuccess(res.data));
        setloading(2);
    } catch (err) {
        dispatch(registerSanPhamFailed());
        setloading(0);
    }
};
export const getSanPham = async (
    idShop,
    nhomSP,
    sort,
    skip,
    limit,
    dispatch
) => {
    dispatch(getSanPhamStart());
    try {
        const res = await axios.get(
            `/v1/shop/san-pham/?idShop=${idShop}&nhomSP=${nhomSP}&sort=${sort}&skip=${skip}&limit=${limit}`
        );
        dispatch(getSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamFailed());
    }
};

export const getAllSanPham = async (idShop, skip, limit, dispatch) => {
    dispatch(getSanPhamStart());
    try {
        const res = await axios.get(
            `/v1/shop/all-san-pham/?idShop=${idShop}&skip=${skip}&limit=${limit}`
        );
        dispatch(getSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamFailed());
    }
};
export const getSanPhamDanHuyen = async (huyen, skip, limit, dispatch) => {
    dispatch(getSanPhamDanStart());
    try {
        const res = await axios.get(
            `/v1/shop/san-pham-dan-huyen/?huyen=${huyen}&skip=${skip}&limit=${limit}`
        );
        dispatch(getSanPhamDanSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamDanFailed());
    }
};
export const getSanPhamDanHuyen2 = async (huyen, skip, limit, dispatch) => {
    dispatch(getSanPhamDanStart());
    try {
        const res = await axios.get(
            `/v1/shop/san-pham-dan-huyen2/?huyen=${huyen}&skip=${skip}&limit=${limit}`
        );
        dispatch(getSanPhamDanSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamDanFailed());
    }
};
export const getKhoTongSi = async (huyen, user, dispatch) => {
    dispatch(getSanPhamStart());
    try {
        const res = await axios.get(
            `/v1/shop/kho-tong-si/?huyen=${huyen}&user=${user}`
        );
        dispatch(getSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getSanPhamFailed());
    }
};

export const getArrSanPham = async (arrIdSanPham, dispatch) => {
    dispatch(getArrSanPhamStart());
    try {
        const res = await axios.post(`/v1/shop/arr-san-pham`, arrIdSanPham);
        dispatch(getArrSanPhamSuccess(res.data));
    } catch (err) {
        dispatch(getArrSanPhamFailed());
    }
};
export const deleteSanPham = async (id, setloading, dispatch) => {
    dispatch(deleteSanPhamStart());
    try {
        const res = await axios.delete(`/v1/shop/san-pham/${id}`);
        dispatch(deleteSanPhamSuccess(res.data));
        setloading(0);
    } catch (err) {
        dispatch(deleteSanPhamFailed());
    }
};
export const updateSanPham = async (
    newSanPham,
    id,
    setloading,
    setthongTinSp,
    dispatch
) => {
    dispatch(updateSanPhamStart());
    try {
        const res = await axios.put(`/v1/shop/san-pham/${id}`, newSanPham);
        dispatch(updateSanPhamSuccess(res.data));
        setloading(4);
        setthongTinSp(newSanPham);
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

export const getttShop = async (id, dispatch) => {
    dispatch(getttShopStart());
    try {
        const res = await axios.get(`/v1/shop/thong-tin-shop/?id=${id}`);
        dispatch(getttShopSuccess(res.data));
    } catch (err) {
        dispatch(getttShopFailed());
    }
};
export const getAllttShop = async (idShop, dispatch) => {
    dispatch(getAllttShopStart());
    try {
        const res = await axios.get(
            `/v1/shop/thong-tin-all-shop/?idShop=${idShop}`
        );
        dispatch(getAllttShopSuccess(res.data));
    } catch (err) {
        dispatch(getAllttShopFailed());
    }
};
export const getAllttShopTimKiem = async (
    tenSdt,
    tinh,
    huyen,
    xa,
    kinhDo,
    viDo,
    skip,
    limit,
    dispatch
) => {
    dispatch(getAllttShopTimKiemStart());
    try {
        const res = await axios.get(
            `/v1/shop/tim-kiem-all-shop/?tenSdt=${tenSdt}&tinh=${tinh}&huyen=${huyen}&xa=${xa}&kinhDo=${kinhDo}&viDo=${viDo}&skip=${skip}&limit=${limit}`
        );
        dispatch(getAllttShopTimKiemSuccess(res.data));
    } catch (err) {
        dispatch(getAllttShopTimKiemFailed());
    }
};

export const updatettShop = async (newShop, id, dispatch, setloading) => {
    dispatch(updatettShopStart());
    try {
        const res = await axios.put(`/v1/shop/thong-tin-shop/${id}`, newShop);
        dispatch(updatettShopSuccess(res.data));
        setloading(0);
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
export const getDonHang = async (
    idShop,
    sdtCtv,
    sdtKhachHang,
    sdtOrder,
    sdtXuLyDon,
    sdtGiaoHang,
    sdtThuTien,
    kinhDo,
    viDo,
    skip,
    limit,
    trangThaiDH,
    dispatch
) => {
    dispatch(getdonHangStart());
    try {
        const res = await axios.get(
            `/v1/shop/don-hang/?idShop=${idShop}&sdtCtv=${sdtCtv}&sdtKhachHang=${sdtKhachHang}&sdtOrder=${sdtOrder}&sdtXuLyDon=${sdtXuLyDon}&sdtGiaoHang=${sdtGiaoHang}&sdtThuTien=${sdtThuTien}&kinhDo=${kinhDo}&viDo=${viDo}&skip=${skip}&limit=${limit}&trangThaiDH=${trangThaiDH}`
        );
        dispatch(getdonHangSuccess(res.data));
    } catch (err) {
        dispatch(getdonHangFailed());
    }
};

export const getOneDonHang = async (idShop, soBan, dispatch) => {
    dispatch(getOnedonHangStart());
    try {
        const res = await axios.get(
            `/v1/shop/one-don-hang/?idShop=${idShop}&soBan=${soBan}`
        );
        dispatch(getOnedonHangSuccess(res.data));
    } catch (err) {
        dispatch(getOnedonHangFailed());
    }
};
// Don Hang
// Gio Hang
export const registerGioHang = async (newGioHang, dispatch) => {
    dispatch(registergioHangStart());
    try {
        const res = await axios.post("/v1/shop/gio-hang", newGioHang);
        dispatch(registergioHangSuccess(res.data));
    } catch (err) {
        dispatch(registergioHangFailed());
    }
};
export const updateGioHang = async (newGioHang, id, dispatch) => {
    dispatch(updategioHangStart());
    try {
        const res = await axios.put(`/v1/shop/gio-hang/${id}`, newGioHang);
        dispatch(updategioHangSuccess(res.data));
    } catch (err) {
        dispatch(updategioHangFailed(err.response.data));
    }
};
export const getAllGioHang = async (user, dispatch) => {
    dispatch(getAllGioHangStart());
    try {
        const res = await axios.get(`/v1/shop/all-gio-hang/?user=${user}`);
        dispatch(getAllGioHangSuccess(res.data));
    } catch (err) {
        dispatch(getAllGioHangFailed());
    }
};
export const getGioHang = async (idShop, user, dispatch) => {
    dispatch(getgioHangStart());
    try {
        const res = await axios.get(
            `/v1/shop/gio-hang/?idShop=${idShop}&user=${user}`
        );
        dispatch(getgioHangSuccess(res.data));
    } catch (err) {
        dispatch(getgioHangFailed());
    }
};
export const deleteGioHang = async (id, dispatch) => {
    dispatch(deletegioHangStart());
    try {
        const res = await axios.delete(`/v1/shop/gio-hang/${id}`);
        dispatch(deletegioHangSuccess(res.data));
    } catch (err) {
        dispatch(deletegioHangFailed());
    }
};
// Gio Hang
export const registerTaiKhoan = async (newTaiKhoan, dispatch) => {
    dispatch(registerTaiKhoanStart());
    try {
        const res = await axios.post(
            "/v1/tai-khoan/tai-khoan-moi",
            newTaiKhoan
        );
        dispatch(registerTaiKhoanSuccess(res.data));
    } catch (err) {
        dispatch(registerTaiKhoanFailed());
    }
};
export const getTaiKhoan = async (id, dispatch) => {
    dispatch(getTaiKhoanStart());
    try {
        const res = await axios.get(`/v1/tai-khoan/${id}`);
        dispatch(getTaiKhoanSuccess(res.data));
    } catch (err) {
        dispatch(getTaiKhoanFailed());
    }
};
export const getAllTaiKhoan = async (dispatch) => {
    dispatch(getAllTaiKhoanStart());
    try {
        const res = await axios.get(`/v1/tai-khoan`);
        dispatch(getAllTaiKhoanSuccess(res.data));
    } catch (err) {
        dispatch(getAllTaiKhoanFailed());
    }
};
export const updateTaiKhoan = async (newTaiKhoan, id, dispatch) => {
    dispatch(updateTaiKhoanStart());
    try {
        const res = await axios.put(`/v1/tai-khoan/${id}`, newTaiKhoan);
        dispatch(updateTaiKhoanSuccess(res.data));
    } catch (err) {
        dispatch(updateTaiKhoanFailed());
    }
};
export const deleteTaiKhoan = async (id, dispatch) => {
    dispatch(deleteyourStatusStart());
    try {
        const res = await axios.delete(`/v1/tai-khoan/${id}`);
        dispatch(deleteyourStatusSuccess(res.data));
    } catch (err) {
        dispatch(deleteyourStatusFailed());
    }
};

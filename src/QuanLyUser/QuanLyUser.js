import { useEffect } from "react";
import "./QuanLyUser.scss";
import {
    getAllUsers,
    deleteUser,
    changePassword,
    getAllttShop,
} from "../redux/apiRequest";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../createInstance";
import { loginSuccess } from "../redux/authSlice";
import { useState } from "react";

const QuanLyUser = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);
    const msg = useSelector((state) => state.users?.msg);
    const allPosts = useSelector((state) => state.post?.post.allPosts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const yourDetail = useSelector((state) => state.post.post?.yourDetail);
    const allShop = useSelector(
        (state) => state.ttShop.ttShop.allttShop?.AllShop
    );
    const [idShop, setidShop] = useState();
    const [sodienThoai, setsodienThoai] = useState();
    const [doiThanhCong, setdoiThanhCong] = useState(false);
    const handleDelete = (id) => {
        deleteUser(user?.accessToken, dispatch, id, axiosJWT);
    };

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, [user, dispatch]);
    useEffect(() => {
        if (idShop) {
            getAllttShop(idShop, dispatch);
        }
    }, [idShop]);
    useEffect(() => {
        if (sodienThoai) {
            const iduser = userList?.find(
                (item) => item.username === sodienThoai
            );
            setidShop(iduser?._id);
        }
    }, [sodienThoai]);
    const handleResetPassword = (item) => {
        const userNew = {
            username: item.username,
            id: item._id,
            password: "admisdsddsdsdszswsn",
            passwordNew: "123456789",
            passwordNew2: "123456789",
        };
        changePassword(userNew, setdoiThanhCong, dispatch);
    };
    useEffect(() => {
        if (doiThanhCong === true) {
            alert("Đổi Mật Khẩu Thành Công");
            setdoiThanhCong(false);
        }
    }, [doiThanhCong]);
    return (
        <div className="home-container">
            <a href={"/ca-nhan"}>Quay Lại</a>
            {user?.admin === true && (
                <div>
                    <div className="inputDangNhap">
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => setsodienThoai(e.target.value)}
                        />
                    </div>
                    {userList?.map((item) => {
                        return (
                            <div key={item._id}>
                                <button
                                    className="sdt"
                                    onClick={() => setidShop(item._id)}
                                >
                                    {item.username}
                                </button>
                                <button
                                    className="repass"
                                    onClick={() => handleResetPassword(item)}
                                >
                                    RePass
                                </button>
                                <div> {item._id}</div>
                                {allShop?.map((item2) => {
                                    return (
                                        <div key={item2._id}>
                                            {item?._id === item2?.user && (
                                                <a
                                                    href={`/update-shop/${item2._id}`}
                                                >
                                                    {item2.TenShop}
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default QuanLyUser;

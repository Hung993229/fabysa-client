import { useEffect } from "react";
import "./QuanLyUser.scss";
import { getAllUsers, deleteUser, updatePost } from "../redux/apiRequest";
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
    const [suaPost, setsuaPost] = useState();
    const [vaiTro, setvaiTro] = useState();
    const [hoTen, sethoTen] = useState();
    const [loading, setloading] = useState(1);
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
    const handleThongTinUser = (id) => {
        setvaiTro(yourDetail?.vaiTro);
        sethoTen(yourDetail?.hoTen);
    };
    const handleSuaVaiTroUser = () => {
        const newPost = {
            vaiTro: 0,
        };
        setvaiTro(0);
        const id = yourDetail._id;
        updatePost(newPost, id, dispatch, setsuaPost);
    };
    const handleSuaVaiTroBanHang = () => {
        const newPost = {
            vaiTro: 1,
        };
        setvaiTro(1);
        const id = yourDetail._id;
        updatePost(newPost, id, dispatch, setsuaPost);
    };
    const handleSuaVaiTroQuanLy = () => {
        const newPost = {
            vaiTro: 2,
        };
        const id = yourDetail._id;
        setvaiTro(2);
        updatePost(newPost, id, dispatch, setsuaPost);
    };

    return (
        <main className="home-container">
            <div>
                <div>
                    <a href={`/ca-nhan`}>
                        <button className="buttonQuanly">Quay Lại</button>
                    </a>
                </div>
                <div className="home-title">Tất Cả Tài Khoản</div>
                <div className="home-role">
                    {`Xin Chào: ${user?.admin ? `Admin` : `User`}`}
                </div>
                <div className="home-userlist">
                    {userList?.map((user) => {
                        return (
                            <div className="user-container" key={user._id}>
                                <div
                                    className="home-user"
                                    onClick={() => handleThongTinUser(user._id)}
                                >
                                    {user.username}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="QuanLYVaiTro">
                    {yourDetail && yourDetail.length !== 0 ? (
                        <div>
                            <div className="vaiTro">
                                <div>{hoTen}</div>
                                <div>{+vaiTro === 0 && <div>User</div>}</div>
                                <div>
                                    {+vaiTro === 1 && <div>Ban Hang</div>}
                                </div>
                                <div>{+vaiTro === 2 && <div>Quan Ly</div>}</div>
                                <div>{!vaiTro && <div>Chua Cap Nhat</div>}</div>
                            </div>
                            <div>Sửa Vai Trò</div>
                            <div>
                                <button
                                    className="buttonQuanly"
                                    onClick={handleSuaVaiTroUser}
                                >
                                    User
                                </button>
                                <button
                                    className="buttonQuanly"
                                    onClick={handleSuaVaiTroBanHang}
                                >
                                    Ban Hang
                                </button>
                                <button
                                    className="buttonQuanly"
                                    onClick={handleSuaVaiTroQuanLy}
                                >
                                    Quan Ly
                                </button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </main>
    );
};
export default QuanLyUser;

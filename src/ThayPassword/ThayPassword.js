import "./ThayPassword.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, logOut } from "../redux/apiRequest";
import { createAxios } from "../../src/createInstance";
import { logOutSuccess } from "../redux/authSlice";
import { useState } from "react";
import { useEffect } from "react";
const ThayPassword = (props) => {
    const { setthayPass } = props;
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);
    const changePass = useSelector((state) => state.auth.changePass);
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordNew2, setPasswordNew2] = useState("");
    const [doiThanhCong, setdoiThanhCong] = useState(false);
    const handleChangePassword = (e) => {
        e.preventDefault();
        if (!password || !passwordNew || !passwordNew2) {
            alert("Vui lòng nhập đủ thông tin!");
        } else {
            if (passwordNew !== passwordNew2) {
                alert("Xác nhận mật khẩu chưa khớp!");
            } else {
                const userNew = {
                    username: user.username,
                    id: user._id,
                    password: password,
                    passwordNew: passwordNew,
                    passwordNew2: passwordNew2,
                };
                console.log("userNew", userNew);
                changePassword(userNew, setdoiThanhCong, dispatch);
            }
        }
    };
    useEffect(() => {
        if (doiThanhCong === true) {
            logOut(dispatch, id, accessToken, axiosJWT);
            navigate("/dang-nhap");
            alert("Đổi Mật Khẩu Thành Công");
        }
    }, [doiThanhCong]);

    return (
        <div className="ThayPassword">
            <div className="login-container">
                <div className="login-title"> Đổi Mật Khẩu</div>
                {changePass?.error === true && (
                    <div className="baoLoi">Mật khẩu chưa hợp lệ!</div>
                )}
                <form onSubmit={handleChangePassword}>
                    <label className="labelDangNhap">Mật Khẩu Cũ</label>
                    <div>
                        <input
                            className="inputDangNhap"
                            type="text"
                            placeholder="Nhập mật khẩu cũ"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <label className="labelDangNhap">Mật Khẩu Mới</label>
                    <div>
                        <input
                            className="inputDangNhap"
                            type="text"
                            placeholder="Nhập mật khẩu mới"
                            onChange={(e) => setPasswordNew(e.target.value)}
                        />
                    </div>
                    <label className="labelDangNhap">
                        Nhập Lại Mật Khẩu Mới
                    </label>
                    <div>
                        <input
                            className="inputDangNhap"
                            type="text"
                            placeholder="Nhập lại mật khẩu mới"
                            onChange={(e) => setPasswordNew2(e.target.value)}
                        />
                    </div>
                    <button className="quayLai">
                        <a href={"/ca-nhan"}>Quay Lại</a>
                    </button>
                    <button type="submit" className="buttonDangNhap">
                        Lưu Mật Khẩu
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ThayPassword;

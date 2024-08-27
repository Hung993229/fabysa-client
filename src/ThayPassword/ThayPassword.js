import "./ThayPassword.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword, logOut } from "../redux/apiRequest";
import { createAxios } from "../../src/createInstance";
import { logOutSuccess } from "../redux/authSlice";
import { useState } from "react";
import { useEffect } from "react";
const ThayPassword = (props) => {
    const { loading, setloading } = props;
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
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
    const handleChangePassword = () => {
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
            alert("Đổi Mật Khẩu Thành Công");
            if (!idShop || idShop === "a") {
                navigate(`/dang-nhap/a/a/a/a/a/a`);
            } else {
                navigate(
                    `/dang-nhap/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`
                );
            }
        }
    }, [doiThanhCong]);

    return (
        <div className="thayPassword-container">
            <div className="quayLai-tieuDe2">
                <div onClick={() => setloading(0)} className="quayLai">
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </div>
                <div className="tieuDe">Đổi Mật Khẩu</div>
            </div>
            <div className="login-container">
                {changePass?.error === true && (
                    <div className="baoLoi">Mật khẩu chưa hợp lệ!</div>
                )}
                <div className="labelDangNhap">Mật Khẩu Cũ</div>
                <div>
                    <input
                        className="inputDangNhap"
                        type="text"
                        placeholder="Nhập mật khẩu cũ"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="labelDangNhap">Mật Khẩu Mới</div>
                <div>
                    <input
                        className="inputDangNhap"
                        type="text"
                        placeholder="Nhập mật khẩu mới"
                        onChange={(e) => setPasswordNew(e.target.value)}
                    />
                </div>
                <div className="labelDangNhap">Nhập Lại Mật Khẩu Mới</div>
                <div>
                    <input
                        className="inputDangNhap"
                        type="text"
                        placeholder="Nhập lại mật khẩu mới"
                        onChange={(e) => setPasswordNew2(e.target.value)}
                    />
                </div>

                <div
                    onClick={() => handleChangePassword()}
                    className="buttonDangNhap"
                >
                    Lưu Mật Khẩu
                </div>
            </div>
        </div>
    );
};
export default ThayPassword;

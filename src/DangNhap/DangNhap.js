import "./DangNhap.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo.jpg";
const DangNhap = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        };
        loginUser(user, dispatch, navigate);
    };
    return (
        <div className="login-containerTo">
            <div className="login-container">
                <div className="login-title"> ĐĂNG NHẬP</div>
                <form onSubmit={handleLogin}>
                    <label className="labelDangNhap">Sô Điện Thoại</label>
                    <div>
                        <input
                            className="inputDangNhap"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <label className="labelDangNhap">Mật Khẩu</label>
                    <div>
                        <input
                            className="inputDangNhap"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="buttonDangNhap">
                        Đăng Nhập
                    </button>
                </form>
                <div className="login-register"> Nếu chưa có tài khoản? </div>
                <NavLink className="login-register-link" to="/dang-ki">
                    Đăng Kí Ngay
                </NavLink>
                <div className="logoDangNhap">
                    <img src={logo} alt="he" />
                </div>
                <div className="sloganDangNhap">
                    Thời gian thích hợp gặp một người thích hợp là Hạnh Phúc!
                </div>
            </div>
        </div>
    );
};
export default DangNhap;

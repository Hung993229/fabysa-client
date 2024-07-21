import "./DangKi.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/apiRequest";
import logo from "../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const DangKi = () => {
    const register = useSelector((state) => state.auth.register);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [thanhCong, setthanhCong] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== email) {
            alert("Xác nhận mật khẩu chưa khớp");
            return;
        } else {
            if (!password || !username) {
                alert("Vui lòng nhập đầy dủ thông tin");
                return;
            } else {
                try {
                    const newUser = {
                        email: email,
                        password: password,
                        username: username,
                    };
                    registerUser(newUser, setthanhCong, dispatch);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    useEffect(() => {
        if (thanhCong === 1) {
            navigate("/dang-nhap");
        }
    }, [thanhCong]);

    return (
        <div className="register-containerTo">
            <div className="register-container">
                <div className="login-title"> ĐĂNG KÍ </div>
                {register?.error === true && (
                    <div className="baoLoi">Tài khoản hoặc mật khẩu chưa hợp lệ!</div>
                )}
                <form onSubmit={handleRegister}>
                    <label className="labelDangNhap">Số Điện Thoại</label>
                    <div>
                        {" "}
                        <input
                            className="inputDangNhap"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <label className="labelDangNhap">Mật Khẩu</label>
                    <div>
                        {" "}
                        <input
                            className="inputDangNhap"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <label className="labelDangNhap">Nhập Lại Mật Khẩu</label>
                    <div>
                        <input
                            className="inputDangNhap"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="buttonDangNhap" type="submit">
                        Tạo Tài Khoản
                    </button>
                    <div className="login-register"> Nếu có tài khoản? </div>
                    <NavLink className="login-register-link" to="/dang-nhap">
                        Đăng Nhập Ngay
                    </NavLink>
                    <div className="logoDangNhap">
                        <img src={logo} alt="he" />
                    </div>
                    {/* <div className="sloganDangNhap">
                        Thời gian thích hợp gặp một người thích hợp là Hạnh
                        Phúc!
                    </div> */}
                </form>
            </div>
        </div>
    );
};
export default DangKi;

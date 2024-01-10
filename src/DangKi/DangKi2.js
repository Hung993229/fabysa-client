import "./DangKi.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/apiRequest";
import logo from "../assets/images/logo.jpg";
import { NavLink, useParams } from "react-router-dom";
const DangKi = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    console.log("idShop", idShop);
    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== email) {
            alert("Xác nhận mật khẩu chưa khớp");
            return;
        }
        try {
            const newUser = {
                email: email,
                password: password,
                username: username,
            };
            registerUser(newUser, dispatch);
            navigate(`/shop/dang-nhap/${idShop}`);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="register-containerTo">
            <div className="register-container">
                <div className="login-title"> ĐĂNG KÍ </div>
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
                    <NavLink
                        className="login-register-link"
                        to={`/shop/dang-nhap/${idShop}`}
                    >
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

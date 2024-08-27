import "./DangNhap.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.jpg";
import { useEffect } from "react";
const DangNhap = () => {
    const register = useSelector((state) => state.auth.register);
    const login = useSelector((state) => state.auth.login);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dangNhapOk, setdangNhapOk] = useState(0);
    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Thiếu thông tin tài khoản!");
        } else {
            const user = {
                username: username,
                password: password,
            };
            loginUser(user, setdangNhapOk, dispatch);
        }
    };
    useEffect(() => {
        if (dangNhapOk === 1) {
            navigate(
                `/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`
            );
        }
    }, [dangNhapOk]);
    const handleQuenMk = () => {
        const doiMk = window.confirm("Cần hỗ trợ đổi mật khẩu?");
        if (doiMk) {
            window.location = `https://www.facebook.com/profile.php?id=61563450972545`;
        }
    };

    return (
        <div className="login-containerTo">
            <div className="quayLai-tieuDe">
                <a
                    href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                    className="quayLai"
                >
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </a>
                <div className="tieuDe">Fabysa</div>
            </div>

            <div className="login-container">
                <div className="fast">Fast - Buy - Sale</div>
                <div className="logoDangNhap">
                    <img src={logo} alt="he" />
                </div>

                {login?.error === true && (
                    <div className="baoLoi">
                        Tài khoản hoặc mật khẩu chưa đúng!
                    </div>
                )}
                {register?.success === true && (
                    <div className="baoLoi">Đăng kí Tài Khoản Thành Công</div>
                )}
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
                <div onClick={() => handleQuenMk()} className="quenMk">
                    Quên mật khẩu?
                </div>
                <div className="login-register"> Nếu chưa có tài khoản? </div>
                <NavLink
                    className="login-register-link"
                    to={`/dang-ki/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                >
                    Tạo Tài Khoản Mới
                </NavLink>
            </div>
        </div>
    );
};
export default DangNhap;

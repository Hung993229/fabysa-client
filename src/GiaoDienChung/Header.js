import "./Header.scss";
import logo from "../assets/images/logo.jpg";
import giohang from "../assets/images/giohang2.jpg";
import logo2 from "../assets/images/logo2.jpeg";
import gold from "../assets/images/Gold.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatus, getPost } from "../redux/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import currency from "currency.js";
import { NavLink } from "react-router-dom";
const Header = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            getStatus(user?._id, dispatch);
        }
    }, [user, dispatch]);
    useEffect(() => {
        if (user) {
            getPost(user?._id, dispatch);
        }
    }, [user, dispatch]);

    const cash = currency(myDetail?.cash, {
        symbol: "$",
        separator: ".",
        decimal: ",",
    })
        .format()
        .slice(0, -3);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const { idShop, idUser } = useParams();
    return (
        <>
            <div className="container-header">
                <div className="container-logo">
                    <div>
                        <img src={giohang} alt="he" className="logo" />
                        <span className="tongSoLuong">0</span>
                        <div className="my-cash2">{VND.format(0)}</div>
                    </div>
                </div>

                <div className="title">Xin Kính Chào Quý Khách !</div>
                <div className="my-detail">
                    {myDetail && myDetail.length !== 0 ? (
                        <a href="/ca-nhan2">
                            <img
                                src={myDetail?.avatar}
                                alt="Avatar"
                                className="my-avatar"
                            />
                            <div className="my-cash">
                                <div className="my-cash-title">{cash} </div>

                                <img src={gold} className="gold" alt="timtim" />
                            </div>
                        </a>
                    ) : (
                        <a href="/dang-nhap">
                            <img
                                src={logo2}
                                alt="Avatar"
                                className="my-avatar"
                            />
                            <div className="my-cash">
                                <div className="dangNhap">Đăng Nhập</div>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </>
    );
};
export default Header;

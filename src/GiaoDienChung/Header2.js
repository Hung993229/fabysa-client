import "./Header.scss";
import logo from "../assets/images/logo.jpg";
import tuvanvien from "../assets/images/tuvanvien.jpg";
import gold from "../assets/images/Gold.png";
import logo2 from "../assets/images/logo2.jpeg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatus, getPost } from "../redux/apiRequest";
import currency from "currency.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
const Header = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const dispatch = useDispatch();
    const { idShop } = useParams();
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

    return (
        <>
            <div className="container-header container-header3">
                <div className="container-logo">
                    <div>
                        <img src={tuvanvien} alt="he" className="logo" />

                        <div className="my-cash2">Welcome to</div>
                    </div>
                </div>
                <div className="title2">Kính Chào Quý Khách</div>
                <div className="my-detail">
                    {myDetail && myDetail.length !== 0 ? (
                        <img
                            src={myDetail?.avatar}
                            alt="Avatar"
                            className="my-avatar"
                        />
                    ) : (
                        <img src={logo2} alt="Avatar" className="my-avatar" />
                    )}
                    {myDetail && myDetail.length !== 0 ? (
                        <a href={`/shop/ca-nhan/${idShop}`}>
                            <div className="my-cash">
                                <div className="my-cash-title">{cash} </div>

                                <img src={gold} className="gold" alt="timtim" />
                            </div>
                        </a>
                    ) : (
                        <a href={`/shop/dang-nhap/${idShop}`}>
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

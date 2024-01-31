import "./Header.scss";
import logo from "../assets/images/logo.jpg";
import giohang from "../assets/images/giohang.jpg";
import gold from "../assets/images/Gold.png";
import logo2 from "../assets/images/logo2.jpeg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStatus, getPost } from "../redux/apiRequest";
import { useState } from "react";
import currency from "currency.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
const Header = (props) => {
    const { showcart, setshowcart, Tongtien, Tongsoluong } = props;
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
    const { idShop } = useParams();

    return (
        <>
            <div className="container-header container-header3">
                <div className="container-logo">
                    <div onClick={() => setshowcart(1)}>
                        <img src={giohang} alt="he" className="logo" />
                        {/* <i className="fa-solid fa-cart-plus"></i> */}
                        <span className="tongSoLuong">{Tongsoluong}</span>
                        <div className="my-cash2">{VND.format(Tongtien)}</div>
                    </div>
                    
                </div>
                <div className="title2">Mua Online Nhiều Khuyến Mại</div>
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

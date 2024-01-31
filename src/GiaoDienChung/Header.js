import "./Header.scss";
import logo from "../assets/images/logo.jpg";
import giohang from "../assets/images/giohang.jpg";
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

                <div className="title">Mua Online Nhiều Khuyến Mại</div>
                <div className="my-detail">
                    {/* {myDetail && myDetail.length !== 0 ? (
                        <img
                            src={myDetail?.avatar}
                            alt="Avatar"
                            className="my-avatar"
                        />
                    ) : (
                        <img src={logo2} alt="Avatar" className="my-avatar" />
                    )} */}
                    {myDetail && myDetail.length !== 0 ? (
                        <a href="/ca-nhan">
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
            <div className="container-header2">
                <div className="title">Chợ Của Người Việt</div>
                <div className="container-nav2">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active1" : ""
                        }
                        to="/fabysa"
                    >
                        <div className="nav-detail">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <div>Săn Sale</div>
                        </div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active1" : ""
                        }
                        to="/mini-game"
                    >
                        <div className="nav-detail">
                            <i className="fa-solid fa-dice"></i>
                            <div> Mini Game</div>
                        </div>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active1" : ""
                        }
                        to="/tongkhosi"
                    >
                        <div className="nav-detail">
                            <i className="fa-solid fa-mosque"></i>
                            <div>Tổng Kho Sỉ</div>
                        </div>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active1" : ""
                        }
                        to="/huong-dan"
                    >
                        <div className="nav-detail">
                            <i className="fa-solid fa-book-open-reader"></i>
                            <div>Hướng Dẫn</div>
                        </div>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active1" : ""
                        }
                        to="/ket-ban"
                    >
                        <div className="nav-detail">
                            <i className="fa-solid fa-people-group"></i>
                            <div>Hội FA</div>
                        </div>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active1" : ""
                        }
                        to="/ca-nhan"
                    >
                        <div className="nav-detail">
                            <i className="fa-solid fa-user"></i>
                            <div> Cá Nhân</div>
                        </div>
                    </NavLink>
                </div>
                <div className="my-detail">
                    {myDetail && myDetail.length !== 0 ? (
                        <a href="/ca-nhan">
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

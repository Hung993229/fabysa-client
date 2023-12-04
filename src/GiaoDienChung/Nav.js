import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <div className="container-nav">
            <NavLink
                className={({ isActive }) => (isActive ? "active1" : "")}
                to="/fabysa"
            >
                <div className="nav-detail">
                    <i className="fa-solid fa-bag-shopping"></i>
                    <div>Săn Sale</div>
                </div>
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "active1" : "")}
                to="/mini-game"
            >
                <div className="nav-detail">
                    <i className="fa-solid fa-dice"></i>
                    <div> Mini Game</div>
                </div>
            </NavLink>

            <NavLink
                className={({ isActive }) => (isActive ? "active1" : "")}
                to="/hom-thu"
            >
                <div className="nav-detail">
                    <i className="fa-solid fa-envelope"></i>
                    <div>Affiliate</div>
                </div>
            </NavLink>

            <NavLink
                className={({ isActive }) => (isActive ? "active1" : "")}
                to="/huong-dan"
            >
                <div className="nav-detail">
                    <i className="fa-solid fa-book-open-reader"></i>
                    <div>Hướng Dẫn</div>
                </div>
            </NavLink>

            <NavLink
                className={({ isActive }) => (isActive ? "active1" : "")}
                to="/ket-ban"
            >
                <div className="nav-detail">
                    <i className="fa-solid fa-people-group"></i>
                    <div>Hội FA</div>
                </div>
            </NavLink>

            <NavLink
                className={({ isActive }) => (isActive ? "active1" : "")}
                to="/ca-nhan"
            >
                <div className="nav-detail">
                    <i className="fa-solid fa-user"></i>
                    <div> Cá Nhân</div>
                </div>
            </NavLink>
        </div>
    );
};
export default Nav;

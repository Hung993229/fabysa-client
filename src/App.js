import "./App.css";
import Header from "./GiaoDienChung/Header";
import Nav from "./GiaoDienChung/Nav";
import KetBan from "./KetBan/KetBan";
import MiniGame from "./MiniGame/MiniGame";
import Instruct from "./HuongDan/Instruct";
import ThongTinCaNhan from "./ThongTinCaNhan/ThongTinCaNhan";
import FormRegister from "./Tao Thong Tin/FormRegister";
import DangNhap from "./DangNhap/DangNhap";
import DangKi from "./DangKi/DangKi";
import AddShop from "./QuanLyShop/AddShop";
import ChiTietSanPham from "./QuanLyShop/ChiTietSanPham";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuanLyUser from "./QuanLyUser/QuanLyUser";
import Shop from "./QuanLyShop/Shop";
import UpdateShop from "./QuanLyShop/UpdateShop";
import DonHang from "./QuanLyShop/DonHang";
import DonHangDangGiao from "./QuanLyShop/DonHangDangGiao";
import DonHangHoanThanh from "./QuanLyShop/DonHangHoanThanh";
import DonHangHuy from "./QuanLyShop/DonHangHuy";
import Fabysa from "./QuanLyShop/Fabysa";
import FabysaShop from "./QuanLyShop/FabysaShop";
import FabysaChiTietSp from "./QuanLyShop/FabysaChiTietSp";
import TongKhoSi from "./QuanLyShop/TongKhoSi";
import TongKhoSiChiTiet from "./QuanLyShop/TongKhoSiChiTiet";

import HomThu from "./KetBan/HomThu";
import { useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/ket-ban"
                        element={
                            <>
                                <KetBan />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/mini-game"
                        element={
                            <>
                                <MiniGame />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/huong-dan"
                        element={
                            <>
                                <Instruct />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/ca-nhan"
                        element={
                            <>
                                <ThongTinCaNhan />
                                <Nav />
                            </>
                        }
                    />
                    <Route path="/tao-thong-tin" element={<FormRegister />} />
                    <Route path="/dang-ki" element={<DangKi />} />
                    <Route path="/dang-nhap" element={<DangNhap />} />
                    <Route path="/quan-ly-user" element={<QuanLyUser />} />
                    <Route
                        path="/hom-thu"
                        element={
                            <>
                                <HomThu /> <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/add-shop"
                        element={
                            <>
                                <AddShop />
                            </>
                        }
                    />
                    <Route
                        path="/shop/:userId/:spId"
                        element={
                            <>
                                <ChiTietSanPham />
                            </>
                        }
                    />
                    <Route
                        path="/shop/:userId"
                        element={
                            <>
                                <Shop />
                            </>
                        }
                    />
                    <Route
                        path="/update-shop/:userId"
                        element={
                            <>
                                <UpdateShop />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang/:userId"
                        element={
                            <>
                                <DonHang />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-dang-giao/:userId"
                        element={
                            <>
                                <DonHangDangGiao />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-hoan-thanh/:userId"
                        element={
                            <>
                                <DonHangHoanThanh />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-huy/:userId"
                        element={
                            <>
                                <DonHangHuy />
                            </>
                        }
                    />
                    <Route
                        path="/affiliate"
                        element={
                            <>
                                <HomThu /> <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/fabysa"
                        element={
                            <>
                                <Header className="header" /> <Fabysa />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/fabysa/:userId/"
                        element={
                            <>
                                {" "}
                                <Header className="header" />
                                <FabysaShop />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/fabysa/:userId/:spId"
                        element={
                            <>
                                <Header className="header" />
                                <FabysaChiTietSp />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/tongkhosi"
                        element={
                            <>
                                {/* <Header className="header" /> */}
                                <TongKhoSi />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/tongkhosi/:spId"
                        element={
                            <>
                                {/* <Header className="header" /> */}
                                <TongKhoSiChiTiet />
                                <Nav />
                            </>
                        }
                    />

                    <Route
                        path="/mua-hang"
                        element={
                            <>
                                <HomThu /> <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/mua-hang-affiliate"
                        element={
                            <>
                                <HomThu /> <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <MiniGame />
                                <Nav />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

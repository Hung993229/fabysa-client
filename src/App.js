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
import DonHangMoi from "./QuanLyShop/DonHangMoi";
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
                                <Header className="header" />
                                <KetBan />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/mini-game"
                        element={
                            <>
                                <Header className="header" />
                                <MiniGame />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/huong-dan"
                        element={
                            <>
                                <Header className="header" />
                                <Instruct />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/ca-nhan"
                        element={
                            <>
                                <Header className="header" />
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
                                <Header className="header" />
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
                        path="/shop/:idShop/:spId"
                        element={
                            <>
                                <Header className="header" />
                                <ChiTietSanPham />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/shop/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <Shop />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/update-shop/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <UpdateShop />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <DonHangMoi />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang/:idShop/:idDonHang"
                        element={
                            <>
                                <Header className="header" />
                                <DonHang />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-dang-giao/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <DonHangDangGiao />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-hoan-thanh/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <DonHangHoanThanh /> <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-huy/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <DonHangHuy />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/affiliate"
                        element={
                            <>
                                <Header className="header" />
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
                        path="/fabysa/:idShop/"
                        element={
                            <>
                                <Header className="header" />
                                <FabysaShop />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/fabysa/:idShop/:spId"
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
                                <Header className="header" />
                                <TongKhoSi />
                                <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/tongkhosi/:spId"
                        element={
                            <>
                                <Header className="header" />
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
                                <Header className="header" />
                                <HomThu /> <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Header className="header" />
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

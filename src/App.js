import "./App.css";
import Header from "./GiaoDienChung/Header";
import Header2 from "./GiaoDienChung/Header2";
import Nav from "./GiaoDienChung/Nav";
import KetBan from "./KetBan/KetBan";
import MiniGame from "./MiniGame/MiniGame";
import Instruct from "./HuongDan/Instruct";
import ThongTinCaNhan from "./ThongTinCaNhan/ThongTinCaNhan";
import TrangCaNhan from "./ThongTinCaNhan/TrangCaNhan";

import FormRegister from "./Tao Thong Tin/FormRegister";
import DangNhap from "./DangNhap/DangNhap";
import DangNhap2 from "./DangNhap/DangNhap2";
import DangKi from "./DangKi/DangKi";
import DangKi2 from "./DangKi/DangKi2";
import AddShop from "./QuanLyShop/AddShop";
import ChiTietSanPham from "./QuanLyShop/ChiTietSanPham";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuanLyUser from "./QuanLyUser/QuanLyUser";
import Shop from "./QuanLyShop/Shop";
import Shop2 from "./QuanLyShop/Shop2";
import KhoCtv from "./QuanLyShop/KhoCtv";
import KhoSi from "./QuanLyShop/KhoSi";

import UpdateShop from "./QuanLyShop/UpdateShop";
import AddSp from "./QuanLyShop/AddSp";
import SuaMenu from "./QuanLyShop/SuaMenu";

import DonHang from "./QuanLyShop/DonHang";
import DangHoanThien from "./GiaoDienChung/DangHoanThien";

import DonHangMoi from "./QuanLyShop/DonHangMoi";
import DonHangDangGiao from "./QuanLyShop/DonHangDangGiao";
import DonHangHoanThanh from "./QuanLyShop/DonHangHoanThanh";
import DonHangHuy from "./QuanLyShop/DonHangHuy";
import Fabysa from "./QuanLyShop/Fabysa";
import FabysaShop from "./QuanLyShop/FabysaShop";
import FabysaChiTietSp from "./QuanLyShop/FabysaChiTietSp";
import TongKhoSi from "./QuanLyShop/TongKhoSi";
import TongKhoSiChiTiet from "./QuanLyShop/TongKhoSiChiTiet";
import DonHangCtv from "./QuanLyShop/DonHangCtv";
import DonHangLienKet from "./QuanLyShop/DonHangLienKet";
import HomThu from "./KetBan/HomThu";
import { useSelector } from "react-redux";
import GioHang from "./QuanLyShop/GioHang";
import DoiTac from "./QuanLyShop/DoiTac";
import LichSuDonMua from "./QuanLyShop/LichSuDonMua";
import DonMua from "./QuanLyShop/DonMua";
import ShopYeuThich from "./QuanLyShop/ShopYeuThich";
import ThayPassword from "./ThayPassword/ThayPassword";
import TrangChuFabysa from "./TrangChuFabysa/TrangChuFabysa";
import { useState } from "react";

function App() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [showcart, setshowcart] = useState(0);
    const [Tongsoluong, setTongsoluong] = useState(0);
    const [Tongtien, setTongtien] = useState(0);
    // const [arraySanPhamQuantity, setarraySanPhamQuantity] = useState([]);

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
                                {/* <MiniGame /> */}
                                <DangHoanThien />
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
                                <Header
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                />
                                <ThongTinCaNhan />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                       <Route
                        path="/ca-nhan2"
                        element={
                            <>
                                <Header
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                />
                                <TrangCaNhan />
                            </>
                        }
                    />
                    <Route path="/tao-thong-tin" element={<FormRegister />} />

                    
                    <Route path="/dang-ki" element={<DangKi />} />
                    <Route path="/dang-nhap" element={<DangNhap />} />
                    <Route
                        path="/change-password"
                        element={
                            <>
                                <Header />
                                <ThayPassword />
                            </>
                        }
                    />
                    <Route
                        path="/quan-ly-user"
                        element={
                            <>
                                <QuanLyUser />
                            </>
                        }
                    />
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
                                <Header />
                                <AddShop />
                            </>
                        }
                    />
                    <Route
                        path="/shop/:idShop/:spId"
                        element={
                            <>
                                <Header2 className="header" />
                                <ChiTietSanPham />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/:tenVietTat/:idShop/b"
                        element={
                            <>
                                <Header2
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                />
                                <Shop
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    setTongtien={setTongtien}
                                    setTongsoluong={setTongsoluong}
                                    Tongtien={Tongtien}
                                    Tongsoluong={Tongsoluong}
                                />
                            </>
                        }
                    />
                    {/* banLe & chiaSe */}
                    <Route
                        path="/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={
                            <>
                                <Header2
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                />
                                <Shop2
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    setTongtien={setTongtien}
                                    setTongsoluong={setTongsoluong}
                                    Tongtien={Tongtien}
                                    Tongsoluong={Tongsoluong}
                                />
                            </>
                        }
                    />
                    {/* Ctv */}
                      <Route
                        path="/shop/kho-ctv/:idShop"
                        element={
                            <>
                                <Header2
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                />
                                <KhoCtv
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    setTongtien={setTongtien}
                                    setTongsoluong={setTongsoluong}
                                    Tongtien={Tongtien}
                                    Tongsoluong={Tongsoluong}
                                />
                               
                            </>
                        }
                    />
                    {/* Si */}
                    <Route
                        path="/shop/kho-si/:idShop"
                        element={
                            <>
                                <Header2
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                />
                                <KhoSi
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    setTongtien={setTongtien}
                                    setTongsoluong={setTongsoluong}
                                    Tongtien={Tongtien}
                                    Tongsoluong={Tongsoluong}
                                />
                                {/* <Nav /> */}
                            </>
                        }
                    />

                    <Route
                        path="/shop/don-mua/:idShop"
                        element={
                            <>
                                <Header2 />
                                <DonMua />
                            </>
                        }
                    />
                    <Route
                        path="/shop/lich-su-mua-hang/:idShop"
                        element={
                            <>
                                <Header2 />
                                <LichSuDonMua />
                            </>
                        }
                    />
                    <Route
                        path="/shop/shop-yeu-thich/:idShop"
                        element={
                            <>
                                <Header2 />
                                <ShopYeuThich />
                            </>
                        }
                    />
                    <Route
                        path="/shop/dang-ki/:idShop"
                        element={
                            <>
                                <DangKi2 />
                            </>
                        }
                    />

                    <Route
                        path="/shop/dang-nhap/:idShop"
                        element={
                            <>
                                {/* <Header className="header" /> */}
                                <DangNhap2 />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                  
                    <Route
                        path="/shop/ca-nhan/:idShop"
                        element={
                            <>
                                <Header2
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                />
                                <ThongTinCaNhan />
                            </>
                        }
                    />
                    <Route
                        path="/shop/gio-hang/:idShop"
                        element={
                            <>
                                <Header2
                                    Tongsoluong={Tongsoluong}
                                    Tongtien={Tongtien}
                                />
                                <GioHang
                                    Tongsoluong={Tongsoluong}
                                    setTongsoluong={setTongsoluong}
                                    Tongtien={Tongtien}
                                    setTongtien={setTongtien}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/update-shop/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <UpdateShop />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/addsp/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <AddSp />
                            </>
                        }
                    />
                    <Route
                        path="/sua-menu/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <SuaMenu />
                            </>
                        }
                    />
                    <Route
                        path="/don-hang/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <DonHangMoi />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/don-hang/:idShop/:skip/:idDonHang/:trangThai"
                        element={
                            <>
                                <Header className="header" />
                                <DonHang />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-dang-giao/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <DonHangDangGiao />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-hoan-thanh/:idShop"
                        element={
                            <>
                                <Header className="header" />
                                <DonHangHoanThanh />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-huy/:idShop"
                        element={
                            <>
                                <Header />
                                <DonHangHuy />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-ctv/:idShop"
                        element={
                            <>
                                <Header />
                                <DonHangCtv />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/don-hang-lien-ket/:idShop"
                        element={
                            <>
                                <Header />
                                <DonHangLienKet />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/doi-tac/:idShop"
                        element={
                            <>
                                <Header />
                                <DoiTac />
                                {/* <Nav /> */}
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
                                <Header />
                                {/* <DangHoanThien /> */}
                                <Fabysa />
                                {/* <Nav /> */}
                            </>
                        }
                    />
                    <Route
                        path="/fabysa/:spa/:spb"
                        element={
                            <>
                                <Header />
                                <Fabysa />
                            </>
                        }
                    />
                    <Route
                        path="/fabysa/:idShop/"
                        element={
                            <>
                                <Header />
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
                                <DangHoanThien />
                                {/* <TongKhoSi /> */}
                                {/* <Nav /> */}
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
                                <Header />
                                <HomThu /> <Nav />
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <ThongTinCaNhan />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

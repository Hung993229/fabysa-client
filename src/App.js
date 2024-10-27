import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MiniGame from "./MiniGame/MiniGame";
import TrangCaNhan from "./ThongTinCaNhan/TrangCaNhan";
import XacNhanTaiKhoan from "./ThongTinCaNhan/XacNhanTaiKhoan";
import NhanGiaoHang from "./ThongTinCaNhan/NhanGiaoHang";
import TimGiaoHang from "./ThongTinCaNhan/TimGiaoHang";

import DangNhap from "./DangNhap/DangNhap";
import DangKi from "./DangKi/DangKi";
import QuanLyUser from "./QuanLyUser/QuanLyUser";
import Shop from "./QuanLyShop/Shop";
import BaoCao from "./QuanLyShop/BaoCao";
import Shop2 from "./QuanLyShop/Shop2";
import KhoCtv from "./QuanLyShop/KhoCtv";
import KhoSi from "./QuanLyShop/KhoSi";
import ThuNghiem from "./ComponentViDu/ThuNghiem";
import UpdateShop from "./QuanLyShop/UpdateShop";
import TaiKhoanFabysa from "./QuanLyShop/TaiKhoanFabysa";
import AddSp from "./QuanLyShop/AddSp";
import SuaMenu from "./QuanLyShop/SuaMenu";
import DonHangMoi from "./QuanLyShop/DonHangMoi";
import DoiTac from "./QuanLyShop/DoiTac";
import DonHangMua from "./ThongTinCaNhan/DonHangMua";
import ThayPassword from "./ThayPassword/ThayPassword";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/thu-nghiem" element={<ThuNghiem />} />

                    <Route
                        path="/ca-nhan/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<TrangCaNhan />}
                    />

                    <Route
                        path="/dang-ki/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<DangKi />}
                    />
                    <Route
                        path="/dang-nhap/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<DangNhap />}
                    />
                    <Route path="/change-password" element={<ThayPassword />} />
                    <Route path="/quan-ly-user" element={<QuanLyUser />} />
                    <Route
                        path="/:tenVietTat/:idShop/b/:idCtv/:tenCtv/:sdtCtv"
                        element={<Shop />}
                    />
                    <Route
                        path="/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<Shop2 />}
                    />
                    <Route
                        path="/kho-ctv/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<KhoCtv />}
                    />
                    <Route
                        path="/kho-si/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<KhoSi />}
                    />
                    <Route
                        path="/don-mua/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<DonHangMua />}
                    />
                    <Route
                        path="/mini-game/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<MiniGame />}
                    />
                    <Route
                        path="/tai-khoan/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv/:idTaiKhoan"
                        element={<TaiKhoanFabysa />}
                    />

                    <Route
                        path="/xac-nhan-tk/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<XacNhanTaiKhoan />}
                    />
                    <Route
                        path="/bao-cao-shop/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<BaoCao />}
                    />
                    <Route
                        path="/nhan-ship/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<NhanGiaoHang />}
                    />

                    <Route
                        path="/tim-ship/:tenVietTat/:idShop/a/:idCtv/:tenCtv/:sdtCtv"
                        element={<TimGiaoHang />}
                    />

                    <Route
                        path="/update-shop/:idShop"
                        element={<UpdateShop />}
                    />
                    <Route path="/addsp/:idShop" element={<AddSp />} />
                    <Route path="/sua-menu/:idShop" element={<SuaMenu />} />
                    <Route path="/don-hang/:idShop" element={<DonHangMoi />} />
                    <Route path="/doi-tac/:idShop" element={<DoiTac />} />
                    <Route path="/" element={<TrangCaNhan />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

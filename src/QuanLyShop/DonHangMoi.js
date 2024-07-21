import "./DonHangMoi.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import menu from "../assets/images/menu.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getDonHang, updateDonHang, getttShop } from "../redux/apiRequest";
import Loading from "../GiaoDienChung/Loading";
import MenuDonHang from "./MenuDonHang";
import { useEffect } from "react";
import DonHang from "./DonHang";
import InHoaDon from "./InHoaDon";
const DonHangMoi = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const allDonHang2 = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const [allDonHang, setallDonHang] = useState([]);
    useEffect(() => {
        if (allDonHang2 && allDonHang2?.length !== 0) {
            setallDonHang(allDonHang2);
        }
    }, [allDonHang2]);
    console.log("allDonHang", allDonHang);
    const allDonHangNhanTaiBan = allDonHang?.filter(
        (item) => item?.khachHang?.noiNhan === "Nhận Tại Bàn"
    );
    const allDonHangTuDenLay = allDonHang?.filter(
        (item) => item?.khachHang?.noiNhan === "Tự Đến Lấy"
    );
    const allDonHangShipTanNoi = allDonHang?.filter(
        (item) => item?.khachHang?.noiNhan === "Ship Tận Nơi"
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const { idShop } = useParams();
    const [loading, setloading] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [skip, setskip] = useState(0);
    const [thongTinDh, setthongTinDh] = useState();
    const [trangThaiDH, settrangThaiDH] = useState("Đơn Hàng Mới");
    console.log("trangThaiDH", trangThaiDH);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight >= scrollHeight) {
                setskip(skip + 20);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allDonHang]);
    useEffect(() => {
        const limit = 20;
        getDonHang(idShop, skip, limit, trangThaiDH, dispatch);

        console.log("iihihihih");
    }, [trangThaiDH, skip]);
    console.log("skip", skip);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleChiTietDonHang = (item) => {
        setloading(2);
        setthongTinDh(item);
        settrangThaiDH("");
    };
    console.log("loading", loading);

    return (
        <>
            {loading === 0 && trangThaiDH && (
                <div className="donHangMoi-container">
                    <div className="quayLai-tieuDe">
                        <a href={`/${ttShop.ttShopThem?.tenVietTat}/${ttShop._id}/a/a/a/a`} className="quayLai">
                            Quay Lại
                        </a>
                        <div className="tieuDe">{trangThaiDH}</div>
                    </div>

                    {allDonHangNhanTaiBan &&
                        allDonHangNhanTaiBan?.map((item, index) => {
                            return (
                                <div
                                    onClick={() => handleChiTietDonHang(item)}
                                    key={index}
                                    className="donHang-container"
                                >
                                    <div className="ngayThang">
                                        {item?.createdAt.slice(5, 10)} <br />
                                        {item?.createdAt.slice(11, 19)}
                                    </div>
                                    <div className="donHang">
                                        {item.donHang.map((item2, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="tenSp-dacDiem-soLuong"
                                                >
                                                    <div className="tenSp">
                                                        {item2.tenSanPham}
                                                    </div>
                                                    {item2.allDacDiemSP.map(
                                                        (item3, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="dacDiem-soLuong"
                                                                >
                                                                    <div className="dacDiem">
                                                                        {
                                                                            item3.tenDacDiem
                                                                        }
                                                                    </div>
                                                                    <div className="soLuong">
                                                                        {
                                                                            item3.slMua
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="soBan">
                                        Số Bàn <br />
                                        {item.soBan}
                                    </div>
                                    <div className="xemChiTiet">
                                        Xem <br /> Chi Tiết
                                    </div>
                                </div>
                            );
                        })}
                    {allDonHangShipTanNoi &&
                        allDonHangShipTanNoi?.map((item, index) => {
                            return (
                                <div
                                    onClick={() => handleChiTietDonHang(item)}
                                    key={index}
                                    className="donHang-container"
                                >
                                    <div className="ngayThang">
                                        {item?.createdAt.slice(5, 10)} <br />
                                        {item?.createdAt.slice(11, 19)}
                                    </div>
                                    <div className="donHang">
                                        {item.donHang.map((item2, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="tenSp-dacDiem-soLuong"
                                                >
                                                    <div className="tenSp">
                                                        {item2.tenSanPham}
                                                    </div>
                                                    {item2.allDacDiemSP.map(
                                                        (item3, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="dacDiem-soLuong"
                                                                >
                                                                    <div className="dacDiem">
                                                                        {
                                                                            item3.tenDacDiem
                                                                        }
                                                                    </div>
                                                                    <div className="soLuong">
                                                                        {
                                                                            item3.slMua
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="soBan">
                                        Ship
                                        <br />
                                        Tận Nơi
                                    </div>
                                    <div className="xemChiTiet">
                                        Xem <br /> Chi Tiết
                                    </div>
                                </div>
                            );
                        })}
                    {allDonHangTuDenLay &&
                        allDonHangTuDenLay?.map((item, index) => {
                            return (
                                <div
                                    onClick={() => handleChiTietDonHang(item)}
                                    key={index}
                                    className="donHang-container"
                                >
                                    <div className="ngayThang">
                                        {item?.createdAt.slice(5, 10)} <br />
                                        {item?.createdAt.slice(11, 19)}
                                    </div>
                                    <div className="donHang">
                                        {item.donHang.map((item2, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="tenSp-dacDiem-soLuong"
                                                >
                                                    <div className="tenSp">
                                                        {item2.tenSanPham}
                                                    </div>
                                                    {item2.allDacDiemSP.map(
                                                        (item3, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="dacDiem-soLuong"
                                                                >
                                                                    <div className="dacDiem">
                                                                        {
                                                                            item3.tenDacDiem
                                                                        }
                                                                    </div>
                                                                    <div className="soLuong">
                                                                        {
                                                                            item3.slMua
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="soBan">
                                        Tự
                                        <br />
                                        Đến Lấy
                                    </div>
                                    <div className="xemChiTiet">
                                        Xem <br /> Chi Tiết
                                    </div>
                                </div>
                            );
                        })}
                    {allDonHang && allDonHang?.length === 0 && (
                        <div className="donHangTrong">Đơn hàng trống! </div>
                    )}
                </div>
            )}

            <div className="menuDonHang">
                {loading === 3 && (
                    <img
                        onClick={() => setloading(0)}
                        src={menu}
                        className="menu"
                    />
                )}
                {loading === 0 && (
                    <img
                        onClick={() => setloading(3)}
                        src={menu}
                        className="menu"
                    />
                )}
            </div>

            {loading === 1 && <Loading />}
            {(loading === 2 || !trangThaiDH) && (
                <DonHang
                    loading={loading}
                    setloading={setloading}
                    thongTinDh={thongTinDh}
                    setthongTinDh={setthongTinDh}
                    trangThaiDH={trangThaiDH}
                    settrangThaiDH={settrangThaiDH}
                    setallDonHang={setallDonHang}
                    allDonHang={allDonHang}
                    setskip={setskip}
                    skip={skip}
                />
            )}
            {loading === 3 && (
                <MenuDonHang
                    loading={loading}
                    setloading={setloading}
                    idShop={idShop}
                    trangThaiDH={trangThaiDH}
                    settrangThaiDH={settrangThaiDH}
                    setallDonHang={setallDonHang}
                    allDonHang={allDonHang}
                    skip={skip}
                    setskip={setskip}
                />
            )}
            {loading === 4 && <InHoaDon />}
        </>
    );
};
export default DonHangMoi;

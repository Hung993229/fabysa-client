import "./DonHangMoi.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDonHang, getttShop, updatettShop } from "../redux/apiRequest";
import Loading from "../GiaoDienChung/Loading";
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
    const allDonHangNhanTaiBan = allDonHang?.filter(
        (item) => item?.ttThem?.khachHang?.noiNhan === "Nhận Tại Bàn"
    );
    const allDonHangTuDenLay = allDonHang?.filter(
        (item) => item?.ttThem?.khachHang?.noiNhan === "Tự Đến Lấy"
    );
    const allDonHangShipTanNoi = allDonHang?.filter(
        (item) => item?.ttThem?.khachHang?.noiNhan === "Ship Tận Nơi"
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const { idShop } = useParams();
    const [loading, setloading] = useState(0);
    const dispatch = useDispatch();
    const [skip, setskip] = useState(0);
    const [thongTinDh, setthongTinDh] = useState();
    const [trangThaiDH, settrangThaiDH] = useState("ĐH Mới");
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
        const sdtCtv = "";
        const sdtKhachHang = "";
        const sdtOrder = "";
        const sdtXuLyDon = "";
        const sdtGiaoHang = "";
        const sdtThuTien = "";
        const kinhDo = "";
        const viDo = "";

        getDonHang(
            idShop,
            sdtCtv,
            sdtKhachHang,
            sdtOrder,
            sdtXuLyDon,
            sdtGiaoHang,
            sdtThuTien,
            kinhDo,
            viDo,
            skip,
            limit,
            trangThaiDH,
            dispatch
        );
    }, [trangThaiDH, skip]);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleChiTietDonHang = (item) => {
        setloading(2);
        setthongTinDh(item);
        settrangThaiDH("");
    };
    const dsMenuDonHang2 = [
        "ĐH Mới",
        "ĐH Chưa Thanh Toán",
        "ĐH Đã Thanh Toán",
        "ĐH Tìm Ship",
        "ĐH Nhận Ship",
        "ĐH Đang Ship",
        "ĐH Ship Chưa Thanh Toán",
        "ĐH Ship Đã Thanh Toán",
        "ĐH Huỷ",
    ];
    const dsMenuDonHang = dsMenuDonHang2.filter((item) => item !== trangThaiDH);
    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setallDonHang([]);
        setskip(0);
    };
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    const handleChonPhiNenTang = (phiNenTang) => {
        const newShop = {
            phiNenTang: phiNenTang,
        };
        updatettShop(newShop, ttShop?._id, dispatch, setloading);
        setloading(0);
    };

    return (
        <>
            {loading === 0 && trangThaiDH && (
                <div className="donHangMoi-container">
                    <div className="quayLai-tieuDe">
                        <a
                            href={`/${ttShop.ttShopThem?.tenVietTat}/${ttShop._id}/a/a/a/a`}
                            className="quayLai"
                        >
                            <i className="fa fa-angle-double-left"></i>Quay Lại
                        </a>

                        <div className="donHang">Đơn Hàng</div>
                        <a
                            href={`/tai-khoan/${ttShop.ttShopThem?.tenVietTat}/${ttShop._id}/a/a/a/a`}
                            className="taiKhoanShop"
                        >
                            <i
                                className="fa fa-plus"
                                style={{ color: "#04aa6d" }}
                            ></i>
                            &#160;
                            {handleDinhDangSo(ttShop?.cash)}&#160;
                            <i
                                className="fab fa-empire"
                                style={{ color: "#ef9b0f" }}
                            ></i>
                        </a>
                    </div>
                    <div className="chonDonHang-phiNenTang">
                        <div className="chonDonHang-container">
                            <div className="tieuDe">Chọn Danh Mục</div>
                            <select
                                className="chonDonHang"
                                onChange={(e) =>
                                    handleChonDonHang(e.target.value)
                                }
                            >
                                <option>{trangThaiDH}</option>
                                {dsMenuDonHang?.map((item) => {
                                    return <option key={item}>{item}</option>;
                                })}
                            </select>
                        </div>
                        <div className="chonDonHang-container">
                            <div className="tieuDe">Chọn Phí Nền Tảng</div>
                            <select
                                onChange={(e) =>
                                    handleChonPhiNenTang(e.target.value)
                                }
                                className="chonDonHang"
                                id="provinces"
                            >
                                <option>{ttShop?.phiNenTang}</option>
                                <option>1K/Đơn Hàng</option>
                                <option>1% Doanh Thu</option>
                            </select>
                        </div>
                    </div>

                    <div className="donHang-all">
                        <div className="ds">Danh Sách Đơn Hàng</div>
                        {allDonHangNhanTaiBan &&
                            allDonHangNhanTaiBan?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() =>
                                            handleChiTietDonHang(item)
                                        }
                                        key={index}
                                        className="donHang-container"
                                    >
                                        <div className="ngayThang">
                                            {item?.createdAt.slice(0, 10)}
                                            <br />
                                            {item?.createdAt.slice(11, 19)}
                                        </div>
                                        <div className="donHang">
                                            {item.donHang.map(
                                                (item2, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="tenSp-dacDiem-soLuong"
                                                        >
                                                            <div className="tenSp">
                                                                {
                                                                    item2.tenSanPham
                                                                }
                                                            </div>
                                                            {item2.allDacDiemSP.map(
                                                                (
                                                                    item3,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
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
                                                }
                                            )}
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
                                        onClick={() =>
                                            handleChiTietDonHang(item)
                                        }
                                        key={index}
                                        className="donHang-container"
                                    >
                                        <div className="ngayThang">
                                            {item?.createdAt.slice(0, 10)}{" "}
                                            <br />
                                            {item?.createdAt.slice(11, 19)}
                                        </div>
                                        <div className="donHang">
                                            {item.donHang.map(
                                                (item2, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="tenSp-dacDiem-soLuong"
                                                        >
                                                            <div className="tenSp">
                                                                {
                                                                    item2.tenSanPham
                                                                }
                                                            </div>
                                                            {item2.allDacDiemSP.map(
                                                                (
                                                                    item3,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
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
                                                }
                                            )}
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
                                        onClick={() =>
                                            handleChiTietDonHang(item)
                                        }
                                        key={index}
                                        className="donHang-container"
                                    >
                                        <div className="ngayThang">
                                            {item?.createdAt.slice(0, 10)}{" "}
                                            <br />
                                            {item?.createdAt.slice(11, 19)}
                                        </div>
                                        <div className="donHang">
                                            {item.donHang.map(
                                                (item2, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="tenSp-dacDiem-soLuong"
                                                        >
                                                            <div className="tenSp">
                                                                {
                                                                    item2.tenSanPham
                                                                }
                                                            </div>
                                                            {item2.allDacDiemSP.map(
                                                                (
                                                                    item3,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
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
                                                }
                                            )}
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
                </div>
            )}

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
            {loading === 4 && <InHoaDon />}
        </>
    );
};
export default DonHangMoi;

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
            setallDonHang([...allDonHang, ...allDonHang2]);
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
    const [sort, setsort] = useState(1);
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
            sort,
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
    const dsMenuDonHang = [
        "ĐH Mới",
        "ĐH Chưa Thanh Toán",
        "ĐH Đã Thanh Toán",
        "ĐH Huỷ",
        "ĐH Tìm Ship Mới",
        "ĐH Ship Đã Nhận",
        "ĐH Đang Ship",
        "ĐH Ship Chưa Thanh Toán Về Shop",
        "ĐH Ship Đã Thanh Toán Về Shop",
        "ĐH Ship Huỷ Chưa Hoàn Hàng",
        "ĐH Ship Huỷ Đã Hoàn Hàng",
    ];
    const dsphiNenTang = ["1K/Đơn Hàng", "1% Doanh Thu"];

    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setallDonHang([]);
        setskip(0);
        setthongTinDh();
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
                            href={`/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                            className="quayLai"
                        >
                            <i className="fa fa-angle-double-left"></i>Quay Lại
                        </a>

                        <div className="donHang">Đơn Hàng</div>
                        <a
                            // href={`/tai-khoan/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a`}
                            href={`/tai-khoan/${ttShop?.ttShopThem?.tenVietTat}/${ttShop?._id}/a/a/a/a/${ttShop?._id}`}
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
                    <div className="chonDanhMuc">
                        {dsMenuDonHang?.map((item) => {
                            return (
                                <div
                                    key={item}
                                    onClick={() => handleChonDonHang(item)}
                                    className={
                                        item === trangThaiDH
                                            ? "daChon"
                                            : "chuaChon"
                                    }
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                    <div className="phiNenTang-container">
                        <div className="tieuDe">Chọn Phí Nền Tảng</div>
                        <select
                            onChange={(e) =>
                                handleChonPhiNenTang(e.target.value)
                            }
                            className="chonDonHang"
                            id="provinces"
                        >
                            <option>{ttShop?.phiNenTang}</option>
                            {dsphiNenTang?.map(
                                (item) =>
                                    item !== ttShop?.phiNenTang && (
                                        <option key={item}>{item}</option>
                                    )
                            )}
                        </select>
                    </div>

                    <div className="donHang-all">
                        <div className="tieuDeDH">Danh Sách Đơn Hàng</div>
                        <div className="noiNhan">Nhận Tại Bàn</div>
                        {allDonHangNhanTaiBan &&
                        allDonHangNhanTaiBan?.length !== 0 ? (
                            allDonHangNhanTaiBan?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() =>
                                            handleChiTietDonHang(item)
                                        }
                                        key={index}
                                        className="donHang-container"
                                    >
                                        <div className="ngayThang-container2">
                                            <div className="ngayThang">
                                                {new Date(
                                                    item?.createdAt
                                                )?.getDate()}
                                                /
                                                {new Date(
                                                    item?.createdAt
                                                )?.getMonth()}
                                                /
                                                {new Date(
                                                    item?.createdAt
                                                )?.getFullYear() + 1}
                                                &nbsp;
                                                {new Date(
                                                    item?.createdAt
                                                )?.getHours()}
                                                h
                                                {new Date(
                                                    item?.createdAt
                                                )?.getMinutes()}
                                            </div>
                                            <div className="kiemTra">
                                                {!item?.ttThem?.stkShop?.daCK ||
                                                    (item?.ttThem?.stkShop
                                                        ?.daCK ===
                                                        "Đã Chuyển" && (
                                                        <div className="daNhan">
                                                            Cần Xác Nhận
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

                                        <div className="donHang">
                                            <div className="SanPham">
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
                                    </div>
                                );
                            })
                        ) : (
                            <div className="donHangTrong">Trống ! </div>
                        )}
                        <div className="noiNhan">Ship Tận Nơi</div>
                        {allDonHangShipTanNoi &&
                        allDonHangShipTanNoi?.length !== 0 ? (
                            allDonHangShipTanNoi?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() =>
                                            handleChiTietDonHang(item)
                                        }
                                        key={index}
                                        className="donHang-container"
                                    >
                                        <div className="ngayThang-container2">
                                            <div className="ngayThang">
                                                {new Date(
                                                    item?.createdAt
                                                )?.getDate()}
                                                /
                                                {new Date(
                                                    item?.createdAt
                                                )?.getMonth()}
                                                /
                                                {new Date(
                                                    item?.createdAt
                                                )?.getFullYear() + 1}
                                                &nbsp;
                                                {new Date(
                                                    item?.createdAt
                                                )?.getHours()}
                                                h
                                                {new Date(
                                                    item?.createdAt
                                                )?.getMinutes()}
                                            </div>
                                            <div className="kiemTra">
                                                {item?.ttThem?.stkShop?.daCK ===
                                                    "Đã Chuyển" && (
                                                    <div className="daNhan">
                                                        Cần Xác Nhận
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="donHang">
                                            <div className="SanPham">
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
                                    </div>
                                );
                            })
                        ) : (
                            <div className="donHangTrong">Trống ! </div>
                        )}
                        <div className="noiNhan">Tự Đến Lấy</div>
                        {allDonHangTuDenLay &&
                        allDonHangTuDenLay?.length !== 0 ? (
                            allDonHangTuDenLay?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() =>
                                            handleChiTietDonHang(item)
                                        }
                                        key={index}
                                        className="donHang-container"
                                    >
                                        <div className="ngayThang-container2">
                                            <div className="ngayThang">
                                                {new Date(
                                                    item?.createdAt
                                                )?.getDate()}
                                                /
                                                {new Date(
                                                    item?.createdAt
                                                )?.getMonth()}
                                                /
                                                {new Date(
                                                    item?.createdAt
                                                )?.getFullYear() + 1}
                                                &nbsp;
                                                {new Date(
                                                    item?.createdAt
                                                )?.getHours()}
                                                h
                                                {new Date(
                                                    item?.createdAt
                                                )?.getMinutes()}
                                            </div>
                                            <div className="kiemTra">
                                                {!item?.ttThem?.stkShop?.daCK ||
                                                    (item?.ttThem?.stkShop
                                                        ?.daCK ===
                                                        "Đã Chuyển" && (
                                                        <div className="daNhan">
                                                            Cần Xác Nhận
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

                                        <div className="donHang">
                                            <div className="SanPham">
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
                                    </div>
                                );
                            })
                        ) : (
                            <div className="donHangTrong">Trống ! </div>
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

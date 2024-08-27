import "./DonHang.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import InHoaDon from "./InHoaDon";
import {
    updateDonHang,
    updateTaiKhoan,
    getTaiKhoan,
} from "../redux/apiRequest";
import { useEffect } from "react";
const DonHang = (props) => {
    const { setloading, thongTinDh, settrangThaiDH, setallDonHang, setskip } =
        props;
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const dispatch = useDispatch();
    const [Tongtien, setTongtien] = useState();
    const [giaVon, setgiaVon] = useState();
    const [trangThaiDH2, settrangThaiDH2] = useState("");

    const [giamTru, setgiamTru] = useState(thongTinDh?.ttThem?.giamTru || "0");
    const [donHang, setdonHang] = useState(thongTinDh?.donHang);
    const [timShip, settimShip] = useState("Ship Nội Bộ");
    const [phiShip, setphiShip] = useState(0);

    const [dateMax, setdateMax] = useState(new Date());
    const [dateMin, setdateMin] = useState(0);

    console.log("new Date()", new Date().toISOString());

    console.log(
        "d5",
        `${dateMax.getFullYear()} - ${dateMax.getMonth()} - ${dateMax.getDate()}` <
            dateMax.toISOString()
    );

    const d = new Date();
    console.log("d.setDate(20);", d.setDate(20));
    const gioPhut = `${d.getHours()}h${d.getMinutes()}`;
    const ngayThang = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    const taiKhoan = useSelector(
        (state) => state?.taiKhoan?.taiKhoan?.taiKhoan?.taiKhoan
    );
    useEffect(() => {
        getTaiKhoan(thongTinDh?.idShop, dispatch);
    }, []);
    useEffect(() => {
        const xetTrangThaiDH = donHang.find((item) =>
            item?.allDacDiemSP?.find(
                (item2) => item2?.daXong === 0 || !item2?.daXong
            )
        );
        if (xetTrangThaiDH) {
            settrangThaiDH2("ĐH Mới");
        } else {
            settrangThaiDH2("ĐH Chưa Thanh Toán");
        }
    }, [donHang]);
    const handleGiaoHang = (id) => {
        try {
            const giamTru2 = { giamTru: giamTru };

            const newDonHang = {
                trangThaiDH: trangThaiDH2,
                khachHang: { ...thongTinDh?.khachHang, ...giamTru2 },
                donHang: donHang,
            };
            console.log("newDonHang", newDonHang);
            updateDonHang(newDonHang, id, dispatch);
            setdonHang([]);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        } catch (err) {
            console.log(err);
        }
    };
    const handleHoanThanh = (id) => {
        try {
            const giamTru2 = { giamTru: giamTru };
            const newDonHang = {
                trangThaiDH: "ĐH Đã Thanh Toán",
                khachHang: { ...thongTinDh?.khachHang, ...giamTru2 },
            };

            updateDonHang(newDonHang, id, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);

            const newTaiKhoan = {
                ThongTinThem: {
                    TenShop: ttShop?.TenShop,
                    sdtShop: ttShop?.sdtShop,
                    BaoCaoKD: [
                        {
                            thoiGian: `${ngayThang} ${gioPhut}`,
                            noiNhan: thongTinDh?.khachHang?.noiNhan,
                            doanhThu: Tongtien,
                            chiPhi: giaVon,
                            idDonHang: id,
                        },
                        ...taiKhoan?.ThongTinThem?.BaoCaoKD,
                    ],
                },
            };
            updateTaiKhoan(newTaiKhoan, taiKhoan?._id, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    const handleHuyDon = (id) => {
        try {
            const giamTru2 = { giamTru: giamTru };
            const newDonHang = {
                trangThaiDH: "ĐH Huỷ",
                khachHang: { ...thongTinDh?.khachHang, ...giamTru2 },
            };
            updateDonHang(newDonHang, id, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        } catch (err) {
            console.log(err);
        }
    };
    const handleTraHang = (id) => {
        try {
            const giamTru2 = { giamTru: giamTru };
            const newDonHang = {
                trangThaiDH: "ĐH Huỷ",
                khachHang: { ...thongTinDh?.khachHang, ...giamTru2 },
            };
            updateDonHang(newDonHang, id, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
            const newTaiKhoan = {
                ThongTinThem: {
                    TenShop: ttShop?.TenShop,
                    sdtShop: ttShop?.sdtShop,
                    BaoCaoKD: [
                        {
                            thoiGian: `${ngayThang} ${gioPhut}`,
                            noiNhan: "Trả Hàng ",
                            doanhThu: -Tongtien,
                            chiPhi: -giaVon,
                            idDonHang: id,
                        },
                        ...taiKhoan?.ThongTinThem?.BaoCaoKD,
                    ],
                },
            };
            console.log("newTaiKhoan", newTaiKhoan);
            updateTaiKhoan(newTaiKhoan, taiKhoan?._id, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    const handleDaXong = (item, item2) => {
        const daXong2 = { daXong: 0 };
        const donHangXong = { ...item, ...daXong2 };
        console.log("donHangXong", donHangXong);

        const allDacDiemSP5 = item2?.allDacDiemSP?.map((item4) =>
            item4 !== item ? item4 : donHangXong
        );
        console.log("allDacDiemSP5", allDacDiemSP5);
        const sanPham = {
            _id: item2?._id,
            tenSanPham: item2?.tenSanPham,
            allDacDiemSP: allDacDiemSP5,
        };

        const donHangSua = donHang?.map((item3) =>
            item3 === item2 ? sanPham : item3
        );
        // console.log("donHangSua", donHangSua);
        setdonHang(donHangSua);
    };
    const handleChuaXong = (item, item2) => {
        const daXong2 = { daXong: 1 };
        const donHangXong = { ...item, ...daXong2 };
        console.log("donHangXong", donHangXong);

        const allDacDiemSP5 = item2?.allDacDiemSP?.map((item4) =>
            item4 !== item ? item4 : donHangXong
        );
        console.log("allDacDiemSP5", allDacDiemSP5);
        const sanPham = {
            _id: item2?._id,
            tenSanPham: item2?.tenSanPham,
            allDacDiemSP: allDacDiemSP5,
        };

        const donHangSua = donHang?.map((item3) =>
            item3 === item2 ? sanPham : item3
        );
        // console.log("donHangSua", donHangSua);
        setdonHang(donHangSua);
    };
    const suaDonHang = (sl, item, item2) => {
        const suaSoLuong = {
            giaCtv: item?.giaCtv,
            giaKhuyenMai: item?.giaKhuyenMai,
            giaNiemYet: item?.giaNiemYet,
            giaSi: item?.giaSi,
            giaVon: item?.giaVon,
            gioPhut: item?.gioPhut,
            slMua: sl,
            soLuong: item?.soLuong,
            tenDacDiem: item?.tenDacDiem,
            daXong: item?.daXong,
        };

        const allDacDiemSP5 = item2?.allDacDiemSP?.map((item4) =>
            item4 !== item ? item4 : suaSoLuong
        );
        const sanPham = {
            _id: item2?._id,
            tenSanPham: item2?.tenSanPham,
            allDacDiemSP: allDacDiemSP5,
        };

        const donHangSua = donHang?.map((item3) =>
            item3 === item2 ? sanPham : item3
        );
        setdonHang(donHangSua);
        const id = thongTinDh?._id;
        const newDonHang = {
            donHang: donHangSua,
        };
        console.log("newDonHang", newDonHang);
        updateDonHang(newDonHang, id, dispatch);
    };
    console.log("thongTinDh", thongTinDh);
    const handleClose = () => {
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setallDonHang([]);
        setloading(0);
        setskip(0);
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    useEffect(() => {
        if (thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Lẻ") {
            const tinhtongtien = () => {
                let tt = 0;
                if (donHang?.length !== 0) {
                    donHang?.map((sp) => {
                        sp?.allDacDiemSP?.map((item) => {
                            tt += +item?.slMua * item?.giaKhuyenMai;
                        });
                    });
                }

                setTongtien(tt);
            };
            tinhtongtien();
        }
        if (thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Sỉ") {
            const tinhtongtien = () => {
                let tt = 0;
                if (donHang?.length !== 0) {
                    donHang?.map((sp) => {
                        sp?.allDacDiemSP?.map((item) => {
                            tt += +item?.slMua * item?.giaSi;
                        });
                    });
                }

                setTongtien(tt);
            };
            tinhtongtien();
        }
        if (
            thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Cộng Tác Viên"
        ) {
            const tinhtongtien = () => {
                let tt = 0;
                if (donHang?.length !== 0) {
                    donHang?.map((sp) => {
                        sp?.allDacDiemSP?.map((item) => {
                            tt += +item?.slMua * item?.giaCtv;
                        });
                    });
                }

                setTongtien(tt);
            };
            tinhtongtien();
        }
    });
    useEffect(() => {
        const tinhTongGiaVon = () => {
            let tt = 0;
            if (donHang?.length !== 0) {
                donHang?.map((sp) => {
                    sp?.allDacDiemSP?.map((item) => {
                        tt += +item?.slMua * item?.giaVon;
                    });
                });
            }

            setgiaVon(tt);
        };
        tinhTongGiaVon();
    });
    console.log("giaVon", giaVon);
    const handlePrint = () => {
        window.print();
    };
    //  Viet QR
    const nganHang = ttShop?.ttShopThem?.nganHang;
    const BANK_ID = nganHang.maSo;
    const ACCOUNT_NO = nganHang.taiKhoanNganHang;
    const TEMPLATE = "print";
    const AMOUNT = Tongtien - giamTru;
    const DESCRIPTION = `Hoá Đơn ${thongTinDh.soBan}`;
    const ACCOUNT_NAME = nganHang.chuTaiKhoanNganhang;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR
    const handleQuayLai = () => {
        setloading(0);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setallDonHang([]);
        setskip(0);
    };
    const handleTimShip = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Tìm Ship",
            ttThem: {
                ...thongTinDh?.ttThem,
                ...{
                    ttGiaoHang: {
                        sdtNv: "",
                        tenNv: "",
                        phiShip: phiShip,
                    },
                },
            },
        };
        console.log("newDonHang", newDonHang);
        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
    };
    console.log("thongTinDh?.ttThem", thongTinDh?.ttThem);
    return (
        <div className="chiTietDonHang-Container">
            <div className="quayLai-tieuDe">
                <div onClick={() => handleQuayLai()} className="quayLai">
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </div>
                <div className="tieuDe">Chi Tiết Đơn Hàng</div>
            </div>

            {thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Lẻ" && (
                <div className="allSanPham">
                    {donHang?.map((item2, index) => {
                        return (
                            <div key={index} className="sanPham">
                                <div className="tenSanPham-xoa">
                                    <div className="tenSanPham">
                                        {item2?.tenSanPham}
                                    </div>
                                </div>
                                {item2?.allDacDiemSP &&
                                    item2?.allDacDiemSP?.length > 0 &&
                                    item2?.allDacDiemSP?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="dacDiem-themGioHang"
                                            >
                                                <div className="anhSp-tenSp">
                                                    <div className="tenSp">
                                                        {item?.tenDacDiem}
                                                    </div>
                                                    <div className="gioPhut">
                                                        {item?.gioPhut}
                                                    </div>
                                                </div>
                                                <div className="giaSanPham">
                                                    <div className="giaKM">
                                                        {VND.format(
                                                            item?.giaKhuyenMai
                                                        )}
                                                    </div>
                                                    <div className="giaNY-giamGia">
                                                        <div className="giaNY">
                                                            {VND.format(
                                                                item?.giaNiemYet
                                                            )}
                                                        </div>
                                                        <div className="giamGia">
                                                            Giảm&nbsp;
                                                            {Math.floor(
                                                                (100 *
                                                                    (item?.giaNiemYet -
                                                                        item?.giaKhuyenMai)) /
                                                                    item?.giaNiemYet
                                                            )}
                                                            %
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="soLuong-SL">
                                                    <div className="soLuong">
                                                        Số Lượng
                                                    </div>
                                                    <input
                                                        className="SL"
                                                        placeholder={
                                                            item?.slMua
                                                        }
                                                        onChange={(e) =>
                                                            suaDonHang(
                                                                e.target.value,
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="thanhTien-TT">
                                                    <div className="thanhTien">
                                                        Thành Tiền
                                                    </div>
                                                    <div className="TT">
                                                        {VND.format(
                                                            item?.slMua *
                                                                item?.giaKhuyenMai
                                                        )}
                                                    </div>
                                                </div>
                                                {item.daXong === 1 ? (
                                                    <div
                                                        onClick={() =>
                                                            handleDaXong(
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                        className="daXong"
                                                    >
                                                        ✅
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleChuaXong(
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                        className="chuaXong"
                                                    >
                                                        ☐
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
                </div>
            )}
            {thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Sỉ" && (
                <div className="allSanPham">
                    {donHang?.map((item2, index) => {
                        return (
                            <div key={index} className="sanPham">
                                <div className="tenSanPham-xoa">
                                    <div className="tenSanPham">
                                        {item2?.tenSanPham}
                                    </div>
                                </div>
                                {item2?.allDacDiemSP &&
                                    item2?.allDacDiemSP?.length > 0 &&
                                    item2?.allDacDiemSP?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="dacDiem-themGioHang"
                                            >
                                                <div className="anhSp-tenSp">
                                                    <div className="tenSp">
                                                        {item?.tenDacDiem}
                                                    </div>
                                                    <div className="gioPhut">
                                                        {item?.gioPhut}
                                                    </div>
                                                </div>
                                                <div className="giaSanPham">
                                                    <div className="giaKM">
                                                        {VND.format(
                                                            item?.giaSi
                                                        )}
                                                    </div>
                                                    <div className="giaNY-giamGia">
                                                        <div className="giaNY">
                                                            {VND.format(
                                                                item?.giaNiemYet
                                                            )}
                                                        </div>
                                                        <div className="giamGia">
                                                            Giảm&nbsp;
                                                            {Math.floor(
                                                                (100 *
                                                                    (item?.giaNiemYet -
                                                                        item?.giaSi)) /
                                                                    item?.giaNiemYet
                                                            )}
                                                            %
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="soLuong-SL">
                                                    <div className="soLuong">
                                                        Số Lượng
                                                    </div>
                                                    <input
                                                        className="SL"
                                                        placeholder={
                                                            item?.slMua
                                                        }
                                                        onChange={(e) =>
                                                            suaDonHang(
                                                                e.target.value,
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="thanhTien-TT">
                                                    <div className="thanhTien">
                                                        Thành Tiền
                                                    </div>
                                                    <div className="TT">
                                                        {VND.format(
                                                            item?.slMua *
                                                                item?.giaSi
                                                        )}
                                                    </div>
                                                </div>
                                                {item.daXong === 1 ? (
                                                    <div
                                                        onClick={() =>
                                                            handleDaXong(
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                        className="daXong"
                                                    >
                                                        ✅
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleChuaXong(
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                        className="chuaXong"
                                                    >
                                                        ☐
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
                </div>
            )}
            {thongTinDh?.ttThem?.khachHang?.nhomKhach ===
                "Khách Cộng Tác Viên" && (
                <div className="allSanPham">
                    {donHang?.map((item2, index) => {
                        return (
                            <div key={index} className="sanPham">
                                <div className="tenSanPham-xoa">
                                    <div className="tenSanPham">
                                        {item2?.tenSanPham}
                                    </div>
                                </div>
                                {item2?.allDacDiemSP &&
                                    item2?.allDacDiemSP?.length > 0 &&
                                    item2?.allDacDiemSP?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="dacDiem-themGioHang"
                                            >
                                                <div className="anhSp-tenSp">
                                                    <div className="tenSp">
                                                        {item?.tenDacDiem}
                                                    </div>
                                                    <div className="gioPhut">
                                                        {item?.gioPhut}
                                                    </div>
                                                </div>
                                                <div className="giaSanPham">
                                                    <div className="giaKM">
                                                        {VND.format(
                                                            item?.giaCtv
                                                        )}
                                                    </div>
                                                    <div className="giaNY-giamGia">
                                                        <div className="giaNY">
                                                            {VND.format(
                                                                item?.giaNiemYet
                                                            )}
                                                        </div>
                                                        <div className="giamGia">
                                                            Giảm&nbsp;
                                                            {Math.floor(
                                                                (100 *
                                                                    (item?.giaNiemYet -
                                                                        item?.giaCtv)) /
                                                                    item?.giaNiemYet
                                                            )}
                                                            %
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="soLuong-SL">
                                                    <div className="soLuong">
                                                        Số Lượng
                                                    </div>
                                                    <input
                                                        className="SL"
                                                        placeholder={
                                                            item?.slMua
                                                        }
                                                        onChange={(e) =>
                                                            suaDonHang(
                                                                e.target.value,
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="thanhTien-TT">
                                                    <div className="thanhTien">
                                                        Thành Tiền
                                                    </div>
                                                    <div className="TT">
                                                        {VND.format(
                                                            item?.slMua *
                                                                item?.giaCtv
                                                        )}
                                                    </div>
                                                </div>
                                                {item.daXong === 1 ? (
                                                    <div
                                                        onClick={() =>
                                                            handleDaXong(
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                        className="daXong"
                                                    >
                                                        ✅
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleChuaXong(
                                                                item,
                                                                item2
                                                            )
                                                        }
                                                        className="chuaXong"
                                                    >
                                                        ☐
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="tinhTien">
                <div className="tongTien">
                    <div className="tieude">Tổng Tiền Hàng :</div>
                    <div className="sotien">{VND.format(Tongtien)}</div>
                </div>
                <div className="tongTien">
                    <div className="tieude">Giảm Trừ :</div>
                    <input
                        type="number"
                        className="sotien"
                        placeholder={VND.format(giamTru)}
                        onChange={(e) => setgiamTru(e.target.value)}
                    />
                </div>
                <div className="tongTien">
                    <div className="tieude">Cần Thanh Toán :</div>
                    <div className="sotien">
                        {VND.format(Tongtien - giamTru)}
                    </div>
                </div>
            </div>

            <div className="tieuDeDonHang">Thông Tin Người Nhận</div>
            {(thongTinDh?.ttThem?.khachHang?.noiNhan === "Ship Tận Nơi" ||
                thongTinDh?.ttThem?.khachHang?.noiNhan === "Tự Đến Lấy") && (
                <div className="phancach">
                    <div className="thongTinChiTiet">
                        <div className="noiDung">
                            Nơi Nhận :&nbsp;
                            {thongTinDh?.ttThem?.khachHang?.noiNhan}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="noiDung">
                            Họ Và Tên :&nbsp;
                            {thongTinDh?.ttThem?.khachHang?.hoTenNguoiMua}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="noiDung">
                            Số Điện Thoại :&nbsp;
                            {thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="noiDung">
                            Địa Chỉ :&nbsp;{thongTinDh?.thonXomMua},&nbsp;
                            {thongTinDh?.xaMua},&nbsp;
                            {thongTinDh?.huyenMua},&nbsp;
                            {thongTinDh?.tinhMua}
                        </div>
                    </div>

                    <div className="thongTinChiTiet">
                        <div className="noiDung">
                            Ghi Chú Thêm :&nbsp;
                            {thongTinDh?.ttThem?.khachHang?.ghiChuNguoiMua}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="noiDung">
                            Nhóm KH:&nbsp;
                            {thongTinDh?.ttThem?.khachHang?.nhomKhach}
                        </div>
                    </div>
                </div>
            )}
            {thongTinDh?.ttThem?.khachHang?.noiNhan === "Nhận Tại Bàn" && (
                <div className="phancach">
                    <div className="thongTinChiTiet">
                        {/* <div className="tieuDe">Nơi Nhận :</div> */}
                        <div className="noiDung">
                            Nơi Nhận :&nbsp;
                            {thongTinDh?.ttThem?.khachHang?.noiNhan}
                            &emsp;-&emsp;
                            {thongTinDh?.ttThem?.khachHang?.soBan}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
                        {/* <div className="tieuDe">Nhóm KH :</div> */}
                        <div className="noiDung">
                            Nhóm KH :&nbsp;
                            {thongTinDh?.ttThem?.khachHang?.nhomKhach}
                        </div>
                    </div>
                </div>
            )}
            {thongTinDh?.trangThaiDH === "ĐH Mới" && (
                <div className="timShip2-container">
                    <div className="tieuDe">Chọn Phương Thức Ship</div>
                    <select
                        onChange={(e) => settimShip(e.target.value)}
                        className="chonPhuongThuc"
                        id="provinces"
                    >
                        <option>Ship Nội Bộ</option>
                        <option>Thuê Ship Ngoài</option>
                    </select>
                    {timShip === "Thuê Ship Ngoài" && (
                        <div className="thueShip">
                            <div className="noiGui">
                                Nơi Gửi :&nbsp;{ttShop?.thonXom},&nbsp;
                                {ttShop?.xa},&nbsp;
                                {ttShop?.huyen},&nbsp; {ttShop?.tinh}
                            </div>
                            <div className="noiGui">
                                SĐT Gửi :&nbsp;{ttShop?.sdtShop}
                            </div>
                            <div className="noiGui">
                                Nơi Nhận :&nbsp;{thongTinDh?.thonXomMua},&nbsp;
                                {thongTinDh?.xaMua},&nbsp;
                                {thongTinDh?.huyenMua},&nbsp;
                                {thongTinDh?.tinhMua}
                            </div>
                            <div className="noiGui">
                                SĐT Nhận :&nbsp;
                                {thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}
                            </div>
                            <div className="phiShip-input">
                                <div className="phiShip">Phí Ship :</div>
                                <input
                                    onChange={(e) => setphiShip(e.target.value)}
                                    className="input"
                                    placeholder="0"
                                />
                                <div
                                    className="taoDonShip"
                                    onClick={() =>
                                        handleTimShip(thongTinDh?._id)
                                    }
                                >
                                    Tạo Đơn Ship
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {thongTinDh?.trangThaiDH === "ĐH Chưa Thanh Toán" && (
                <div className="thanhToanQrCode-container">
                    <div className="thanhToanQr">Thanh Toán Qua QR Code</div>
                    <img className="qr" src={qr} />
                </div>
            )}
            <div>
                {thongTinDh?.trangThaiDH === "ĐH Mới" && (
                    <div className="tongKet">
                        <div
                            className="hoanThanh"
                            onClick={() => handleGiaoHang(thongTinDh?._id)}
                        >
                            Giao Hàng
                        </div>
                        <div className="inHoaDon" onClick={() => handlePrint()}>
                            In Hoá Đơn
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Chưa Thanh Toán" && (
                    <div className="tongKet">
                        <div
                            className="huyDon"
                            onClick={() => handleHuyDon(thongTinDh?._id)}
                        >
                            Huỷ Đơn
                        </div>

                        <div
                            className="hoanThanh"
                            onClick={() => handleHoanThanh(thongTinDh?._id)}
                        >
                            Hoàn Thành
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Đã Thanh Toán" && (
                    <div className="tongKet">
                        <div
                            className="huyDon"
                            onClick={() => handleTraHang(thongTinDh?._id)}
                        >
                            Trả Hàng
                        </div>
                        <div className="inHoaDon" onClick={() => handlePrint()}>
                            In Hoá Đơn
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Huỷ" && (
                    <div className="tongKet">
                        <div onClick={() => handleClose()} className="huyDon">
                            Quay lại
                        </div>
                        <div className="inHoaDon" onClick={() => handlePrint()}>
                            In Hoá Đơn
                        </div>
                    </div>
                )}
            </div>
            <InHoaDon
                thongTinDh={thongTinDh}
                setTongtien={setTongtien}
                Tongtien={Tongtien}
                setgiamTru={setgiamTru}
                giamTru={giamTru}
                qr={qr}
            />
        </div>
    );
};
export default DonHang;

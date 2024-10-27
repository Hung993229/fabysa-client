import "./DonHang.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import InHoaDon from "./InHoaDon";
import {
    updateDonHang,
    registerTaiKhoan,
    getTaiKhoan,
    updatettShop,
} from "../redux/apiRequest";
import { useEffect } from "react";
const DonHang = (props) => {
    const {
        setloading,
        thongTinDh,
        setthongTinDh,
        settrangThaiDH,
        setallDonHang,
        setskip,
    } = props;
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [Tongtien, setTongtien] = useState();
    const [giaVon, setgiaVon] = useState();

    const [giamTru, setgiamTru] = useState(
        thongTinDh?.ttThem?.baoCao?.giamTru || "0"
    );
    const [donHang, setdonHang] = useState(thongTinDh?.donHang);
    const [timShip, settimShip] = useState("Shop Tự Giao");
    const [phiShip, setphiShip] = useState("0");

    const d = new Date();
    const gioPhut = `${d.getHours()}h${d.getMinutes()}`;
    const ngayThang = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

    const handleGiaoHang = (id) => {
        const xetTrangThaiDH = donHang.find((item) =>
            item?.allDacDiemSP?.find(
                (item2) => item2?.daXong === 0 || !item2?.daXong
            )
        );
        try {
            if (xetTrangThaiDH) {
                const newDonHang = {
                    trangThaiDH: "ĐH Mới",
                    donHang: donHang,
                    sdtXuLyDon: user?.username,
                    ttThem: {
                        ...thongTinDh?.ttThem,
                        ...{
                            baoCao: {
                                doanhThu: Tongtien - giamTru,
                                giaVon: giaVon,
                                phiNenTang: 0,
                                giamTru: giamTru,
                            },
                        },
                    },
                };
                updateDonHang(newDonHang, id, dispatch);
                setdonHang([]);
                setallDonHang([]);
                settrangThaiDH(thongTinDh?.trangThaiDH);
                setloading(0);
                setskip(0);
            } else {
                const newDonHang = {
                    trangThaiDH: "ĐH Chưa Thanh Toán",
                    ttThem: {
                        ...thongTinDh?.ttThem,
                        ...{
                            baoCao: {
                                doanhThu: Tongtien - giamTru,
                                giaVon: giaVon,
                                phiNenTang: 0,
                                giamTru: giamTru,
                            },
                        },
                    },
                    donHang: donHang,
                    sdtXuLyDon: user?.username,
                };
                updateDonHang(newDonHang, id, dispatch);
                setdonHang([]);
                setallDonHang([]);
                settrangThaiDH(thongTinDh?.trangThaiDH);
                setloading(0);
                setskip(0);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleDaThanhToan = () => {
        if (ttShop?.cash > 0) {
            try {
                if (ttShop?.phiNenTang === "1K/Đơn Hàng") {
                    const newDonHang = {
                        trangThaiDH: "ĐH Đã Thanh Toán",
                        sdtThuTien: user?.username,
                        ttThem: {
                            ...thongTinDh?.ttThem,
                            ...{
                                baoCao: {
                                    doanhThu:
                                        Tongtien -
                                        thongTinDh?.ttThem?.baoCao?.giamTru,
                                    giaVon: giaVon,
                                    giamTru:
                                        thongTinDh?.ttThem?.baoCao?.giamTru,
                                    phiNenTang: 1000,
                                },
                            },
                        },
                    };
                    console.log("newDonHang", newDonHang);
                    updateDonHang(newDonHang, thongTinDh?._id, dispatch);
                    const newShop = {
                        cash: +ttShop?.cash - 1000,
                    };
                    console.log("newShop", newShop);
                    updatettShop(newShop, ttShop._id, dispatch);
                    const newTaiKhoan = {
                        GDVao: "",
                        GDRa: 1000,
                        noiDungCK: "Phí Nền Tảng",
                        xacNhanChuyenTien: "Thành Công",
                        thongTinThem: {
                            tenChuTk: ttShop?.TenShop,
                            sdtChuTk: ttShop?.sdtShop,
                        },
                        idChuTaiKhoan: ttShop?._id,
                    };
                    console.log("newTaiKhoan", newTaiKhoan);
                    registerTaiKhoan(newTaiKhoan, dispatch);
                }
                if (ttShop?.phiNenTang === "1% Doanh Thu") {
                    const newDonHang = {
                        trangThaiDH: "ĐH Đã Thanh Toán",
                        sdtThuTien: user?.username,
                        ttThem: {
                            ...thongTinDh?.ttThem,
                            ...{
                                baoCao: {
                                    doanhThu:
                                        Tongtien -
                                        thongTinDh?.ttThem?.baoCao?.giamTru,
                                    giaVon: giaVon,
                                    giamTru:
                                        thongTinDh?.ttThem?.baoCao?.giamTru,
                                    phiNenTang:
                                        (Tongtien -
                                            thongTinDh?.ttThem?.baoCao
                                                ?.giamTru) /
                                        100,
                                },
                            },
                        },
                    };
                    console.log("newDonHang", newDonHang);
                    updateDonHang(newDonHang, thongTinDh?._id, dispatch);
                    const newShop = {
                        cash:
                            ttShop?.cash -
                            (Tongtien - thongTinDh?.ttThem?.baoCao?.giamTru) /
                                100,
                    };
                    console.log("newShop", newShop);
                    updatettShop(newShop, ttShop._id, dispatch, setloading);
                    const newTaiKhoan = {
                        GDVao: "",
                        GDRa:
                            (Tongtien - thongTinDh?.ttThem?.baoCao?.giamTru) /
                            100,
                        noiDungCK: "Phí Nền Tảng",
                        xacNhanChuyenTien: "Thành Công",
                        thongTinThem: {
                            tenChuTk: ttShop?.TenShop,
                            sdtChuTk: ttShop?.sdtShop,
                        },
                        idChuTaiKhoan: ttShop?._id,
                    };
                    console.log("newTaiKhoan", newTaiKhoan);
                    registerTaiKhoan(newTaiKhoan, dispatch);
                }
                setallDonHang([]);
                settrangThaiDH(thongTinDh?.trangThaiDH);
                setloading(0);
                setskip(0);
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Fabysa Gold không đủ để thanh toán phí nền tảng!");
        }
    };
    const handleChuaThanhToan = () => {
        try {
            const newDonHang = {
                trangThaiDH: "ĐH Chưa Thanh Toán",
                sdtThuTien: "",
                ttThem: {
                    ...thongTinDh?.ttThem,
                    ...{
                        baoCao: {
                            ...thongTinDh?.ttThem?.baoCao,
                            ...{ doanhThu: 0, giaVon: 0 },
                        },
                    },
                },
            };
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            console.log("newDonHang", newDonHang);

            const newShop = {
                cash: +ttShop?.cash + thongTinDh?.ttThem?.baoCao?.phiNenTang,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, ttShop._id, dispatch, setloading);
            const newTaiKhoan = {
                GDVao: thongTinDh?.ttThem?.baoCao?.phiNenTang,
                GDRa: "",
                noiDungCK: "Hoàn Phí Nền Tảng",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: ttShop?.TenShop,
                    sdtChuTk: ttShop?.sdtShop,
                },
                idChuTaiKhoan: ttShop?._id,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        } catch (err) {
            console.log(err);
        }
    };
    const handleHuyDon = () => {
        const cauHoi = window.confirm("Khách muốn huỷ đơn?");
        if (cauHoi) {
            try {
                const newDonHang = {
                    trangThaiDH: "ĐH Huỷ",
                    sdtXuLyDon: user?.username,
                };
                updateDonHang(newDonHang, thongTinDh?._id, dispatch);
                setallDonHang([]);
                settrangThaiDH(thongTinDh?.trangThaiDH);
                setloading(0);
                setskip(0);
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleTraHang = (id) => {
        const cauHoi = window.confirm("Khách muốn trả hàng?");
        if (cauHoi) {
            try {
                const newDonHang = {
                    trangThaiDH: "ĐH Huỷ",
                    sdtXuLyDon: user?.username,
                };
                updateDonHang(newDonHang, id, dispatch);

                const newShop = {
                    cash:
                        +ttShop?.cash + thongTinDh?.ttThem?.baoCao?.phiNenTang,
                };
                console.log("newShop", newShop);
                updatettShop(newShop, ttShop._id, dispatch, setloading);
                const newTaiKhoan = {
                    GDVao: thongTinDh?.ttThem?.baoCao?.phiNenTang,
                    GDRa: "",
                    noiDungCK: "Hoàn Phí Nền Tảng",
                    xacNhanChuyenTien: "Thành Công",
                    thongTinThem: {
                        tenChuTk: ttShop?.TenShop,
                        sdtChuTk: ttShop?.sdtShop,
                    },
                    idChuTaiKhoan: ttShop?._id,
                };
                console.log("newTaiKhoan", newTaiKhoan);
                registerTaiKhoan(newTaiKhoan, dispatch);
                setallDonHang([]);
                settrangThaiDH(thongTinDh?.trangThaiDH);
                setloading(0);
                setskip(0);
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleDaXong = (item, item2) => {
        const daXong2 = { daXong: 0 };
        const donHangXong = { ...item, ...daXong2 };

        const allDacDiemSP5 = item2?.allDacDiemSP?.map((item4) =>
            item4 !== item ? item4 : donHangXong
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
    };
    const handleChuaXong = (item, item2) => {
        const daXong2 = { daXong: 1 };
        const donHangXong = { ...item, ...daXong2 };

        const allDacDiemSP5 = item2?.allDacDiemSP?.map((item4) =>
            item4 !== item ? item4 : donHangXong
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
    };
    const handleTimShip = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Tìm Ship Mới",
            ttThem: {
                ...thongTinDh?.ttThem,
                ...{
                    ttGiaoHang: {
                        tenNv: "",
                        idNv: "",
                        sdtNv: "",
                        phiShip: +phiShip,
                        coc: "",
                    },
                },
                ...{
                    stkShop: {
                        idNganHang: ttShop?.ttShopThem?.nganHang?.maSo,
                        nganHang: ttShop?.ttShopThem?.nganHang?.tenNganHang,
                        soTaiKhoan:
                            ttShop?.ttShopThem?.nganHang?.taiKhoanNganHang,
                        tenChuTk:
                            ttShop?.ttShopThem?.nganHang?.chuTaiKhoanNganhang,
                        daCK: "chưa Chuyển",
                    },
                },
                ...{
                    baoCao: {
                        doanhThu: Tongtien - giamTru,
                        giaVon: giaVon,
                        phiNenTang: 0,
                        giamTru: giamTru,
                    },
                },
            },
        };
        console.log("newDonHang", newDonHang);
        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleDaChuanBi = () => {
        const newDonHang = {
            donHang: donHang,
            sdtXuLyDon: user?.username,
            ttThem: {
                ...thongTinDh?.ttThem,
                ...{
                    baoCao: {
                        doanhThu: Tongtien - giamTru,
                        giaVon: giaVon,
                        phiNenTang: 0,
                        giamTru: giamTru,
                    },
                },
            },
        };

        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleTuShip = () => {
        const cauHoi = window.confirm("Shop muốn tự ship?");
        if (cauHoi) {
            const newDonHang = {
                trangThaiDH: "ĐH Mới",
                ttThem: {
                    ...thongTinDh?.ttThem,
                    ...{
                        ttGiaoHang: {
                            sdtNv: "",
                            tenNv: "",
                            phiShip: 0,
                        },
                    },
                },
            };

            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        }
    };
    const handleDangShip = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Đang Ship",
            ttThem: {
                ...thongTinDh?.ttThem,
                ...{
                    baoCao: {
                        doanhThu: Tongtien - giamTru,
                        giaVon: giaVon,
                        phiNenTang: 0,
                        giamTru: giamTru,
                    },
                },
            },
        };

        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleTimShipKhac = () => {
        const cauHoi = window.confirm("Shop muốn tìm ship khác?");
        if (cauHoi) {
            const newDonHang = {
                trangThaiDH: "ĐH Tìm Ship Mới",
            };

            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        }
    };
    const handleShipDaThanhToan = () => {
        if (ttShop?.phiNenTang === "1K/Đơn Hàng") {
            const newDonHang = {
                trangThaiDH: "ĐH Ship Đã Thanh Toán Về Shop",
                ttThem: {
                    ...thongTinDh?.ttThem,
                    ...{
                        stkShop: {
                            ...thongTinDh?.ttThem?.stkShop,
                            daCK: "Shop Ok",
                        },
                    },
                },
            };
            console.log("newDonHang", newDonHang);
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            const newShop = {
                cash: ttShop?.cash - 1000,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, ttShop._id, dispatch);
            const newTaiKhoan = {
                GDVao: "",
                GDRa: 1000,
                noiDungCK: "Phí Nền Tảng",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: ttShop?.TenShop,
                    sdtChuTk: ttShop?.sdtShop,
                },
                idChuTaiKhoan: ttShop?._id,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        }
        if (ttShop?.phiNenTang === "1% Doanh Thu") {
            const newDonHang = {
                trangThaiDH: "ĐH Ship Đã Thanh Toán Về Shop",
                ttThem: {
                    ...thongTinDh?.ttThem,
                    ...{
                        stkShop: {
                            ...thongTinDh?.ttThem?.stkShop,
                            daCK: "Shop Ok",
                        },
                    },
                },
            };
            console.log("newDonHang", newDonHang);
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            const newShop = {
                cash: ttShop?.cash - thongTinDh?.ttThem?.baoCao?.doanhThu / 100,
            };
            console.log("newShop", newShop);
            updatettShop(newShop, ttShop._id, dispatch);
            const newTaiKhoan = {
                GDVao: "",
                GDRa: (Tongtien - thongTinDh?.ttThem?.baoCao?.giamTru) / 100,
                noiDungCK: "Phí Nền Tảng",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: ttShop?.TenShop,
                    sdtChuTk: ttShop?.sdtShop,
                },
                idChuTaiKhoan: ttShop?._id,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        }
    };
    const handleShipDaHoanHang = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Ship Huỷ Đã Hoàn Hàng",
        };

        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
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

    return (
        <div className="chiTietDonHang-Container">
            <div className="quayLai-tieuDe">
                <div onClick={() => handleQuayLai()} className="quayLai">
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </div>
                <div className="tieuDe">Chi Tiết Đơn Hàng</div>
                <div className="inHoaDon" onClick={() => handlePrint()}>
                    <i className="fa-solid fa-print"></i>
                </div>
            </div>
            <div className="sanPham-container">
                {thongTinDh?.ttThem?.khachHang?.nhomKhach === "Khách Lẻ" && (
                    <div className="allSanPham">
                        {donHang?.map((item2, index) => {
                            return (
                                <div key={index} className="sanPham">
                                    <div className="tenSanPham">
                                        {item2?.tenSanPham}
                                    </div>
                                    {item2?.allDacDiemSP &&
                                        item2?.allDacDiemSP?.length > 0 &&
                                        item2?.allDacDiemSP?.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="dacDiem-themGioHang"
                                                    >
                                                        <div className="anhSp-tenSp">
                                                            <div className="tenSp">
                                                                {
                                                                    item?.tenDacDiem
                                                                }
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
                                                                        e.target
                                                                            .value,
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
                                                        {thongTinDh?.trangThaiDH ===
                                                            "ĐH Mới" ||
                                                        thongTinDh?.trangThaiDH ===
                                                            "ĐH Tìm Ship Mới" ||
                                                        thongTinDh?.trangThaiDH ===
                                                            "ĐH Ship Đã Nhận" ? (
                                                            <div>
                                                                {item.daXong ===
                                                                1 ? (
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
                                                        ) : (
                                                            <div>
                                                                {item.daXong ===
                                                                1 ? (
                                                                    <div className="daXong">
                                                                        ✅
                                                                    </div>
                                                                ) : (
                                                                    <div className="chuaXong">
                                                                        ☐
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
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
                                        item2?.allDacDiemSP?.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="dacDiem-themGioHang"
                                                    >
                                                        <div className="anhSp-tenSp">
                                                            <div className="tenSp">
                                                                {
                                                                    item?.tenDacDiem
                                                                }
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
                                                                        e.target
                                                                            .value,
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

                                                        {thongTinDh?.trangThaiDH ===
                                                            "ĐH Mới" ||
                                                        thongTinDh?.trangThaiDH ===
                                                            "ĐH Tìm Ship Mới" ||
                                                        thongTinDh?.trangThaiDH ===
                                                            "ĐH Ship Đã Nhận" ? (
                                                            <div>
                                                                {item.daXong ===
                                                                1 ? (
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
                                                        ) : (
                                                            <div>
                                                                {item.daXong ===
                                                                1 ? (
                                                                    <div className="daXong">
                                                                        ✅
                                                                    </div>
                                                                ) : (
                                                                    <div className="chuaXong">
                                                                        ☐
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
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
                                        item2?.allDacDiemSP?.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="dacDiem-themGioHang"
                                                    >
                                                        <div className="anhSp-tenSp">
                                                            <div className="tenSp">
                                                                {
                                                                    item?.tenDacDiem
                                                                }
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
                                                                        e.target
                                                                            .value,
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
                                                        {thongTinDh?.trangThaiDH ===
                                                            "ĐH Mới" ||
                                                        thongTinDh?.trangThaiDH ===
                                                            "ĐH Tìm Ship Mới" ||
                                                        thongTinDh?.trangThaiDH ===
                                                            "ĐH Ship Đã Nhận" ? (
                                                            <div>
                                                                {item.daXong ===
                                                                1 ? (
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
                                                        ) : (
                                                            <div>
                                                                {item.daXong ===
                                                                1 ? (
                                                                    <div className="daXong">
                                                                        ✅
                                                                    </div>
                                                                ) : (
                                                                    <div className="chuaXong">
                                                                        ☐
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="tinhTien-container">
                <div className="tieuDe">Tính Tiền</div>
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
                {(thongTinDh?.trangThaiDH === "ĐH Chưa Thanh Toán" ||
                    thongTinDh?.trangThaiDH ===
                        "ĐH Ship Chưa Thanh Toán Về Shop") && (
                    <img className="qr" src={qr} />
                )}
            </div>
            <div className="nguoiNhan-container">
                <div className="tieuDe">Thông Tin Người Nhận</div>
                {(thongTinDh?.ttThem?.khachHang?.noiNhan === "Ship Tận Nơi" ||
                    thongTinDh?.ttThem?.khachHang?.noiNhan ===
                        "Tự Đến Lấy") && (
                    <div className="thongTinNguoiNhan">
                        <div className="thongTinChiTiet">
                            <div className="noiDung">
                                Nhóm KH :&nbsp;
                                {thongTinDh?.ttThem?.khachHang?.nhomKhach}
                            </div>
                        </div>
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
                            <a
                                href={`tel:${thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}`}
                                className="noiDung"
                            >
                                Số Điện Thoại :&nbsp; &nbsp;
                                <i
                                    className="fa fa-phone-square"
                                    style={{ color: "#04aa6d" }}
                                ></i>
                                &nbsp;
                                {thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}
                            </a>
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
                    </div>
                )}
                {thongTinDh?.ttThem?.khachHang?.noiNhan === "Nhận Tại Bàn" && (
                    <div className="thongTinNguoiNhan">
                        <div className="thongTinChiTiet">
                            <div className="noiDung">
                                Nhóm KH :&nbsp;
                                {thongTinDh?.ttThem?.khachHang?.nhomKhach}
                            </div>
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="noiDung">
                                Nơi Nhận :&nbsp;
                                {thongTinDh?.ttThem?.khachHang?.noiNhan}
                                &emsp;-&emsp;
                                {thongTinDh?.ttThem?.khachHang?.soBan}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {thongTinDh?.trangThaiDH === "ĐH Mới" && (
                <div className="phuongThucGiaoHang-container">
                    <div className="chonPT">
                        <div className="tieuDe">Phương Thức Giao Hàng</div>
                        <select
                            onChange={(e) => settimShip(e.target.value)}
                            className="chonPhuongThuc"
                            id="provinces"
                        >
                            <option>Shop Tự Giao</option>
                            <option>Thuê Ship Ngoài</option>
                        </select>
                    </div>
                    {timShip === "Thuê Ship Ngoài" && (
                        <div className="thongTinShip">
                            <div className="noiGui">
                                Nơi Gửi :&nbsp;{ttShop?.thonXom},&nbsp;
                                {ttShop?.xa},&nbsp;
                                {ttShop?.huyen},&nbsp; {ttShop?.tinh}
                            </div>
                            <div className="noiGui">
                                SĐT Gửi :&nbsp;{ttShop?.sdtShop}
                            </div>
                            <div className="noiGui">
                                Nơi Nhận :&nbsp;{thongTinDh?.thonXomMua}
                                ,&nbsp;
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
                                <div className="input">
                                    {VND.format(+phiShip)}
                                </div>
                            </div>

                            <div className="banPhimSo">
                                <div
                                    onClick={() => setphiShip(phiShip + "1")}
                                    className="giaTriTien"
                                >
                                    1
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "2")}
                                    className="giaTriTien"
                                >
                                    2
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "3")}
                                    className="giaTriTien"
                                >
                                    3
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "4")}
                                    className="giaTriTien"
                                >
                                    4
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "5")}
                                    className="giaTriTien"
                                >
                                    5
                                </div>
                                <div
                                    onClick={() =>
                                        setphiShip(phiShip.slice(0, -1))
                                    }
                                    className="giaTriTien"
                                >
                                    <i className="fas fa-chevron-circle-left"></i>
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "6")}
                                    className="giaTriTien"
                                >
                                    6
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "7")}
                                    className="giaTriTien"
                                >
                                    7
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "8")}
                                    className="giaTriTien"
                                >
                                    8
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "9")}
                                    className="giaTriTien"
                                >
                                    9
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "0")}
                                    className="giaTriTien"
                                >
                                    0
                                </div>
                                <div
                                    onClick={() => setphiShip(phiShip + "000")}
                                    className="giaTriTien"
                                >
                                    .000
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {thongTinDh?.ttThem?.ttGiaoHang && (
                <div className="thongTinShip-container">
                    <div className="tieuDe">Thông Tin Giao Hàng</div>
                    <div className="noiDung">
                        Người Giao Hàng :&nbsp;{" "}
                        {thongTinDh?.ttThem?.ttGiaoHang?.tenNv}
                    </div>
                    <a
                        href={`tel:${thongTinDh?.ttThem?.ttGiaoHang?.sdtNv}`}
                        className="noiDung"
                    >
                        Số Điện Thoại :&nbsp; &nbsp;
                        <i
                            className="fa fa-phone-square"
                            style={{ color: "#04aa6d" }}
                        ></i>
                        &nbsp;
                        {thongTinDh?.ttThem?.ttGiaoHang?.sdtNv}
                    </a>
                    <div className="noiDung">
                        Phí Ship :&nbsp;{" "}
                        {VND.format(thongTinDh?.ttThem?.ttGiaoHang?.phiShip)}
                    </div>
                </div>
            )}
            <div className="phimChucNang-container">
                {thongTinDh?.trangThaiDH === "ĐH Mới" && (
                    <div>
                        {timShip === "Thuê Ship Ngoài" ? (
                            <div className="phimChucNang">
                                <div
                                    className="phim"
                                    onClick={() =>
                                        handleTimShip(thongTinDh?._id)
                                    }
                                >
                                    ĐH Tìm Ship Mới
                                </div>
                            </div>
                        ) : (
                            <div className="phimChucNang">
                                <div
                                    className="phim"
                                    onClick={() =>
                                        handleGiaoHang(thongTinDh?._id)
                                    }
                                >
                                    Giao Hàng
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Chưa Thanh Toán" && (
                    <div className="phimChucNang">
                        <div className="phim2" onClick={() => handleHuyDon()}>
                            Huỷ Đơn
                        </div>
                        <div
                            className="phim"
                            onClick={() => handleDaThanhToan()}
                        >
                            Đã Thanh Toán
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Đã Thanh Toán" && (
                    <div className="phimChucNang">
                        <div
                            className="phim2"
                            onClick={() => handleTraHang(thongTinDh?._id)}
                        >
                            Trả Hàng
                        </div>
                        <div
                            className="phim"
                            onClick={() => handleChuaThanhToan()}
                        >
                            Chưa Thanh Toán
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Huỷ" && (
                    <div className="phimChucNang"></div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Tìm Ship Mới" && (
                    <div className="phimChucNang">
                        <div className="phim2" onClick={() => handleTuShip()}>
                            Shop Tự Ship
                        </div>
                        <div className="phim" onClick={() => handleDaChuanBi()}>
                            Đã Chuẩn Bị
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Ship Đã Nhận" && (
                    <div className="phimChucNang">
                        <div className="phim" onClick={() => handleDangShip()}>
                            ĐH Đang Ship
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Đang Ship" && (
                    <div className="phimChucNang"></div>
                )}
                {thongTinDh?.trangThaiDH ===
                    "ĐH Ship Chưa Thanh Toán Về Shop" && (
                    <div className="phimChucNang">
                        <div
                            onClick={() => handleShipDaThanhToan()}
                            className="phim"
                        >
                            Đã Thanh Toán
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH ===
                    "ĐH Ship Đã Thanh Toán Về Shop" && (
                    <div className="phimChucNang">
                        <div
                            className="phim"
                            onClick={() => handleTraHang(thongTinDh?._id)}
                        >
                            Trả Hàng
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Ship Huỷ Chưa Hoàn Hàng" && (
                    <div className="phimChucNang">
                        <div
                            className="phim"
                            onClick={() => handleShipDaHoanHang()}
                        >
                            Đã Hoàn Hàng
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "ĐH Ship Huỷ Đã Hoàn Hàng" && (
                    <div className="phimChucNang"></div>
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

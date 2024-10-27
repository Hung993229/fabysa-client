import "./NhanGiaoHang.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    getDonHangShip,
    getDonHang,
    updateDonHang,
    updatePost,
    registerTaiKhoan,
    getTaiKhoan,
} from "../redux/apiRequest";
const NhanGiaoHang = () => {
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    const dispatch = useDispatch();
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    console.log("myDetail", myDetail);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [trangThaiDH, settrangThaiDH] = useState("ĐH Tìm Ship Mới");
    const [skip, setskip] = useState(0);
    const [sort, setsort] = useState(1);
    const [loading, setloading] = useState(0);
    const [phiNenTang, setphiNenTang] = useState(1000);
    const [thongTinDh, setthongTinDh] = useState();
    const allDonHang2 = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const [allDonHang, setallDonHang] = useState([]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    console.log("thongTinDh", thongTinDh);
    console.log("thongTinDh", thongTinDh);
    useEffect(() => {
        if (allDonHang2 && allDonHang2?.length !== 0) {
            setallDonHang([...allDonHang, ...allDonHang2]);
        }
    }, [allDonHang2]);
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
        if (trangThaiDH === "ĐH Tìm Ship Mới") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const kinhDo = position.coords.latitude;
                    const viDo = position.coords.longitude;
                    const idShop = "";
                    const sdtCtv = "";
                    const sdtKhachHang = "";
                    const sdtOrder = "";
                    const sdtXuLyDon = "";
                    const sdtGiaoHang = "";
                    const sdtThuTien = "";
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
                });
            }
        } else {
            const idShop = "";
            const sdtCtv = "";
            const sdtKhachHang = "";
            const sdtOrder = "";
            const sdtXuLyDon = "";
            const sdtGiaoHang = user?.username;
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
        }
    }, [trangThaiDH, skip]);

    const dsMenuDonHang = [
        "ĐH Tìm Ship Mới",
        "ĐH Ship Đã Nhận",
        "ĐH Đang Ship",
        "ĐH Ship Chưa Thanh Toán Về Shop",
        "ĐH Ship Đã Thanh Toán Về Shop",
        "ĐH Ship Huỷ Chưa Hoàn Hàng",
        "ĐH Ship Huỷ Đã Hoàn Hàng",
    ];

    const handleQuayLai = () => {
        setloading(0);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setallDonHang([]);
        setskip(0);
    };
    const handleChiTietDonHang = (item) => {
        if (user) {
            setloading(2);
            setthongTinDh(item);
            settrangThaiDH("");
        } else {
            alert("Đăng nhập để nhận đơn!");
        }
    };
    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setallDonHang([]);
        setskip(0);
    };
    const handleNhanShip = () => {
        if (myDetail?.cash > thongTinDh?.ttThem?.baoCao?.doanhThu) {
            const newDonHang = {
                trangThaiDH: "ĐH Ship Đã Nhận",
                sdtGiaoHang: myDetail?.soDienThoai,
                ttThem: {
                    ...thongTinDh?.ttThem,
                    ...{
                        ttGiaoHang: {
                            tenNv: myDetail?.hoTen,
                            idNv: myDetail?.user,
                            sdtNv: myDetail?.soDienThoai,
                            phiShip: thongTinDh?.ttThem?.ttGiaoHang?.phiShip,
                            coc: "Đã Cọc",
                        },
                    },
                },
            };
            console.log("newDonHang", newDonHang);
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);

            const newPost = {
                cash: myDetail?.cash - thongTinDh?.ttThem?.baoCao?.doanhThu,
            };
            console.log("newPost", newPost);
            updatePost(newPost, myDetail?._id, dispatch);
            const newTaiKhoan = {
                GDVao: "",
                GDRa: thongTinDh?.ttThem?.baoCao?.doanhThu,
                noiDungCK: "Cọc Đơn Hàng",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: myDetail?.hoTen,
                    sdtChuTk: myDetail?.soDienThoai,
                },
                idChuTaiKhoan: myDetail?.user,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);
            setthongTinDh({});
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        } else {
            alert("Thiếu Fabysa Gold để cọc!");
        }
    };
    const handleDangShip = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Đang Ship",
        };
        console.log("newDonHang", newDonHang);
        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleTimShipKhac = () => {
        const cauHoi = window.confirm("Bạn muốn huỷ nhận đơn?");
        if (cauHoi) {
            const newDonHang = {
                trangThaiDH: "ĐH Tìm Ship Mới",
            };
            console.log("newDonHang", newDonHang);
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            const newPost = {
                cash: myDetail?.cash + thongTinDh?.ttThem?.baoCao?.doanhThu,
            };
            console.log("newPost", newPost);
            updatePost(newPost, myDetail?._id, dispatch);
            const newTaiKhoan = {
                GDVao: thongTinDh?.ttThem?.baoCao?.doanhThu,
                GDRa: "",
                noiDungCK: "Hoàn Cọc ĐH",
                xacNhanChuyenTien: "Thành Công",
                thongTinThem: {
                    tenChuTk: myDetail?.hoTen,
                    sdtChuTk: myDetail?.soDienThoai,
                },
                idChuTaiKhoan: myDetail?.user,
            };
            console.log("newTaiKhoan", newTaiKhoan);
            registerTaiKhoan(newTaiKhoan, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        }
    };
    const handleDaGiaoHang = () => {
        const newDonHang = {
            trangThaiDH: "ĐH Ship Chưa Thanh Toán Về Shop",
        };

        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        const newPost = {
            cash: myDetail?.cash - phiNenTang,
        };
        console.log("newPost", newPost);
        updatePost(newPost, myDetail?._id, dispatch);
        const newTaiKhoan = {
            GDVao: "",
            GDRa: phiNenTang,
            noiDungCK: "Phí Nền Tảng",
            xacNhanChuyenTien: "Thành Công",
            thongTinThem: {
                tenChuTk: myDetail?.hoTen,
                sdtChuTk: myDetail?.soDienThoai,
            },
            idChuTaiKhoan: myDetail?.user,
        };
        console.log("newTaiKhoan", newTaiKhoan);
        registerTaiKhoan(newTaiKhoan, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleDaChuyenKhoan = () => {
        const newDonHang = {
            ttThem: {
                ...thongTinDh?.ttThem,
                ...{
                    stkShop: {
                        idNganHang: thongTinDh?.ttThem?.stkShop?.idNganHang,
                        nganHang: thongTinDh?.ttThem?.stkShop?.nganHang,
                        soTaiKhoan: thongTinDh?.ttThem?.stkShop?.soTaiKhoan,
                        tenChuTk: thongTinDh?.ttThem?.stkShop?.tenChuTk,
                        daCK: "Đã Chuyển",
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
    const handleKhachHuyDon = () => {
        const cauHoi = window.confirm("Khách muốn huỷ đơn?");
        if (cauHoi) {
            const newDonHang = {
                trangThaiDH: "ĐH Ship Huỷ Chưa Hoàn Hàng",
            };
            updateDonHang(newDonHang, thongTinDh?._id, dispatch);
            setallDonHang([]);
            settrangThaiDH(thongTinDh?.trangThaiDH);
            setloading(0);
            setskip(0);
        }
    };

    const handleNhanLaiCoc = () => {
        const newDonHang = {
            ttThem: {
                ...thongTinDh?.ttThem,
                ...{
                    ttGiaoHang: {
                        sdtNv: myDetail?.hoTen,
                        idNv: myDetail?._id,
                        tenNv: myDetail?.soDienThoai,
                        phiShip: thongTinDh?.ttThem?.ttGiaoHang?.phiShip,
                        coc: "Đã Nhận Lại Cọc",
                    },
                },
            },
        };
        updateDonHang(newDonHang, thongTinDh?._id, dispatch);
        const newPost = {
            cash: myDetail?.cash + thongTinDh?.ttThem?.baoCao?.doanhThu,
        };
        updatePost(newPost, myDetail?._id, dispatch);

        const newTaiKhoan = {
            GDVao: thongTinDh?.ttThem?.baoCao?.doanhThu,
            GDRa: "",
            noiDungCK: "Nhận Lại Cọc",
            xacNhanChuyenTien: "Thành Công",
            thongTinThem: {
                tenChuTk: myDetail?.hoTen,
                sdtChuTk: myDetail?.soDienThoai,
            },
            idChuTaiKhoan: myDetail?.user,
        };
        console.log("newTaiKhoan", newTaiKhoan);
        registerTaiKhoan(newTaiKhoan, dispatch);
        setallDonHang([]);
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setloading(0);
        setskip(0);
    };
    const handleDinhDangSo = (data) => {
        const n = +data;
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
        });
    };
    const handlePrint = () => {
        window.print();
    };
    // quy trinh ship hang: đăng tìm ship => shiper nhận ship(fabysa giu tien coc) => shiper nhan hang => shiper giao hang =>
    // neu hoan thanh => ship chuyen tien ve cho shop => shop xác nhan da thanh toan
    // neu that bại => ship chuyen hang ve cho shop => shop xác nhan da nhan hàng
    // Shiper làm mất hàng Fabysa chịu trách nhiệm
    //  Viet QR
    const nganHang = thongTinDh?.ttThem?.stkShop?.nganHang;
    const BANK_ID = thongTinDh?.ttThem?.stkShop?.idNganHang;
    const ACCOUNT_NO = thongTinDh?.ttThem?.stkShop?.soTaiKhoan;
    const TEMPLATE = "print";
    const AMOUNT =
        thongTinDh?.ttThem?.baoCao?.doanhThu -
        thongTinDh?.ttThem?.baoCao?.giamTru;
    const DESCRIPTION = `Hoá Đơn ${thongTinDh?.soBan}`;
    const ACCOUNT_NAME = thongTinDh?.ttThem?.stkShop?.tenChuTk;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR
    return (
        <div className="view">
            <div className="mobile">
                {loading === 0 && (
                    <div className="NhanGiaoHang-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <a
                                href={`/ca-nhan/${tenVietTat}/${idShop}/a/${idCtv}/${tenCtv}/${sdtCtv}`}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </a>
                            <div className="tieuDe">Đơn Hàng</div>
                            {user ? (
                                <a
                                    href={`/tai-khoan/${tenVietTat || "a"}/${
                                        idShop || "a"
                                    }/a/${idCtv || "a"}/${tenCtv || "a"}/${
                                        sdtCtv || "a"
                                    }/${user?._id}`}
                                    className="taiKhoanShop"
                                >
                                    <i
                                        className="fa fa-plus"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &#160;
                                    {handleDinhDangSo(myDetail?.cash)}
                                    &#160;
                                    <i
                                        className="fab fa-empire"
                                        style={{ color: "#ef9b0f" }}
                                    ></i>
                                </a>
                            ) : (
                                <div
                                    onClick={() =>
                                        alert("Đăng nhập để sử dụng!")
                                    }
                                    className="taiKhoanShop"
                                >
                                    <i
                                        className="fa fa-plus"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &#160;
                                    {handleDinhDangSo(100000)}
                                    &#160;
                                    <i
                                        className="fab fa-empire"
                                        style={{ color: "#ef9b0f" }}
                                    ></i>
                                </div>
                            )}
                        </div>
                        <div className="phiNenTang">
                            Phí nền tảng: 1.000
                            <i
                                className="fab fa-empire"
                                style={{ color: "#ef9b0f" }}
                            ></i>
                            /Đơn Hàng
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

                        <div className="donHang-all">
                            <div className="ds">Danh Sách Đơn Hàng</div>
                            {allDonHang && allDonHang?.length > 0 ? (
                                allDonHang?.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                handleChiTietDonHang(item)
                                            }
                                            key={index}
                                            className="donHang-container2"
                                        >
                                            <div className="ngayThang-container">
                                                <div className="ngayThang">
                                                 {new Date(
                                                    item?.createdAt
                                                )?.getDate()}/{new Date(
                                                    item?.createdAt
                                                )?.getMonth()+1}/{new Date(
                                                    item?.createdAt
                                                )?.getFullYear()}
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
                                                    {item?.ttThem?.ttGiaoHang
                                                        ?.coc ===
                                                        "Đã Nhận Lại Cọc" && (
                                                        <div className="daNhan">
                                                            Đã Nhận
                                                        </div>
                                                    )}
                                                    {item?.ttThem?.stkShop
                                                        ?.daCK ===
                                                        "Đã Chuyển" && (
                                                        <div className="daNhan">
                                                            Kiểm Tra
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="phi-coc-daNhan">
                                                <div className="phi">
                                                    Nhận :&nbsp;
                                                    {VND.format(
                                                        item?.ttThem?.ttGiaoHang
                                                            ?.phiShip
                                                    )}
                                                </div>
                                                <div className="coc">
                                                    Tiền Cọc :&nbsp;
                                                    {VND.format(
                                                        item?.ttThem?.baoCao
                                                            ?.doanhThu -
                                                            item?.ttThem?.baoCao
                                                                ?.giamTru
                                                    )}
                                                </div>
                                            </div>
                                            <div className="noiGui-diaChi">
                                                <div className="noiGui">
                                                    Nơi Gửi
                                                </div>
                                                <div className="diaChi">
                                                    {item?.thonXomBan},&nbsp;
                                                    {item?.xaBan},&nbsp;
                                                    {item?.huyenBan},&nbsp;
                                                    {item?.tinhBan}
                                                </div>
                                                <div className="noiGui">
                                                    Nơi Nhận
                                                </div>
                                                <div className="diaChi">
                                                    {item?.thonXomMua},&nbsp;
                                                    {item?.xaMua},&nbsp;
                                                    {item?.huyenMua},&nbsp;
                                                    {item?.tinhMua}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="trong">Trống!</div>
                            )}
                        </div>
                    </div>
                )}
                {loading === 2 && (
                    <div className="chiTietDonHang-ConTaiNer">
                        <div className="quayLai-tieuDe">
                            <div
                                onClick={() => handleQuayLai()}
                                className="quayLai"
                            >
                                <i className="fa fa-angle-double-left"></i>Quay
                                Lại
                            </div>
                            <div className="tieuDe">Chi Tiết Đơn Hàng</div>
                            <div
                                className="inHoaDon"
                                onClick={() => handlePrint()}
                            >
                                <i className="fa-solid fa-print"></i>
                            </div>
                        </div>
                        <div className="chiTiet">
                            <div className="nhan-coc">
                                <div className="phiShip">
                                    Nhận : &nbsp;
                                    {VND.format(
                                        thongTinDh?.ttThem?.ttGiaoHang?.phiShip
                                    )}
                                </div>
                                <div className="tienCoc">
                                    Tiền Cọc :&nbsp;
                                    {VND.format(
                                        thongTinDh?.ttThem?.baoCao?.doanhThu -
                                            thongTinDh?.ttThem?.baoCao?.giamTru
                                    )}
                                </div>
                            </div>
                            <div className="noiGui-thongTin">
                                <div className="tieuDe">Nơi Gửi</div>
                                <div className="noiDung">
                                    Tên Shop :&nbsp;{thongTinDh?.tenShop}
                                </div>
                                <a
                                    href={`tel:${thongTinDh?.sdtShop}`}
                                    className="noiDung"
                                >
                                    Số Điện Thoại :&nbsp; &nbsp;
                                    <i
                                        className="fa fa-phone-square"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &nbsp;
                                    {thongTinDh?.sdtShop}
                                </a>
                                <div className="noiDung">
                                    Địa Chỉ : &nbsp;{thongTinDh?.thonXomBan}
                                    ,&nbsp;
                                    {thongTinDh?.xaBan},&nbsp;
                                    {thongTinDh?.huyenBan},&nbsp;
                                    {thongTinDh?.tinhBan}
                                </div>
                            </div>
                            <div className="noiGui-thongTin">
                                <div className="tieuDe">Nơi Nhận</div>
                                <div className="noiDung">
                                    Người Nhận :&nbsp;
                                    {
                                        thongTinDh?.ttThem?.khachHang
                                            ?.hoTenNguoiMua
                                    }
                                </div>

                                <a
                                    className="noiDung"
                                    href={`tel:${thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}`}
                                >
                                    Số Điện Thoại :&nbsp; &nbsp;
                                    <i
                                        className="fa fa-phone-square"
                                        style={{ color: "#04aa6d" }}
                                    ></i>
                                    &nbsp;
                                    {thongTinDh?.ttThem?.khachHang?.sdtNguoiMua}
                                </a>
                                <div className="noiDung">
                                    Địa Chỉ : &nbsp;{thongTinDh?.thonXomMua}
                                    ,&nbsp;
                                    {thongTinDh?.xaMua},&nbsp;
                                    {thongTinDh?.huyenMua},&nbsp;
                                    {thongTinDh?.tinhMua}
                                </div>
                                <div className="soTien">
                                    Cần Thu = Tiền Hàng + Phí Ship = &nbsp;
                                    {VND.format(
                                        +thongTinDh?.ttThem?.baoCao?.doanhThu +
                                            +thongTinDh?.ttThem?.ttGiaoHang
                                                ?.phiShip -
                                            +thongTinDh?.ttThem?.baoCao?.giamTru
                                    )}
                                </div>
                            </div>
                        </div>
                        {thongTinDh?.trangThaiDH ===
                            "ĐH Ship Chưa Thanh Toán Về Shop" &&
                            thongTinDh?.ttThem?.stkShop && (
                                <div className="thanhToan-container">
                                    <div className="tieuDe">
                                        Thanh Toán Tiền Về Shop
                                    </div>
                                    <div className="noiDung">
                                        Ngân Hàng : &nbsp;
                                        {thongTinDh?.ttThem?.stkShop?.nganHang}
                                    </div>
                                    <div className="noiDung">
                                        Số Tài Khoản : &nbsp;
                                        {
                                            thongTinDh?.ttThem?.stkShop
                                                ?.soTaiKhoan
                                        }
                                    </div>
                                    <div className="noiDung">
                                        Chủ Tài Khoản : &nbsp;
                                        {thongTinDh?.ttThem?.stkShop?.tenChuTk}
                                    </div>
                                    <div className="soTien">
                                        Số Tiền = Tiền Hàng : &nbsp;
                                        {VND.format(
                                            thongTinDh?.ttThem?.baoCao
                                                ?.doanhThu -
                                                thongTinDh?.ttThem?.baoCao
                                                    ?.giamTru
                                        )}
                                    </div>
                                    <img className="qr" src={qr} />
                                </div>
                            )}
                        <div className="phimChucNang-container">
                            {thongTinDh?.trangThaiDH === "ĐH Tìm Ship Mới" && (
                                <div className="phimChucNang">
                                    <div
                                        className="phim"
                                        onClick={() => handleNhanShip()}
                                    >
                                        Nhận Ship
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH === "ĐH Ship Đã Nhận" && (
                                <div className="phimChucNang">
                                    <div
                                        className="phim2"
                                        onClick={() => handleTimShipKhac()}
                                    >
                                        Huỷ Nhận Ship
                                    </div>
                                    <div
                                        className="phim"
                                        onClick={() => handleDangShip()}
                                    >
                                        ĐH Đang Ship
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH === "ĐH Đang Ship" && (
                                <div className="phimChucNang">
                                    <div
                                        className="phim2"
                                        onClick={() => handleKhachHuyDon()}
                                    >
                                        Khách Huỷ Đơn
                                    </div>
                                    <div
                                        className="phim"
                                        onClick={() => handleDaGiaoHang()}
                                    >
                                        Khách Đã Nhận
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Chưa Thanh Toán Về Shop" && (
                                <div className="phimChucNang">
                                    {thongTinDh?.ttThem?.stkShop?.daCK !==
                                    "Đã Chuyển" ? (
                                        <div
                                            className="phim"
                                            onClick={() =>
                                                handleDaChuyenKhoan()
                                            }
                                        >
                                            Đã Chuyển Khoản
                                        </div>
                                    ) : (
                                        <div className="xacNhan">
                                            Shop Đang Kiểm Tra Giao Dịch!
                                        </div>
                                    )}
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Đã Thanh Toán Về Shop" && (
                                <div className="phimChucNang">
                                    {thongTinDh?.ttThem?.ttGiaoHang?.coc !==
                                        "Đã Nhận Lại Cọc" && (
                                        <div
                                            className="phim"
                                            onClick={() => handleNhanLaiCoc()}
                                        >
                                            Nhận Lại Cọc
                                        </div>
                                    )}
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Huỷ Chưa Hoàn Hàng" && (
                                <div className="phimChucNang">
                                    <div className="xacNhan">
                                        Hoàn hàng về shop để nhận lại cọc!
                                    </div>
                                </div>
                            )}
                            {thongTinDh?.trangThaiDH ===
                                "ĐH Ship Huỷ Đã Hoàn Hàng" && (
                                <div className="phimChucNang">
                                    {thongTinDh?.ttThem?.ttGiaoHang?.coc !==
                                        "Đã Nhận Lại Cọc" && (
                                        <div
                                            className="phim"
                                            onClick={() => handleNhanLaiCoc()}
                                        >
                                            Nhận Lại Cọc
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="pc">
                <div className="NhanGiaoHang-ConTaiNer">NhanGiaoHang</div>
            </div>
        </div>
    );
};
export default NhanGiaoHang;

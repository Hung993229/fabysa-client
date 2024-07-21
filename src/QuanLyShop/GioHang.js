import "./GioHang.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getArrSanPham,
    updateGioHang,
    getOneDonHang,
    registerDonHang,
    updateDonHang,
    deleteGioHang,
} from "../redux/apiRequest";
import InHoaDon from "./InHoaDon";
const GioHang = (props) => {
    const {
        cart,
        setcart,
        loading,
        setloading,
        setTongtien,
        setTongsoluong,
        Tongtien,
        Tongsoluong,
        handleDaThemGioHang,
        setcartDemo,
        cartDemo,
        soBan,
        setsoBan,
        maBaoMat,
        setmaBaoMat,
    } = props;

    const user = useSelector((state) => state.auth.login.currentUser);

    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const donHang = useSelector((state) => state.donHang.donHang?.donHang);
    const { tenVietTat, idShop, idCtv, tenCtv, sdtCtv } = useParams();
    console.log("donHang", donHang);
    const [donHangDaDat, setdonHangDaDat] = useState([]);
    useEffect(() => {
        if (donHang) {
            setdonHangDaDat(donHang?.donHang?.donHang);
        }
    }, [donHang]);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const ttShopThem = ttShop?.ttShopThem;
    const khachSi = ttShopThem?.khachSi;
    const khachCtv = ttShopThem?.khachCtv;
    const nvBanHang = ttShopThem?.nvBanHang;
    const nvQuanLy = ttShopThem?.nvQuanLy;
    const dispatch = useDispatch();
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const d = new Date();
    const gioPhut = `${d.getHours()}h ${d.getMinutes()}`;
    const ngayThang = ` ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    useEffect(() => {
        if (idShop && soBan) {
            getOneDonHang(idShop, soBan, dispatch);
        }
    }, [idShop, soBan]);
    const [tongTien2, settongTien2] = useState(0);
    const [giamTru, setgiamTru] = useState(0);
    const [noiNhan, setnoiNhan] = useState("Nhận Tại Bàn");
    const arrSoBan = ttShopThem?.soBan;
    useEffect(() => {
        if (noiNhan === "Tự Đến Lấy") {
            setsoBan(d);
        }
        if (noiNhan === "Ship Tận Nơi") {
            setsoBan(d);
        }
    }, [noiNhan]);
    // thong tin nguoi nhan không có user
    const [sdtNguoiMua, setsdtNguoiMua] = useState("Nhập số điện thoại");
    const [hoTenNguoiMua, sethoTenNguoiMua] = useState("Nhập họ và tên");
    const [dcNguoiNMua, setdcNguoiNMua] = useState("Nhập địa chỉ");
    const [ghiChuNguoiMua, setghiChuNguoiMua] = useState("Giao sớm nhé Shop!");
    useEffect(() => {
        if (myDetail) {
            setsdtNguoiMua(myDetail?.soDienThoai);
            sethoTenNguoiMua(myDetail?.hoTen);
            setdcNguoiNMua(
                `${myDetail?.thonXom}, ${myDetail?.xa}, ${myDetail?.huyen}, ${myDetail?.tinh}`
            );
        }
    }, [myDetail]);

    const handleDonHangMoi = () => {
        if (!noiNhan) {
            alert("Vui lòng chọn nơi nhận!");
        } else {
            if (
                ((noiNhan === "Ship Tận Nơi" || noiNhan === "Tự Đến Lấy") &&
                    (hoTenNguoiMua === "Nhập họ và tên" ||
                        sdtNguoiMua === "Nhập số điện thoại" ||
                        dcNguoiNMua === "Nhập địa chỉ")) ||
                (noiNhan === "Nhận Tại Bàn" && !soBan)
            ) {
                alert("Thiếu thông tin người nhận!");
            } else {
                if (donHang && !donHang?.donHang) {
                    try {
                        const maBaoMat2 =
                            Math.floor(Math.random() * 9999) + 1000;
                        const thongTinNguoiMua = {
                            hoTenNguoiMua: hoTenNguoiMua,
                            sdtNguoiMua: sdtNguoiMua,
                            dcNguoiNMua: dcNguoiNMua,
                            ghiChuNguoiMua: ghiChuNguoiMua,
                            noiNhan: noiNhan,
                            soBan: soBan || "",
                            maBaoMat: maBaoMat2,
                            nhomKhach: "Khách Lẻ",
                            ttCtv: {
                                idCtv: idCtv,
                                tenCtv: tenCtv,
                                sdtCtv: sdtCtv,
                            },
                            ttOrder: user?.username || "",
                            ttXuLyDon: "",
                            ttGiaoHang: "",
                            ttThuTien: "",
                        };
                        setmaBaoMat(maBaoMat2);
                        console.log("thongTinNguoiMua", thongTinNguoiMua);
                        const newDonHang = {
                            khachHang: thongTinNguoiMua,
                            donHang: cart,
                            idShop: idShop,
                            idCtv: idCtv,
                            idKhachHang: user?._id || "",
                            trangThaiDH: "Đơn Hàng Mới",
                            soBan: soBan || "",
                            user: user?._id || "",
                        };
                        console.log("newDonHang", newDonHang);
                        registerDonHang(newDonHang, dispatch);
                        setcart([]);
                        setcartDemo([]);
                        if (noiNhan !== "Nhận Tại Bàn") {
                            setnoiNhan("Nhận Tại Bàn");
                            setsoBan("fabysa");
                        }
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    const id = donHang.donHang._id;
                    const newDonHang = {
                        donHang: [...cart, ...donHangDaDat],
                        trangThaiDH: "Đơn Hàng Mới",
                    };
                    updateDonHang(newDonHang, id, dispatch);
                    console.log("newDonHang", newDonHang);
                    setcart([]);
                    setcartDemo([]);
                    if (noiNhan !== "Nhận Tại Bàn") {
                        setnoiNhan("Nhận Tại Bàn");
                        setsoBan("fabysa");
                    }
                }
            }
        }
    };
    // thong tin nguoi nhan không có user

    // Thay Doi So Luong
    const handleSoLuong = (sl, item2, item) => {
        if (sl < 0) {
            alert("Số lượng phải lớn hơn 0");
        } else {
            // cartDemo
            const timSP = cartDemo.find((item3) => item3?._id === item2._id);
            const allDacDiemSP = timSP?.allDacDiemSP;
            const timDacDiemSPDung = {
                slMua: +sl,
                AnhSanPham: item?.AnhSanPham,
                tenDacDiem: item?.tenDacDiem,
                giaCtv: item?.giaCtv,
                giaKhuyenMai: item?.giaKhuyenMai,
                giaNiemYet: item?.giaNiemYet,
                giaSi: item?.giaSi,
                giaVon: item?.giaVon,
                soLuong: item?.soLuong,
            };
            const timDacDiemSPKhac = allDacDiemSP?.map((item5) =>
                item5?.tenDacDiem !== item?.tenDacDiem
                    ? item5
                    : timDacDiemSPDung
            );
            setcartDemo(
                cartDemo?.map((item4) =>
                    item4?._id !== item2?._id
                        ? item4
                        : {
                              _id: item2?._id,
                              tenSanPham: item2?.tenSanPham,
                              allDacDiemSP: timDacDiemSPKhac,
                          }
                )
            );
            // cartDemo
            // cart
            if (cart && cart?.length > 0) {
                const timSanPham = cart.find(
                    (item6) => item6?._id === item2?._id
                );
                console.log("timSanPham", timSanPham);
                const allDacDiemSP0 = timSanPham?.allDacDiemSP;
                const timDacDiemSPDung2 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                const timDacDiemSPKhac2 = allDacDiemSP0?.map((item5) =>
                    item5?.tenDacDiem !== item?.tenDacDiem
                        ? item5
                        : timDacDiemSPDung2
                );
                if (!timSanPham) {
                    setcart([
                        ...cart,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: [timDacDiemSPDung2],
                        },
                    ]);
                } else {
                    const allDacDiemSP2 = timSanPham.allDacDiemSP;
                    const allDacDiemSP3 = allDacDiemSP2.filter(
                        (item3) => item3.tenDacDiem !== item.tenDacDiem
                    );
                    const allDacDiemSP4 = [...allDacDiemSP3, timDacDiemSPDung2];
                    const cart2 = cart.filter(
                        (item7) => item7?._id !== item2?._id
                    );
                    setcart([
                        ...cart2,
                        {
                            _id: item2?._id,
                            tenSanPham: item2?.tenSanPham,
                            allDacDiemSP: allDacDiemSP4,
                        },
                    ]);
                }
            } else {
                const timDacDiemSPDung3 = {
                    slMua: +sl,
                    gioPhut: gioPhut,
                    tenDacDiem: item?.tenDacDiem,
                    giaCtv: item?.giaCtv,
                    giaKhuyenMai: item?.giaKhuyenMai,
                    giaNiemYet: item?.giaNiemYet,
                    giaSi: item?.giaSi,
                    giaVon: item?.giaVon,
                    soLuong: item?.soLuong,
                };
                setcart([
                    {
                        _id: item2?._id,
                        tenSanPham: item2?.tenSanPham,
                        allDacDiemSP: [timDacDiemSPDung3],
                    },
                ]);
            }
            // cart
        }
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

        const donHangSua = donHangDaDat?.map((item3) =>
            item3 === item2 ? sanPham : item3
        );
        setdonHangDaDat(donHangSua);
        const id = donHang?.donHang?._id;
        const newDonHang = {
            donHang: donHangSua,
        };
        updateDonHang(newDonHang, id, dispatch);
    };
    const handleGiamTru = (giamTru3) => {
        const id = donHang.donHang._id;
        setgiamTru(giamTru3);
        const giamTru2 = { giamTru: giamTru3 };
        const newDonHang = {
            khachHang: { ...donHang.donHang.khachHang, ...giamTru2 },
        };
        updateDonHang(newDonHang, id, dispatch);
    };
    // Thay doi so luong
    // Tinh Tong Tien và so luong
    const tinhtongtien = () => {
        let tt = 0;
        if (cartDemo?.length !== 0) {
            cartDemo?.map((sp) => {
                sp?.allDacDiemSP?.map((item) => {
                    tt += +item?.slMua * item?.giaKhuyenMai;
                });
            });
        }

        setTongtien(tt);
    };
    const tinhtongtien2 = () => {
        let tt2 = 0;
        if (donHangDaDat?.length !== 0) {
            donHangDaDat?.map((sp) => {
                sp?.allDacDiemSP?.map((item) => {
                    tt2 += +item?.slMua * item?.giaKhuyenMai;
                });
            });
        }

        settongTien2(tt2);
    };
    const tinhsoluong = () => {
        let tt = 0;
        if (cartDemo?.length !== 0) {
            cartDemo?.map((sp) => {
                sp?.allDacDiemSP?.map((item) => {
                    tt += +item?.slMua;
                });
            });
        }

        setTongsoluong(tt);
    };
    useEffect(() => {
        tinhtongtien();
        tinhsoluong();
    });
    useEffect(() => {
        tinhtongtien2();
    }, [donHangDaDat]);
    // Tinh Tong Tien và so luong

    //  Viet QR
    const nganHang = ttShop?.ttShopThem?.nganHang;
    const BANK_ID = nganHang?.maSo;
    const ACCOUNT_NO = nganHang?.taiKhoanNganHang;
    const TEMPLATE = "print";
    const AMOUNT = tongTien2 - giamTru;
    const DESCRIPTION = `Hoá Đơn ${soBan}`;
    const ACCOUNT_NAME = nganHang?.chuTaiKhoanNganhang;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR
    const handleDaThanhToan = () => {
        const id = donHang.donHang._id;
        try {
            const newDonHang = {
                trangThaiDH: "Đơn Hàng Hoàn Thành",
                khachHang: {
                    ...donHang.donHang.khachHang,
                    ttThuTien: user?.username,
                },
            };
            updateDonHang(newDonHang, id, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    const handleChuaThanhToan = () => {
        const id = donHang.donHang._id;
        try {
            const newDonHang = {
                trangThaiDH: "Đơn Hàng Mới",
                khachHang: { ...donHang.donHang.khachHang, ttThuTien: "" },
            };
            updateDonHang(newDonHang, id, dispatch);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="gioHang-container">
                <div className="quayLai-tieuDe">
                    <div className="quayLai" onClick={() => setloading(0)}>
                        Quay Lại
                    </div>
                    <div className="tieuDe">Thông Tin Giỏ Hàng</div>
                </div>

                {cartDemo?.length !== 0 ? (
                    <div className="thongTinGioHang-container">
                        {cartDemo?.map((item2, index) => {
                            return (
                                <div key={index} className="sanPham">
                                    <div className="tenSanPham-xoa">
                                        <div className="tenSanPham">
                                            {item2?.tenSanPham}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleDaThemGioHang(item2)
                                            }
                                            className="xoa"
                                        >
                                            ✖️
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
                                                            <img
                                                                src={
                                                                    item?.AnhSanPham
                                                                }
                                                                className="anhSp"
                                                                alt="timtim"
                                                            />
                                                            <div className="tenSp">
                                                                {
                                                                    item?.tenDacDiem
                                                                }
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
                                                            <div className="sl">
                                                                {item?.soLuong}
                                                            </div>
                                                        </div>
                                                        <div className="soLuong-SL">
                                                            <div className="soLuong">
                                                                Số Lượng
                                                            </div>
                                                            <input
                                                                type="number"
                                                                className="SL"
                                                                placeholder={
                                                                    item?.slMua
                                                                }
                                                                onChange={(e) =>
                                                                    handleSoLuong(
                                                                        e.target
                                                                            .value,
                                                                        item2,
                                                                        item
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
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            );
                        })}
                        <div className="tongTien">
                            <div className="tieude">Tổng Tiền Hàng</div>
                            <div className="sotien">{VND.format(Tongtien)}</div>
                        </div>
                    </div>
                ) : (
                    <div className="datHangThanhCong-conatiner">
                        {donHang &&
                        (donHang.message === "Đặt Hàng Thành Công!" ||
                            donHang.message === "Cập nhật thành công!") ? (
                            <div className="datHangTC">
                                Đặt Hàng Thành Công!
                            </div>
                        ) : (
                            <div className="datHangTC">Giỏ Hàng Trống!</div>
                        )}
                    </div>
                )}
                <div className="chonNoiNhan-container">
                    <div className="chonNoiNhan">Chọn Nơi Nhận</div>

                    <div className="noiNhan-soBan">
                        <select
                            onChange={(e) => setnoiNhan(e.target.value)}
                            className="noiNhan"
                        >
                            <option>Nhận Tại Bàn</option>
                            <option>Tự Đến Lấy</option>
                            <option>Ship Tận Nơi</option>
                        </select>
                        {noiNhan === "Nhận Tại Bàn" && (
                            <>
                                <select
                                    onChange={(e) => setsoBan(e.target.value)}
                                    className="soBan"
                                >
                                    <option value="">Chọn Số bàn</option>
                                    {arrSoBan &&
                                        arrSoBan.length > 0 &&
                                        arrSoBan.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                </select>
                                {(soBan &&
                                    arrSoBan?.find((item) => item === soBan) &&
                                    donHang &&
                                    donHang?.donHang &&
                                    +donHang?.donHang?.khachHang?.maBaoMat ===
                                        +maBaoMat) ||
                                (soBan &&
                                    arrSoBan?.find((item) => item === soBan) &&
                                    donHang &&
                                    donHang?.donHang &&
                                    +donHang?.donHang?.khachHang
                                        ?.sdtNguoiMua === +user?.username &&
                                    user) ||
                                soBan === "fabysa" ||
                                !soBan ||
                                !donHang?.donHang ? (
                                    <></>
                                ) : (
                                    <input
                                        onChange={(e) =>
                                            setmaBaoMat(e.target.value)
                                        }
                                        placeholder="Mã Bảo Mật"
                                        className="maBaoVe"
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>

                {noiNhan !== "Nhận Tại Bàn" && (
                    <div className="thongTinNguoiNhan-container">
                        <div className="thongTinNguoiNhan">
                            Thông Tin Người Nhận
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="tieuDe">Họ Và Tên</div>
                            <input
                                className="noiDung"
                                onChange={(e) =>
                                    sethoTenNguoiMua(e.target.value)
                                }
                                placeholder={hoTenNguoiMua}
                            />
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="tieuDe">Số Điện Thoại</div>

                            <input
                                className="noiDung"
                                onChange={(e) => setsdtNguoiMua(e.target.value)}
                                placeholder={sdtNguoiMua}
                            />
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="tieuDe">Địa Chỉ</div>
                            <input
                                className="noiDung"
                                onChange={(e) => setdcNguoiNMua(e.target.value)}
                                placeholder={dcNguoiNMua}
                            />
                        </div>
                        <div className="thongTinChiTiet">
                            <div className="tieuDe">Ghi Chú Thêm</div>
                            <input
                                className="noiDung"
                                placeholder={ghiChuNguoiMua}
                                onChange={(e) =>
                                    setghiChuNguoiMua(e.target.value)
                                }
                            />
                        </div>
                    </div>
                )}
                {(noiNhan === "Nhận Tại Bàn" &&
                    cart &&
                    cart?.length > 0 &&
                    donHang &&
                    donHang?.donHang &&
                    soBan &&
                    arrSoBan?.find((item) => item === soBan) &&
                    donHangDaDat?.length !== 0 &&
                    +donHang?.donHang?.khachHang?.maBaoMat === +maBaoMat) ||
                (noiNhan === "Nhận Tại Bàn" &&
                    cart &&
                    cart?.length > 0 &&
                    donHang &&
                    donHang?.donHang &&
                    arrSoBan?.find((item) => item === soBan) &&
                    donHangDaDat?.length !== 0 &&
                    user &&
                    +user?.username ===
                        +donHang?.donHang?.khachHang?.sdtNguoiMua) ||
                (noiNhan === "Nhận Tại Bàn" &&
                    cart &&
                    cart?.length > 0 &&
                    soBan &&
                    arrSoBan?.find((item) => item === soBan) &&
                    !donHang?.donHang) ||
                (noiNhan !== "Nhận Tại Bàn" && cart && cart?.length > 0) ? (
                    <div onClick={() => handleDonHangMoi()} className="datHang">
                        ĐẶT HÀNG
                    </div>
                ) : (
                    <div
                        onClick={() => alert("Thiếu thông tin đơn hàng!")}
                        className="datHang2"
                    >
                        ĐẶT HÀNG
                    </div>
                )}
                {noiNhan === "Nhận Tại Bàn" &&
                    donHangDaDat &&
                    donHangDaDat.length !== 0 &&
                    soBan &&
                    arrSoBan?.find((item) => item === soBan) &&
                    (+donHang?.donHang?.khachHang?.maBaoMat === +maBaoMat ||
                        nvBanHang?.find(
                            (item) => item?.sdtnvBanHang === user?.username
                        ) ||
                        nvQuanLy?.find(
                            (item) => item?.sdtnvQuanLy === user?.username
                        ) ||
                        user?._id === ttShop?.user ||
                        user?.admin === true ||
                        +myDetail?.soDienThoai ===
                            +donHang?.donHang?.khachHang?.sdtNguoiMua) && (
                        <>
                            <div className="thongTinDonHang-container">
                                <div className="thongTinDonHang">
                                    Hoá Đơn Mua Hàng
                                </div>

                                <div className="soBan-maBaoMat">
                                    <div className="soBan">
                                        Số Bàn:&ensp;
                                        {donHang?.donHang?.khachHang?.soBan}
                                    </div>
                                    <div className="maBaoMat">
                                        Mã Bảo Mật:&ensp;
                                        {donHang?.donHang?.khachHang?.maBaoMat}
                                    </div>
                                </div>

                                {donHangDaDat?.map((item2, index) => {
                                    return (
                                        <div key={index} className="sanPham">
                                            <div className="tenSanPham-xoa">
                                                <div className="tenSanPham">
                                                    {item2?.tenSanPham}
                                                </div>
                                            </div>

                                            {item2?.allDacDiemSP &&
                                                item2?.allDacDiemSP?.length >
                                                    0 &&
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
                                                                        {
                                                                            item?.gioPhut
                                                                        }
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
                                                                    {nvBanHang?.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item?.sdtnvBanHang ===
                                                                            user?.username
                                                                    ) ||
                                                                    nvQuanLy?.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item?.sdtnvQuanLy ===
                                                                            user?.username
                                                                    ) ||
                                                                    user?._id ===
                                                                        ttShop?.user ||
                                                                    user?.admin ===
                                                                        true ? (
                                                                        <input
                                                                            className="SL"
                                                                            placeholder={
                                                                                item?.slMua
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                suaDonHang(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                    item,
                                                                                    item2
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <div className="SL">
                                                                            {
                                                                                item?.slMua
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="thanhTien-TT">
                                                                    <div className="thanhTien">
                                                                        Thành
                                                                        Tiền
                                                                    </div>
                                                                    <div className="TT">
                                                                        {VND.format(
                                                                            item?.slMua *
                                                                                item?.giaKhuyenMai
                                                                        )}
                                                                    </div>
                                                                </div>
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
                                                        );
                                                    }
                                                )}
                                        </div>
                                    );
                                })}
                                <div className="tinhTien">
                                    <div className="tongTien">
                                        <div className="tieude">
                                            Tổng Tiền Hàng :
                                        </div>
                                        <div className="sotien">
                                            {VND.format(tongTien2)}
                                        </div>
                                    </div>
                                    <div className="tongTien">
                                        <div className="tieude">Giảm Trừ :</div>
                                        {nvBanHang?.find(
                                            (item) =>
                                                item?.sdtnvBanHang ===
                                                user?.username
                                        ) ||
                                        nvQuanLy?.find(
                                            (item) =>
                                                item?.sdtnvQuanLy ===
                                                user?.username
                                        ) ||
                                        user?._id === ttShop?.user ||
                                        user?.admin === true ? (
                                            <input
                                                type="number"
                                                className="sotien"
                                                placeholder={VND.format(
                                                    giamTru
                                                )}
                                                onChange={(e) =>
                                                    handleGiamTru(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="sotien">
                                                {VND.format(giamTru)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="tongTien">
                                        <div className="tieude">
                                            Cần Thanh Toán :
                                        </div>
                                        <div className="sotien">
                                            {VND.format(tongTien2 - giamTru)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="thanhToanQrCode-container">
                                <div className="thanhToanQr">
                                    Thanh Toán Qua QR Code
                                </div>
                                <img className="qr" src={qr} />
                            </div>
                            {donHang &&
                            donHang?.donHang?.trangThaiDH ===
                                "Đơn Hàng Hoàn Thành" ? (
                                <div
                                    onClick={() => handleChuaThanhToan()}
                                    className="daThanhToan"
                                >
                                    Đã Thanh Toán
                                </div>
                            ) : (
                                <div
                                    onClick={() => handleDaThanhToan()}
                                    className="chuaThanhToan"
                                >
                                    Đã Thanh Toán
                                </div>
                            )}
                        </>
                    )}
            </div>
        </>
    );
};
export default GioHang;

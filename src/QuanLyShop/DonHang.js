import "./DonHang.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import InHoaDon from "./InHoaDon";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDonHang,
    updateDonHang,
    getttShop,
    getArrSanPham,
    getYourStatus,
    getPost,
    registerDonHang,
} from "../redux/apiRequest";
import { useEffect } from "react";
const DonHang = (props) => {
    const {
        loading,
        setloading,
        thongTinDh,
        setthongTinDh,
        settrangThaiDH,
        trangThaiDH,
        setallDonHang,
        allDonHang,
        setskip,
        skip,
    } = props;
    const user = useSelector((state) => state.auth.login.currentUser);
    const myDetail = useSelector((state) => state.post.post?.myDetail);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    const [Tongtien, setTongtien] = useState();
    const [trangThaiDH2, settrangThaiDH2] = useState("");

    const [giamTru, setgiamTru] = useState(
        thongTinDh?.khachHang.giamTru || "0"
    );
    const [donHang, setdonHang] = useState(thongTinDh?.donHang);
    const khachHang = thongTinDh?.khachHang;
    useEffect(() => {
        const xetTrangThaiDH = donHang.find((item) =>
            item?.allDacDiemSP?.find(
                (item2) => item2?.daXong === 0 || !item2?.daXong
            )
        );
        if (xetTrangThaiDH) {
            settrangThaiDH2("Đơn Hàng Mới");
        } else {
            settrangThaiDH2("Đơn Hàng Đang Giao");
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
                trangThaiDH: "Đơn Hàng Hoàn Thành",
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
    console.log("trangThaiDH2", trangThaiDH2);
    const handleHuyDon = (id) => {
        try {
            const giamTru2 = { giamTru: giamTru };
            const newDonHang = {
                trangThaiDH: "Đơn Hàng Huỷ",
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
    console.log("donhang", donHang);
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
    useEffect(() => {
        tinhtongtien();
    });
    const handlePrint = () => {
        window.print();
    };
    //  Viet QR
    const nganHang = ttShop?.ttShopThem?.nganHang;
    console.log("nganHang", nganHang);
    const BANK_ID = nganHang.maSo;
    const ACCOUNT_NO = nganHang.taiKhoanNganHang;
    const TEMPLATE = "print";
    const AMOUNT = Tongtien - giamTru;
    const DESCRIPTION = `Hoá Đơn ${thongTinDh.soBan}`;
    const ACCOUNT_NAME = nganHang.chuTaiKhoanNganhang;
    const qr = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${AMOUNT}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;
    // Viet QR

    return (
        <div className="chiTietDonHang-Container">
            <div className="quayLai-tieuDe">
                <div className="quayLai" onClick={() => handleClose()}>
                    Quay Lại
                </div>
                <div className="tieuDe">Chi Tiết Đơn Hàng</div>
            </div>
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
                                                {VND.format(item?.giaKhuyenMai)}
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
                                            {/* <div className="SL">
                                                {item.slMua}
                                            </div> */}
                                            <input
                                                className="SL"
                                                placeholder={item?.slMua}
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
                                                    handleDaXong(item, item2)
                                                }
                                                className="daXong"
                                            >
                                                ✅
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    handleChuaXong(item, item2)
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
            {(thongTinDh?.khachHang?.noiNhan === "Ship Tận Nơi" ||
                thongTinDh?.khachHang?.noiNhan === "Tự Đến Lấy") && (
                <div className="phancach">
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Nơi Nhận :</div>
                        <div className="noiDung">{khachHang?.noiNhan}</div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Họ Và Tên :</div>
                        <div className="noiDung">
                            {khachHang?.hoTenNguoiMua}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Số Điện Thoại :</div>

                        <div className="noiDung">{khachHang?.sdtNguoiMua}</div>
                    </div>
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Địa Chỉ :</div>
                        <div className="noiDung">{khachHang?.dcNguoiNMua}</div>
                    </div>

                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Ghi Chú Thêm :</div>
                        <div className="noiDung">
                            {khachHang?.ghiChuNguoiMua}
                        </div>
                    </div>
                </div>
            )}
            {thongTinDh?.khachHang?.noiNhan === "Nhận Tại Bàn" && (
                <div className="phancach">
                    <div className="thongTinChiTiet">
                        <div className="tieuDe">Nơi Nhận :</div>
                        <div className="noiDung">
                            {khachHang?.noiNhan}
                            {khachHang?.soBan && (
                                <>
                                    &emsp;-&emsp;
                                    {khachHang?.soBan}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="thanhToanQrCode-container">
                <div className="thanhToanQr">Thanh Toán Qua QR Code</div>
                <img className="qr" src={qr} />
            </div>
            {/* <div className="tieuDeDonHang">Hoa Hồng Cộng Tác Viên</div> */}
            <div>
                {thongTinDh?.trangThaiDH === "Đơn Hàng Mới" && (
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
                {thongTinDh?.trangThaiDH === "Đơn Hàng Đang Giao" && (
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
                {thongTinDh?.trangThaiDH === "Đơn Hàng Hoàn Thành" && (
                    <div className="tongKet">
                        <div
                            className="huyDon"
                            onClick={() => handleHuyDon(thongTinDh?._id)}
                        >
                            Trả Hàng
                        </div>
                        <div className="inHoaDon" onClick={() => handlePrint()}>
                            In Hoá Đơn
                        </div>
                    </div>
                )}
                {thongTinDh?.trangThaiDH === "Đơn Hàng Huỷ" && (
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

import "./ChiTietDonHangMua.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const ChiTietDonHangMua = (props) => {
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
    console.log("thongTinDh", thongTinDh);
    const d = new Date();
    const gioPhut = `${d.getHours()}h${d.getMinutes()}`;
    const ngayThang = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

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
                <div
                    className="inHoaDon"
                    onClick={() => alert("Chưa kết nối máy in!")}
                >
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
                                                            <div className="SL">
                                                                {item?.slMua}
                                                            </div>
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
                                                            <div className="SL">
                                                                {item?.slMua}
                                                            </div>
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
                                                            <div className="SL">
                                                                {item?.slMua}
                                                            </div>
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
                    <div className="sotien">{VND.format(giamTru)}</div>
                </div>
                <div className="tongTien">
                    <div className="tieude">Cần Thanh Toán :</div>
                    <div className="sotien">
                        {VND.format(Tongtien - giamTru)}
                    </div>
                </div>
                {thongTinDh?.ttThem?.stkShop && <img className="qr" src={qr} />}
            </div>
            <div className="nguoiNhan-container">
                <div className="tieuDe">Thông Tin Người Bán</div>

                <div className="thongTinNguoiNhan">
                    <div className="thongTinChiTiet">
                        <a
                            href={`/a/${thongTinDh?.idShop}/a/a/a/a`}
                            className="noiDung "
                        >
                            Tên Shop :&nbsp;
                            <i style={{ color: "#04aa6d" }}>
                                {thongTinDh?.tenShop}
                            </i>
                        </a>
                    </div>

                    <div className="thongTinChiTiet">
                        <div className="noiDung">
                            Địa Chỉ :&nbsp;{thongTinDh?.thonXomBan},&nbsp;
                            {thongTinDh?.xaBan},&nbsp;
                            {thongTinDh?.huyenBan},&nbsp;
                            {thongTinDh?.tinhBan}
                        </div>
                    </div>
                    <div className="thongTinChiTiet">
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
                    </div>
                </div>
            </div>

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
        </div>
    );
};
export default ChiTietDonHangMua;

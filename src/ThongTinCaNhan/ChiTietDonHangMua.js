import "./ChiTietDonHangMua.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ChiTietDonHangMua = (props) => {
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
    const [Tongtien, setTongtien] = useState();

    const [giamTru, setgiamTru] = useState(thongTinDh?.khachHang.giamTru || 0);
    const [donHang, setdonHang] = useState(thongTinDh?.donHang);
    const khachHang = thongTinDh?.khachHang;

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
    console.log("loading", loading);
    const handleQuayLai = () => {
        settrangThaiDH(thongTinDh?.trangThaiDH);
        setallDonHang([]);
        setloading(0);
        setskip(0);
    };
    return (
        <div className="ChiTietDonHangMua-Container">
            <div className="quayLai-tieuDe">
                <div onClick={() => handleQuayLai()} className="quayLai">
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </div>
                <div className="tieuDe">Chi Tiết Đơn Hàng</div>
            </div>
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
                                            {item.daXong === 1 ? (
                                                <div className="daXong">✅</div>
                                            ) : (
                                                <div className="chuaXong">
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
            <div className="tinhTien">
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
            </div>
            <div className="thongTinNguoiNhan">Thông Tin Người Nhận</div>
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

            <a href={`/a/${thongTinDh?.idShop}/a/a/a/a`} className="muaLai2">
                Mua Thêm
            </a>
        </div>
    );
};
export default ChiTietDonHangMua;

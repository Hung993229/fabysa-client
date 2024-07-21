import "./InHoaDon.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const InHoaDon = (props) => {
    const { giamTru, setgiamTru, thongTinDh, Tongtien, setTongtien, qr } =
        props;
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const donHang = thongTinDh?.donHang;
    const khachHang = thongTinDh?.khachHang;
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    
   
    return (
        <div className="InHoaDon-ConTaiNer">
            <div className="tenShop">{ttShop.TenShop}</div>
            <div className="diaChi">
                Địa Chỉ: {ttShop?.thonXom}, {ttShop?.xa}, {ttShop?.huyen},
                {ttShop?.tinh}
            </div>
            <div className="sdt">Điện Thoại: {ttShop?.sdtShop}</div>
            <div className="hoaDonBanHang">Hoá Đơn Bán Hàng</div>
            {thongTinDh?.donHang?.map((item2, index) => {
                return (
                    <div key={index} className="sanPham2">
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
                                            <div className="SL">
                                                {item.slMua}
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
                                    </div>
                                );
                            })}
                    </div>
                );
            })}
            <div className="tinhTien2">
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

            <div className="tieuDeDonHang2">Thông Tin Người Nhận</div>
            {(thongTinDh?.khachHang?.noiNhan === "Ship Tận Nơi" ||
                thongTinDh?.khachHang?.noiNhan === "Tự Đến Lấy") && (
                <div className="phancach2">
                    <div className="thongTinChiTiet2">
                        <div className="tieuDe">Nơi Nhận :</div>
                        <div className="noiDung">{khachHang?.noiNhan}</div>
                    </div>
                    <div className="thongTinChiTiet2">
                        <div className="tieuDe">Họ Và Tên :</div>
                        <div className="noiDung">
                            {khachHang?.hoTenNguoiMua}
                        </div>
                    </div>
                    <div className="thongTinChiTiet2">
                        <div className="tieuDe">Số Điện Thoại :</div>

                        <div className="noiDung">{khachHang?.sdtNguoiMua}</div>
                    </div>
                    <div className="thongTinChiTiet2">
                        <div className="tieuDe">Địa Chỉ :</div>
                        <div className="noiDung">{khachHang?.dcNguoiNMua}</div>
                    </div>

                    <div className="thongTinChiTiet2">
                        <div className="tieuDe">Ghi Chú Thêm :</div>
                        <div className="noiDung">
                            {khachHang?.ghiChuNguoiMua}
                        </div>
                    </div>
                </div>
            )}
            {thongTinDh?.khachHang?.noiNhan === "Nhận Tại Bàn" && (
                <div className="phancach2">
                    <div className="thongTinChiTiet2">
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
            <div className="thanhToanQrCode-container2">
                <div className="thanhToanQr">Thanh Toán Qua QR Code</div>
                <img className="qr" src={qr} />
            </div>
        </div>
    );
};
export default InHoaDon;

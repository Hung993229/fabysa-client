import "./DonHangCtv.scss";
import MenuDonHang from "./MenuDonHang";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDonHang, updateDonHang, getttShop } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useState } from "react";
const DonHangCtv = () => {
    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const dispatch = useDispatch();
    const { idShop } = useParams();
    const [skip, setskip] = useState(0);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const trangThaiDH = 5;
    useEffect(() => {
        const limit = 20
        getDonHang(idShop, skip,limit, trangThaiDH, dispatch);
    }, [idShop, skip]);
    const donHangCongTacVien = allDonHang?.filter(
        (item) => item.idShop === idShop
    );
    const donHangCtvChuaThanhToan = donHangCongTacVien.filter(
        (item) => item?.donHang[0]?.thanhToanHoaHong === "Chưa Thanh Toán"
    );
    const donHangCtvDaThanhToan = donHangCongTacVien.filter(
        (item) => item?.donHang[0]?.thanhToanHoaHong === "Đã Thanh Toán"
    );
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="donHangCtv-container">
            <MenuDonHang idShop={idShop} />
            <div className="tieuDeDonHang">Đơn Hàng Cộng Tác Viên</div>
            {donHangCongTacVien && donHangCongTacVien.length !== 0 ? (
                <div className="sanPham">
                    <div>Tên Sản Phẩm</div>
                    <div>Số Lượng</div>
                    <div>Hoa Hồng</div>
                    <div>Link Shop</div>
                    <div>Trạng Thái</div>
                </div>
            ) : (
                <div>Đơn hàng trống!</div>
            )}
            {donHangCtvChuaThanhToan?.map((item, index) => {
                return (
                    <div key={index} className="sanPham">
                        <div>{item.donHang[0]?.TenSanPham}</div>
                        <div>{item.donHang[0]?.soLuong}</div>
                        <div>{VND.format(item?.donHang[0]?.hoaHong)}</div>
                        <a href={`/shop/${item.idShop}`}>Link Shop</a>
                        <div>{item.donHang[0]?.thanhToanHoaHong}</div>
                    </div>
                );
            })}
            {donHangCtvDaThanhToan?.map((item, index) => {
                return (
                    <div key={index} className="sanPham">
                        <div>{item.donHang[0]?.TenSanPham}</div>
                        <div>{item.donHang[0]?.soLuong}</div>
                        <div>{VND.format(item?.donHang[0]?.hoaHong)}</div>
                        <a href={`/shop/${item.idShop}`}>Link Shop</a>
                        <div>{item.donHang[0]?.thanhToanHoaHong}</div>
                    </div>
                );
            })}
              {(skip > 20 || skip === 20) && (
                    <button
                        onClick={() => setskip(+skip - 20)}
                        className="xemThem"
                    >
                        Quay Lại
                    </button>
                )}
                {allDonHang?.length === 20 && (
                    <button
                        onClick={() => setskip(+skip + 20)}
                        className="xemThem"
                    >
                        Xem Thêm
                    </button>
                )}
        </div>
    );
};
export default DonHangCtv;

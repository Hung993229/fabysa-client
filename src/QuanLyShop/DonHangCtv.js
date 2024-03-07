import "./DonHangCtv.scss";
import MenuDonHang from "./MenuDonHang";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDonHang, updateDonHang, getttShop } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
const DonHangCtv = () => {
    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    console.log("allDonHang", allDonHang);
    const dispatch = useDispatch();
    const { idShop } = useParams();
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const trangThaiDH = 5;
    useEffect(() => {
        getDonHang(idShop, trangThaiDH, dispatch);
    }, [idShop]);
    const donHangCongTacVien = allDonHang?.filter(
        (item) => item.idShop === idShop
    );
    const donHangCtvChuaThanhToan = donHangCongTacVien.filter(
        (item) => item?.donHang[0]?.thanhToanHoaHong === "Chưa Thanh Toán"
    );
    console.log("donHangCtvChuaThanhToan", donHangCtvChuaThanhToan);
    const donHangCtvDaThanhToan = donHangCongTacVien.filter(
        (item) => item?.donHang[0]?.thanhToanHoaHong === "Đã Thanh Toán"
    );
    console.log("donHangCtvDaThanhToan", donHangCtvDaThanhToan);
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
        </div>
    );
};
export default DonHangCtv;

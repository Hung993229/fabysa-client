import "./DonHangCtv.scss";
import MenuDonHang from "./MenuDonHang";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDonHang, updateDonHang, getttShop } from "../redux/apiRequest";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
const DonHangLienKet = () => {
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
    const donHangLienKet = allDonHang?.filter((item) => item.idCtv === idShop);
    const donHangCtvChuaThanhToan = donHangLienKet.filter(
        (item) => item?.donHang[0]?.thanhToanHoaHong === "Chưa Thanh Toán"
    );
    const donHangCtvDaThanhToan = donHangLienKet.filter(
        (item) => item?.donHang[0]?.thanhToanHoaHong === "Đã Thanh Toán"
    );
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleNhanHoaHong = (item) => {
        const newDonHang = {
            // trangThaiDH: 5,
            donHang: {
                TenSanPham: item?.donHang[0]?.TenSanPham,
                hoaHong: item?.donHang[0]?.hoaHong,
                idSanPham: item?.donHang[0]?.idSanPham,
                soLuong: item?.donHang[0]?.soLuong,
                thanhToanHoaHong: "Đã Thanh Toán",
            },
            idCtv: item?.idCtv,
            idShop: item?.idShop,
            khachHang: item?.khachHang,
        };
        updateDonHang(newDonHang, item?._id, dispatch);
        console.log("newDonHang", newDonHang);
    };
    return (
        <div className="donHangCtv-container">
            <MenuDonHang idShop={idShop} />
            <div className="tieuDeDonHang">Đơn Hàng Liên Kết</div>
            {donHangLienKet && donHangLienKet.length !== 0 ? (
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
                        <div
                            onClick={() => handleNhanHoaHong(item)}
                            className="nhanHoaHong"
                        >
                            Đã Nhận
                        </div>
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
export default DonHangLienKet;

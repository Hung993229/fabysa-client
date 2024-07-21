import "./MenuDonHang.scss";
import { useState } from "react";
const MenuDonHang = (props) => {
    const {
        idShop,
        loading,
        setloading,
        settrangThaiDH,
        trangThaiDH,
        setallDonHang,
        allDonHang,
        skip,
        setskip,
    } = props;
    const handleChonDonHang = (item) => {
        settrangThaiDH(item);
        setloading(0);
        setallDonHang([]);
        setskip(0);
    };
    return (
        <div className="menudonHang-container">
            <div className="menu">
            <div className="quayLai-tieuDe">
                    <div className="quayLai" onClick={() => setloading(0)}>
                        Quay Lại
                    </div>
                    <div className="tieuDe">Menu Shop</div>
                </div>
                <div className="menu-container">
                    <div
                        onClick={() => handleChonDonHang("Đơn Hàng Mới")}
                        className={
                            trangThaiDH === "Đơn Hàng Mới"
                                ? "donHangChon"
                                : "donHang"
                        }
                    >
                        Đơn Hàng Mới
                    </div>
                    <div
                        onClick={() => handleChonDonHang("Đơn Hàng Đang Giao")}
                        className={
                            trangThaiDH === "Đơn Hàng Đang Giao"
                                ? "donHangChon"
                                : "donHang"
                        }
                    >
                        Đơn Hàng Đang Giao
                    </div>
                    <div
                        onClick={() => handleChonDonHang("Đơn Hàng Hoàn Thành")}
                        className={
                            trangThaiDH === "Đơn Hàng Hoàn Thành"
                                ? "donHangChon"
                                : "donHang"
                        }
                    >
                        Đơn Hàng Hoàn Thành
                    </div>
                    <div
                        onClick={() => handleChonDonHang("Đơn Hàng Huỷ")}
                        className={
                            trangThaiDH === "Đơn Hàng Huỷ"
                                ? "donHangChon"
                                : "donHang"
                        }
                    >
                        Đơn Hàng Huỷ
                    </div>
                    {/* <a className="donHang" href={`/don-hang-ctv/${idShop}`}>
                        Đơn Hàng Cộng Tác Viên
                    </a>
                    <br />
                    <a
                        className="donHang"
                        href={`/don-hang-lien-ket/${idShop}`}
                    >
                        Đơn Hàng Liên Kết
                    </a> */}
                </div>
            </div>
        </div>
    );
};
export default MenuDonHang;

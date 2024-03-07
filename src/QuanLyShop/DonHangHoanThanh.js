import "./DonHangMoi.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDonHang, updateDonHang, getttShop } from "../redux/apiRequest";
import MenuDonHang from "./MenuDonHang";
import { useEffect } from "react";
const DonHangMoi = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const allDonHang1 = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    const allDonHang = allDonHang1?.filter((item) => item?.idShop === idShop);
    console.log("idShop", idShop);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const trangThaiDH = 3;
    useEffect(() => {
        getDonHang(idShop, trangThaiDH, dispatch);
    }, [idShop]);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const arrIdGioHang = allDonHang?.map((item) => {
        return [item.donHang];
    });

    return (
        <div className="donHang-container">
            <MenuDonHang idShop={idShop} />
            <div className="tieuDeDonHang">Đơn Hàng Hoàn Thành</div>
            <div>
                {allDonHang && allDonHang.length !== 0 ? (
                    <div className="ttdonHang">
                        <div>Thời Gian</div>
                        <div>Sản Phẩm</div>

                        <div>Khách Hàng</div>

                        <div>Xem Chi Tiết</div>
                    </div>
                ) : (
                    <div>Đơn hàng trống!</div>
                )}

                {allDonHang?.map((item, index) => {
                    return (
                        <a
                            key={index}
                            href={`/don-hang/${idShop}/${item._id}/${trangThaiDH}`}
                        >
                            <div className="ttdonHang">
                                <div className="thoiGian">
                                    {item?.createdAt.slice(5, 10)}
                                </div>
                                <div>
                                    {item?.donHang?.map((item2, index) => {
                                        return (
                                            <div
                                                className="SanPham"
                                                key={index}
                                            >
                                                <div className="tenSanPham">
                                                    - {item2.TenSanPham}
                                                </div>
                                                <div className="soLuong">
                                                    {item2.soLuong}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="khachHang">
                                    <div>{item?.khachHang?.hoTenNguoiMua}</div>
                                    <div>{item?.khachHang?.sdtNguoiMua}</div>
                                    <div>{item?.khachHang?.noiNhan}</div>
                                    <div>{item?.khachHang?.soBan}</div>
                                </div>

                                <div className="xemChiTiet">Xem Chi Tiết</div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
export default DonHangMoi;

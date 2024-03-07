import "./DonHangMoi.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
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
    const { idShop } = useParams();
    const allDonHang = allDonHang1?.filter((item) => item?.idShop === idShop);
    console.log("allDonHang", allDonHang);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("idShop", idShop);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    const trangThaiDH = 1;
    useEffect(() => {
        getDonHang(idShop, trangThaiDH, dispatch);
    }, [idShop]);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const gopBanDonHang = allDonHang
        ?.map((item) => {
            return item?.khachHang?.soBan ? item?.khachHang?.soBan : null;
        })
        .filter((item2) => item2 !== null);
    console.log("gopBanDonHang", gopBanDonHang);
    const gopSdtDonHang = allDonHang
        ?.map((item) => {
            return item?.khachHang?.sdtNguoiMua
                ? item?.khachHang?.sdtNguoiMua
                : null;
        })
        .filter((item2) => item2 !== null);
    console.log("gopSdtDonHang", gopSdtDonHang);
    const donHangSdt = allDonHang?.map((item) => {
        return gopSdtDonHang.map((item2) => {
            return item.khachHang.sdtNguoiMua === item2
                ? item.donHang.map((item3) => {
                      return item3;
                  })
                : null;
        });
    });

    console.log("donHangSdt", donHangSdt);
    return (
        <div className="donHang-container">
            <MenuDonHang idShop={idShop} />
            <div className="tieuDeDonHang">Đơn Hàng Mới</div>
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
                {/* nhan tai quay */}
                {allDonHang?.map((item, index) => {
                    return (
                        <div key={index}>
                            {item?.khachHang?.soBan && (
                                <a
                                    href={`/don-hang/${idShop}/${item._id}/${trangThaiDH}`}
                                >
                                    <div className="ttdonHang">
                                        <div className="thoiGian">
                                            {item?.createdAt.slice(5, 10)}
                                        </div>
                                        <div>
                                            {item?.donHang?.map(
                                                (item2, index) => {
                                                    return (
                                                        <div
                                                            className="SanPham"
                                                            key={index}
                                                        >
                                                            <div className="tenSanPham">
                                                                -{" "}
                                                                {
                                                                    item2.TenSanPham
                                                                }
                                                            </div>
                                                            <div className="soLuong">
                                                                {item2.soLuong}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className="khachHang">
                                            <div>
                                                {item?.khachHang?.hoTenNguoiMua}
                                            </div>
                                            <div>
                                                {item?.khachHang?.sdtNguoiMua}
                                            </div>
                                            <div>
                                                {item?.khachHang?.noiNhan}
                                            </div>
                                            <div>{item?.khachHang?.soBan}</div>
                                        </div>

                                        <div className="xemChiTiet">
                                            Xem Chi Tiết
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    );
                })}
                {/* nhan noi khac */}
                {allDonHang?.map((item, index) => {
                    return (
                        <div key={index}>
                            {!item?.khachHang?.soBan && (
                                <a
                                    href={`/don-hang/${idShop}/${item._id}/${trangThaiDH}`}
                                >
                                    <div className="ttdonHang">
                                        <div className="thoiGian">
                                            {item?.createdAt.slice(5, 10)}
                                        </div>
                                        <div>
                                            {item?.donHang?.map(
                                                (item2, index) => {
                                                    return (
                                                        <div
                                                            className="SanPham"
                                                            key={index}
                                                        >
                                                            <div className="tenSanPham">
                                                                -{" "}
                                                                {
                                                                    item2.TenSanPham
                                                                }
                                                            </div>
                                                            <div className="soLuong">
                                                                {item2.soLuong}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className="khachHang">
                                            <div>
                                                {item?.khachHang?.hoTenNguoiMua}
                                            </div>
                                            <div>
                                                {item?.khachHang?.sdtNguoiMua}
                                            </div>
                                            <div>
                                                {item?.khachHang?.noiNhan}
                                            </div>
                                            <div>{item?.khachHang?.soBan}</div>
                                        </div>

                                        <div className="xemChiTiet">
                                            Xem Chi Tiết
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default DonHangMoi;

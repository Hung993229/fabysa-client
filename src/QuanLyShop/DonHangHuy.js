import "./DonHang.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDonHang, updateDonHang } from "../redux/apiRequest";
import { useEffect } from "react";
const DonHang = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    console.log("allDonHang", allDonHang);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    useEffect(() => {
        const trangThaiDH = 4;
        getDonHang(idShop, trangThaiDH, dispatch);
    }, []);
    const handleDatLai = (id) => {
        const newDonHang = {
            trangThaiDH: 1,
        };
        updateDonHang(newDonHang, id, dispatch);
    };

    return (
        <div className="donHang-container">
            <div className="donHang-nav">
                <a href={`/don-hang/${idShop}`}>Đơn Hàng Mới</a>
                <a href={`/don-hang-dang-giao/${idShop}`}>Đơn Hàng Đang Giao</a>
                <a href={`/don-hang-hoan-thanh/${idShop}`}>
                    Đơn Hàng Hoàn Thành
                </a>
                <a href={`/don-hang-huy/${idShop}`}>Đơn Hàng Huỷ</a>
            </div>
            <div className="tieuDeDonHang">Danh Sách Đơn Hàng Huỷ</div>
            {allDonHang &&
                allDonHang?.map((item) => {
                    return (
                        <div key={item._id} className="detailDonHang-container">
                            <div className="hang1">
                                <div className="tieuDe">
                                    <div className="noiDung1">Mã Đơn</div>
                                    <div className="noiDung2">
                                        {item._id.slice(-9)}
                                    </div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">Tên Sản Phẩm</div>
                                    <a href={item.linkSp}>
                                        <div className="noiDung2">
                                            {item.tenSp}
                                        </div>
                                    </a>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">Số Lượng</div>
                                    <div className="noiDung2">{item.slSP}</div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">Thời Gian</div>
                                    <div className="noiDung2">
                                        {item.createdAt}
                                    </div>
                                </div>
                            </div>
                            <div className="hang2">
                                <div className="tieuDe">
                                    <div className="noiDung1">Đơn Giá</div>
                                    <div className="noiDung2">
                                        {item.donGia}
                                    </div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">Thành Tiền</div>
                                    <div className="noiDung2">
                                        {item.thanhTien}
                                    </div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">Gold Đã TT</div>
                                    <div className="noiDung2">
                                        {item.goldDaTT}
                                    </div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">
                                        Số Tiền Cần Thu
                                    </div>
                                    <div className="noiDung2">
                                        {item.soTienCanTT}
                                    </div>
                                </div>
                            </div>
                            <div className="hang3">
                                <div className="tieuDe">
                                    <div className="noiDung1">
                                        Tên Người Nhận
                                    </div>
                                    <div className="noiDung2">
                                        {item.hoTenNguoiMua}
                                    </div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">
                                        Số Điện Thoại
                                    </div>
                                    <div className="noiDung2">
                                        {item.sdtNguoiMua}
                                    </div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">Địa Chỉ</div>
                                    <div className="noiDung2">
                                        {item.dcNguoiNMua}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDatLai(item._id)}
                                className="giaoHang"
                            >
                                Đặt Lại
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};
export default DonHang;

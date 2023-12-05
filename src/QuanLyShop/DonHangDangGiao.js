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
        const trangThaiDH = 2;
        getDonHang(idShop, trangThaiDH, dispatch);
    }, []);
    const handleHoanThanh = (id) => {
        const newDonHang = {
            trangThaiDH: 3,
        };
        updateDonHang(newDonHang, id, dispatch);
    };
    const handleHuyDonHang = (id) => {
        const newDonHang = {
            trangThaiDH: 4,
        };
        updateDonHang(newDonHang, id, dispatch);
    };
    //    Don Truc Tiep
    const allDonHang1 = allDonHang?.filter(
        (item) => item.affiliate.length === 0
    );
    // Don Afiliate
    const allDonHang2 = allDonHang?.filter(
        (item) => item.affiliate.length !== 0
    );

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
            <div className="tieuDeDonHang">Danh Sách Đơn Hàng Trực Tiếp Đang Giao</div>
            {allDonHang1 &&
                allDonHang1?.map((item) => {
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
                            <div>
                                
                                <button
                                    onClick={() => handleHuyDonHang(item._id)}
                                    className="giaoHang"
                                >
                                    Huỷ Đơn
                                </button>
                                <button
                                    onClick={() => handleHoanThanh(item._id)}
                                    className="giaoHang"
                                >
                                    Hoàn Thành
                                </button>
                            </div>
                        </div>
                    );
                })}
             <div className="tieuDeDonHang">Danh Sách Đơn Hàng Liên Kết Đang Giao</div>
            {allDonHang2 &&
                allDonHang2?.map((item) => {
                    return (
                        <div key={item._id} className="detailDonHang-container">
                            <div className="hang1">
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
                                    <div className="noiDung1">Hoa Hồng CTV</div>
                                    <div className="noiDung2">
                                        {item.hoahongCTV * item.slSP}
                                    </div>
                                </div>
                                <div className="tieuDe">
                                    <div className="noiDung1">Thời Gian</div>
                                    <div className="noiDung2">
                                        {item.createdAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
export default DonHang;

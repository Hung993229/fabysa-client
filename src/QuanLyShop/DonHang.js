import "./DonHang.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDonHang, updateDonHang, getttShop } from "../redux/apiRequest";
import { useEffect } from "react";
const DonHang = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    console.log("allDonHang", allDonHang);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop, idDonHang, trangThai } = useParams();
    const thongTindh = allDonHang?.find(
        (thongTindh) => thongTindh?._id === idDonHang
    );
    console.log("thongTindh", thongTindh);
    console.log("idDonHang", idDonHang);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    useEffect(() => {
        getDonHang(idShop, trangThai, dispatch);
    }, [idShop]);
    console.log("trangThai", +trangThai);
    const handleGiaoHang = (id) => {
        const newDonHang = {
            trangThaiDH: 2,
        };
        updateDonHang(newDonHang, id, dispatch);
        navigate(`/don-hang/${idShop}`);
        console.log("newDonHang", newDonHang);
        console.log("id", id);
    };
    const handleHoanThanh = (id) => {
        const newDonHang = {
            trangThaiDH: 3,
        };
        navigate(`/don-hang-dang-giao/${idShop}`);
        updateDonHang(newDonHang, id, dispatch);
        console.log("newDonHang", newDonHang);
    };
    const handleHuyDon = (id) => {
        const newDonHang = {
            trangThaiDH: 4,
        };
        navigate(`/don-hang-dang-giao/${idShop}`);
        updateDonHang(newDonHang, id, dispatch);
        console.log("newDonHang", newDonHang);
    };
    const handleTraLai = (id) => {
        const newDonHang = {
            trangThaiDH: 4,
        };
        navigate(`/don-hang-hoan-thanh/${idShop}`);
        updateDonHang(newDonHang, id, dispatch);
        console.log("newDonHang", newDonHang);
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    return (
        <div className="chiTietDonHang-Container">
            <div className="datHang-container">
                {+trangThai === 1 && (
                    <a href={`/don-hang/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
                {+trangThai === 2 && (
                    <a href={`/don-hang-dang-giao/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
                {+trangThai === 3 && (
                    <a href={`/don-hang-hoan-thanh/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
                {+trangThai === 4 && (
                    <a href={`/don-hang-huy/${idShop}`}>
                        <button className="close">Close</button>
                    </a>
                )}
                <div className="tieuDeDonHang">Chi Tiết Đơn Hàng</div>
                <div className="maDonHang">
                    {thongTindh?._id.slice(-9)} /
                    {thongTindh?.createdAt.slice(0, 10)}
                </div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Tên Sản Phẩm</div>
                    <div className="noiDungFormregis">
                        <a href={thongTindh?.linkSp}>{thongTindh?.tenSp}</a>
                    </div>
                </div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis"> Số Lượng</div>
                    <div className="noiDungFormregis">{thongTindh?.slSP}</div>
                </div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Đơn Giá</div>
                    <div className="noiDungFormregis">
                        {VND.format(thongTindh?.donGia)}
                    </div>
                </div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Thành Tiền</div>
                    <div className="noiDungFormregis">
                        {VND.format(thongTindh?.thanhTien)}
                    </div>
                </div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Gold Đã TT</div>
                    <div className="noiDungFormregis">
                        {thongTindh?.goldDaTT} Gold
                    </div>
                </div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Số Tiền Cần Thu</div>
                    <div className="noiDungFormregis">
                        {VND.format(thongTindh?.soTienCanTT)}
                    </div>
                </div>
                <div className="thongTinNhanHang">Hoa Hồng Cộng Tác Viên</div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Hoa Hồng CTV</div>
                    <div className="noiDungFormregis">
                        {VND.format(thongTindh?.hoahongCTV)}
                    </div>
                </div>

                <div className="thongTinNhanHang">Thông Tin Người Nhận</div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Tên Người Nhận</div>
                    <div className="noiDungFormregis">
                        {thongTindh?.hoTenNguoiMua}
                    </div>
                </div>

                {thongTindh?.affiliate !== ttShop?._id && (
                    <div>
                        <div className="containerTieuChiFormregis">
                            <div className="tieuChiFormregis">
                                Số Điện Thoại
                            </div>
                            <div className="noiDungFormregis">
                                {thongTindh?.sdtNguoiMua}
                            </div>
                        </div>
                        <div className="containerTieuChiFormregis">
                            <div className="tieuChiFormregis diaChi">
                                Địa Chỉ
                            </div>
                            <div className="noiDungFormregis diaChi">
                                {thongTindh?.dcNguoiNMua}
                            </div>
                        </div>
                        <div className="containerTieuChiFormregis">
                            <div className="tieuChiFormregis">Ghi Chú</div>
                            <div className="noiDungFormregis">
                                {thongTindh?.ghiChuNguoiMua}
                            </div>
                        </div>
                        {thongTindh?.trangThaiDH === 1 && (
                            // <a href={`/don-hang/${idShop}`}>
                            <button
                                className="hoanThanh"
                                onClick={() => handleGiaoHang(thongTindh?._id)}
                            >
                                Giao Hàng
                            </button>
                            // </a>
                        )}
                        {thongTindh?.trangThaiDH === 2 && (
                            <div>
                                {/* <a href={`/don-hang-dang-giao/${idShop}`}> */}
                                <button
                                    className="huyDon"
                                    onClick={() =>
                                        handleHuyDon(thongTindh?._id)
                                    }
                                >
                                    Huỷ Đơn
                                </button>
                                {/* </a> */}
                                {/* <a href={`/don-hang-dang-giao/${idShop}`}> */}
                                <button
                                    className="hoanThanh"
                                    onClick={() =>
                                        handleHoanThanh(thongTindh?._id)
                                    }
                                >
                                    Hoàn Thành
                                </button>
                                {/* </a> */}
                            </div>
                        )}
                        {thongTindh?.trangThaiDH === 3 && (
                            <div>
                                <button
                                    className="huyDon"
                                    onClick={() =>
                                        handleTraLai(thongTindh?._id)
                                    }
                                >
                                    Trả Hàng
                                </button>
                                <a href={`/don-hang-hoan-thanh/${idShop}`}>
                                    <button className="hoanThanh">
                                        Đóng lại
                                    </button>
                                </a>
                            </div>
                        )}
                        {thongTindh?.trangThaiDH === 4 && (
                            <div>
                                <a href={`/don-hang-huy/${idShop}`}>
                                    <button className="hoanThanh">
                                        Đóng lại
                                    </button>
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default DonHang;

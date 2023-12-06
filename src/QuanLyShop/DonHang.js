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
    const { idShop, idDonHang } = useParams();
    const thongTindh = allDonHang?.find((thongTindh) => thongTindh._id === idDonHang);
    console.log("thongTinSp", thongTindh);
    console.log("idDonHang", idDonHang);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
    useEffect(() => {
        const trangThaiDH = 1;
        // const user = idShop;
        getDonHang(idShop, trangThaiDH, dispatch);
    }, [idShop]);
    const handleGiaoHang = (id) => {
        const newDonHang = {
            trangThaiDH: 2,
        };
        updateDonHang(newDonHang, id, dispatch);
    };

    return (
        <div className="chiTietDonHang-Container">
            <div className="datHang-container">
                <a href={`/don-hang/${idShop}`}>
                    <button className="close">Close</button>
                </a>
                <div className="tieuDeDonHang">Chi Tiết Đơn Hàng</div>
                <div className="tieuDeDonHang">Mã Đơn Hàng / Thời Gian</div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Tên Sản Phẩm</div>
                    <div className="noiDungFormregis"><a href={thongTindh.linkSp}>{thongTindh.tenSp}</a></div>
                </div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis"> Số Lượng</div>
                    <div className="noiDungFormregis">{thongTindh.slSP}</div>
                </div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Đơn Giá</div>
                    <div className="noiDungFormregis">{thongTindh.donGia}</div>
                </div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Thành Tiền</div>
                    <div className="noiDungFormregis">{thongTindh.thanhTien}</div>
                </div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Gold Đã TT</div>
                    <div className="noiDungFormregis">{thongTindh.goldDaTT}</div>
                </div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Số Tiền Cần Thu</div>
                    <div className="noiDungFormregis">{thongTindh.soTienCanTT}</div>
                </div>
                <div className="thongTinNhanHang">Hoa Hồng Cộng Tác Viên</div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Hoa Hồng CTV</div>
                    <div className="noiDungFormregis">{thongTindh.hoahongCTV}</div>
                </div>

                <div className="thongTinNhanHang">Thông Tin Người Nhận</div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Tên Người Nhận</div>
                    <div className="noiDungFormregis">{thongTindh.hoTenNguoiMua}</div>
                </div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Số Điện Thoại</div>
                    <div className="noiDungFormregis">{thongTindh.sdtNguoiMua}</div>
                </div>

                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Địa Chỉ</div>
                    <div className="noiDungFormregis">{thongTindh.dcNguoiNMua}</div>
                </div>
                <div className="containerTieuChiFormregis">
                    <div className="tieuChiFormregis">Ghi Chú</div>
                    <div className="noiDungFormregis">{thongTindh.ghiChuNguoiMua}</div>
                </div>
                <button
                    className="hoanThanh"
                    // onClick={hoanThanhDonHanguser}
                >
                    Hoàn Thành
                </button>
            </div>
        </div>
    );
};
export default DonHang;

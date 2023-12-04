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
    const { userId } = useParams();
    console.log("userId", userId);
    useEffect(() => {
        getttShop(userId, dispatch);
    }, []);
    useEffect(() => {
        const trangThaiDH = 1;
        // const user = userId;
        getDonHang(userId, trangThaiDH, dispatch);
    }, [userId]);
    const handleGiaoHang = (id) => {
        const newDonHang = {
            trangThaiDH: 2,
        };
        updateDonHang(newDonHang, id, dispatch);
    };
    //    Đơn Hàng Trực Tiếp
    const allDonHang1 = allDonHang?.filter(
        (item) => item.affiliate.length === 0
    );
    //  Đơn Hàng Từ Cộng Tác Viên
    const allDonHang3 = allDonHang?.filter(
        (item) => item.user === user._id && item.affiliate.length !== 0
    );

    //  Đơn Hàng Bạn Là Cộng Tác Viên
    const allDonHang2 = allDonHang?.filter(
        (item) => item.affiliate === user._id && item.affiliate.length !== 0
    );

    return (
        <div>
            {userId === user._id && ttShop && ttShop.length !== 0 && (
                <div className="donHang-container">
                    <div className="donHang-nav">
                        <a href={`/don-hang/${userId}`}>Đơn Hàng Mới</a>
                        <a href={`/don-hang-dang-giao/${userId}`}>
                            Đơn Hàng Đang Giao
                        </a>
                        <a href={`/don-hang-hoan-thanh/${userId}`}>
                            Đơn Hàng Hoàn Thành
                        </a>
                        <a href={`/don-hang-huy/${userId}`}>Đơn Hàng Huỷ</a>
                    </div>
                    <div className="tieuDeDonHang">Danh Sách Đơn Hàng Mới</div>
                    <div className="tieuDeDonHang">Đơn Hàng Trực Tiếp</div>
                    {allDonHang1 &&
                        allDonHang1?.map((item) => {
                            return (
                                <div
                                    key={item._id}
                                    className="detailDonHang-container"
                                >
                                    <div className="hang1">
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Mã Đơn
                                            </div>
                                            <div className="noiDung2">
                                                {item._id.slice(-9)}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Tên Sản Phẩm
                                            </div>
                                            <a href={item.linkSp}>
                                                <div className="noiDung2">
                                                    {item.tenSp}
                                                </div>
                                            </a>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Số Lượng
                                            </div>
                                            <div className="noiDung2">
                                                {item.slSP}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Thời Gian
                                            </div>
                                            <div className="noiDung2">
                                                {item.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hang2">
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Đơn Giá
                                            </div>
                                            <div className="noiDung2">
                                                {item.donGia}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Thành Tiền
                                            </div>
                                            <div className="noiDung2">
                                                {item.thanhTien}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Gold Đã TT
                                            </div>
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
                                        <div>
                                            <div>Ghi Chú</div>
                                            <div>{item.ghiChuNguoiMua}</div>
                                        </div>
                                    </div>
                                    <div className="hang3">
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Địa Chỉ
                                            </div>
                                            <div className="noiDung2">
                                                {item.dcNguoiNMua}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleGiaoHang(item._id)
                                            }
                                            className="giaoHang"
                                        >
                                            Giao Hàng
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="tieuDeDonHang">
                        Đơn Hàng Từ Cộng Tác Viên
                    </div>
                    {allDonHang2 &&
                        allDonHang2?.map((item) => {
                            return (
                                <div
                                    key={item._id}
                                    className="detailDonHang-container"
                                >
                                    <div className="hang1">
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Mã Đơn
                                            </div>
                                            <div className="noiDung2">
                                                {item._id.slice(-9)}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Tên Sản Phẩm
                                            </div>
                                            <a href={item.linkSp}>
                                                <div className="noiDung2">
                                                    {item.tenSp}
                                                </div>
                                            </a>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Số Lượng
                                            </div>
                                            <div className="noiDung2">
                                                {item.slSP}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Thời Gian
                                            </div>
                                            <div className="noiDung2">
                                                {item.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hang2">
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Đơn Giá
                                            </div>
                                            <div className="noiDung2">
                                                {item.donGia}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Thành Tiền
                                            </div>
                                            <div className="noiDung2">
                                                {item.thanhTien}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Gold Đã TT
                                            </div>
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
                                        <div>
                                            <div>Ghi Chú</div>
                                            <div>{item.ghiChuNguoiMua}</div>
                                        </div>
                                    </div>
                                    <div className="hang3">
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Địa Chỉ
                                            </div>
                                            <div className="noiDung2">
                                                {item.dcNguoiNMua}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleGiaoHang(item._id)
                                            }
                                            className="giaoHang"
                                        >
                                            Giao Hàng
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="tieuDeDonHang">
                        Đơn Hàng Bạn Là Cộng Tác Viên
                    </div>
                    {allDonHang3 &&
                        allDonHang3?.map((item) => {
                            return (
                                <div
                                    key={item._id}
                                    className="detailDonHang-container"
                                >
                                    <div className="hang1">
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Tên Sản Phẩm
                                            </div>
                                            <a href={item.linkSp}>
                                                <div className="noiDung2">
                                                    {item.tenSp}
                                                </div>
                                            </a>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Số Lượng
                                            </div>
                                            <div className="noiDung2">
                                                {item.slSP}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Hoa Hồng CTV
                                            </div>
                                            <div className="noiDung2">
                                                {item.hoahongCTV * item.slSP}
                                            </div>
                                        </div>
                                        <div className="tieuDe">
                                            <div className="noiDung1">
                                                Thời Gian
                                            </div>
                                            <div className="noiDung2">
                                                {item.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};
export default DonHang;

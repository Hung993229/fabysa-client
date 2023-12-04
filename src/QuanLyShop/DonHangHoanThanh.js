import "./DonHang.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDonHang, updateDonHang, updatettShop } from "../redux/apiRequest";
import { useEffect } from "react";
const DonHang = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    console.log("allDonHang", allDonHang);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const trangThaiDH = 3;
        getDonHang(userId, trangThaiDH, dispatch);
    }, []);
    const handleTraHang = (id) => {
        const donHangTraLai = allDonHang?.find((item) => item._id === id);
        const newDonHang = {
            trangThaiDH: 4,
        };
        updateDonHang(newDonHang, id, dispatch);

        const idShop = ttShop._id;
        const newShop = {
            cash: ttShop.cash - donHangTraLai.goldDaTT,
        };
        updatettShop(newShop, idShop, dispatch);
    };

    // DoanhThu
    let doanhThu = 0;
    for (let i = 0; i < allDonHang.length; i++) {
        doanhThu += allDonHang[i].thanhTien;
    }
    // giaNhap
    let giaNhap = 0;
    for (let i = 0; i < allDonHang.length; i++) {
        giaNhap += allDonHang[i].thanhTien;
    }
    // Hoa Hong CTV
    let hoahongCTV = 0;
    for (let i = 0; i < allDonHang.length; i++) {
        hoahongCTV += allDonHang[i].hoahongCTV;
    }
    // Phi San 1,5% = 0.015
    let phiSan = doanhThu * 0.015;
    return (
        <div className="donHang-container">
            <div className="donHang-nav">
                <a href={`/don-hang/${userId}`}>Đơn Hàng Mới</a>
                <a href={`/don-hang-dang-giao/${userId}`}>Đơn Hàng Đang Giao</a>
                <a href={`/don-hang-hoan-thanh/${userId}`}>
                    Đơn Hàng Hoàn Thành
                </a>
                <a href={`/don-hang-huy/${userId}`}>Đơn Hàng Huỷ</a>
            </div>
            <div className="tieuDeDonHang">Danh Sách Đơn Hàng Hoàn Thành</div>

            <div className="bangTongKet">Bảng Tổng Kết</div>
            <div className="bangtongket-container">
                <div className="tongket1">
                    <div>Doanh Thu</div>
                    <div>{doanhThu}</div>
                </div>
                <div className="tongket1">
                    <div>Lợi Nhuận</div>
                    <div>{doanhThu}</div>
                </div>
                <div className="tongket1">
                    <div>Nợ Hoa Hồng CTV</div>
                    <div>{hoahongCTV}</div>
                </div>
                <div className="tongket1">
                    <div>Phí Sàn</div>
                    <div>{phiSan}</div>
                </div>
            </div>

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
                            <div className="hang3">
                                <div>
                                    <div>Hoa Hồng CTV</div>
                                    <div>{item.hoahongCTV}</div>
                                </div>
                                <button
                                    onClick={() => handleTraHang(item._id)}
                                    className="giaoHang"
                                >
                                    Trả Hàng
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
export default DonHang;

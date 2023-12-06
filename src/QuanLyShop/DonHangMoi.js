import "./DonHangMoi.scss";
import CommonUtils from "../component/CommonUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDonHang, updateDonHang, getttShop } from "../redux/apiRequest";
import { useEffect } from "react";
const DonHangMoi = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    console.log("allDonHang", allDonHang);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idShop } = useParams();
    console.log("idShop", idShop);
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
    //    Đơn Hàng Trực Tiếp
    const allDonHang1 = allDonHang?.filter(
        (item) => item.affiliate.length === 0
    );
    //  Đơn Hàng Từ Cộng Tác Viên
    const allDonHang3 = allDonHang?.filter(
        (item) => item.user === ttShop._id && item.affiliate.length !== 0
    );

    //  Đơn Hàng Bạn Là Cộng Tác Viên
    const allDonHang2 = allDonHang?.filter(
        (item) => item.affiliate === ttShop._id && item.affiliate.length !== 0
    );
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

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
            <div className="tieuDeDonHang">Danh Sách Đơn Hàng Mới</div>
            <div className="tenbangContainer">
                <div className="tenbang">Đơn Hàng Từ Website</div>
                <div className="chiTietDonHang">
                    <div className="chiTietTungO">Thời Gian</div>
                    <div className="chiTietTungO">Sản Phẩm</div>
                    <div className="chiTietTungO">Đơn Giá</div>
                    <div className="chiTietTungO">Số Lượng</div>
                    <div className="chiTietTungO">Thành Tiền</div>

                    <div className="chiTietTungO">Xem Chi Tiết</div>
                </div>
                {allDonHang1 &&
                    allDonHang1?.map((item) => {
                        return (
                            <div key={item._id} className="chiTietDonHang">
                                <div className="chiTietTungO">
                                    {item.createdAt.slice(0, 10)}
                                </div>
                                <div className="chiTietTungO">
                                    <a href={item.linkSp}>{item.tenSp} </a>
                                </div>
                                <div className="chiTietTungO">
                                    {VND.format(item.donGia)}
                                </div>
                                <div className="chiTietTungO">{item.slSP}</div>
                                <div className="chiTietTungO">
                                    {VND.format(item.thanhTien)}
                                </div>

                                <div className="chiTietTungO">
                                    <a href={`/don-hang/${idShop}/${item._id}`}>
                                        Xem Chi Tiết
                                    </a>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="tenbangContainer">
                <div className="tenbang">Đơn Hàng Từ Cộng Tác Viên</div>
                <div className="chiTietDonHang">
                    <div className="chiTietTungO">Thời Gian</div>
                    <div className="chiTietTungO">Sản Phẩm</div>
                    <div className="chiTietTungO">Đơn Giá</div>
                    <div className="chiTietTungO">Số Lượng</div>
                    <div className="chiTietTungO">Thành Tiền</div>

                    <div className="chiTietTungO">Xem Chi Tiết</div>
                </div>
                {allDonHang2 &&
                    allDonHang2?.map((item) => {
                        return (
                            <div key={item._id} className="chiTietDonHang">
                                <div className="chiTietTungO">
                                    {item.createdAt.slice(0, 10)}
                                </div>
                                <div className="chiTietTungO">
                                    <a href={item.linkSp}>{item.tenSp} </a>
                                </div>
                                <div className="chiTietTungO">
                                    {VND.format(item.donGia)}
                                </div>
                                <div className="chiTietTungO">{item.slSP}</div>
                                <div className="chiTietTungO">
                                    {VND.format(item.thanhTien)}
                                </div>

                                <div className="chiTietTungO">
                                    <a href={`/don-hang/${idShop}/${item._id}`}>
                                        Xem Chi Tiết
                                    </a>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="tenbangContainer">
                <div className="tenbang">Đơn Hàng Bạn Là Cộng Tác Viên</div>
                <div className="chiTietDonHang">
                    <div className="chiTietTungO">Thời Gian</div>
                    <div className="chiTietTungO">Sản Phẩm</div>
                    <div className="chiTietTungO">Đơn Giá</div>
                    <div className="chiTietTungO">Số Lượng</div>
                    <div className="chiTietTungO">Thành Tiền</div>

                    <div className="chiTietTungO">Xem Chi Tiết</div>
                </div>
                {allDonHang3 &&
                    allDonHang3?.map((item) => {
                        return (
                            <div key={item._id} className="chiTietDonHang">
                                <div className="chiTietTungO">
                                    {item.createdAt.slice(0, 10)}
                                </div>
                                <div className="chiTietTungO">
                                    <a href={item.linkSp}>{item.tenSp} </a>
                                </div>
                                <div className="chiTietTungO">
                                    {VND.format(item.donGia)}
                                </div>
                                <div className="chiTietTungO">{item.slSP}</div>
                                <div className="chiTietTungO">
                                    {VND.format(item.thanhTien)}
                                </div>

                                <div className="chiTietTungO">
                                    <a href={`/don-hang/${idShop}/${item._id}`}>
                                        Xem Chi Tiết
                                    </a>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default DonHangMoi;

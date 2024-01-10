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
    const { idShop } = useParams();
    const trangThaiDH = 4;
    useEffect(() => {
        getDonHang(idShop, trangThaiDH, dispatch);
    }, []);
    useEffect(() => {
        getttShop(idShop, dispatch);
    }, []);
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
            <div className="tieuDeDonHang">Danh Sách Đơn Hàng Huỷ</div>
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
                            <a
                                key={item._id}
                                href={`/don-hang/${idShop}/${item._id}/${trangThaiDH}`}
                            >
                                <div key={item._id} className="chiTietDonHang">
                                    <div className="chiTietTungO">
                                        {item.createdAt.slice(0, 10)}
                                    </div>
                                    <div className="chiTietTungO">
                                        {item.tenSp}
                                    </div>
                                    <div className="chiTietTungO">
                                        {VND.format(item.donGia)}
                                    </div>
                                    <div className="chiTietTungO">
                                        {item.slSP}
                                    </div>
                                    <div className="chiTietTungO">
                                        {VND.format(item.thanhTien)}
                                    </div>

                                    <div className="chiTietTungO">
                                        Xem Chi Tiết
                                    </div>
                                </div>{" "}
                            </a>
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
                            <a
                                key={item._id}
                                href={`/don-hang/${idShop}/${item._id}/${trangThaiDH}`}
                            >
                                <div key={item._id} className="chiTietDonHang">
                                    <div className="chiTietTungO">
                                        {item.createdAt.slice(0, 10)}
                                    </div>
                                    <div className="chiTietTungO">
                                        {item.tenSp}
                                    </div>
                                    <div className="chiTietTungO">
                                        {VND.format(item.donGia)}
                                    </div>
                                    <div className="chiTietTungO">
                                        {item.slSP}
                                    </div>
                                    <div className="chiTietTungO">
                                        {VND.format(item.thanhTien)}
                                    </div>

                                    <div className="chiTietTungO">
                                        Xem Chi Tiết
                                    </div>
                                </div>{" "}
                            </a>
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
                            <a
                                key={item._id}
                                href={`/don-hang/${idShop}/${item._id}/${trangThaiDH}`}
                            >
                                <div className="chiTietDonHang">
                                    <div className="chiTietTungO">
                                        {item.createdAt.slice(0, 10)}
                                    </div>
                                    <div className="chiTietTungO">
                                        {item.tenSp}
                                    </div>
                                    <div className="chiTietTungO">
                                        {VND.format(item.donGia)}
                                    </div>
                                    <div className="chiTietTungO">
                                        {item.slSP}
                                    </div>
                                    <div className="chiTietTungO">
                                        {VND.format(item.thanhTien)}
                                    </div>

                                    <div className="chiTietTungO">
                                        Xem Chi Tiết
                                    </div>
                                </div>
                            </a>
                        );
                    })}
            </div>
        </div>
    );
};
export default DonHang;

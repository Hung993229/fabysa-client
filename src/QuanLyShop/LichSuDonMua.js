import "./DonMua.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDonHang } from "../redux/apiRequest";
import { useEffect } from "react";
const LichSuDonMua = () => {
    const { idShop } = useParams();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    console.log("allDonHang", allDonHang);
    const trangThaiDH = 3;
    useEffect(() => {
        getDonHang(user?._id, trangThaiDH, dispatch);
    }, []);
    return (
        <div className="DonMua">
            <a href={`/shop/ca-nhan/${idShop}`}>
                <button className="CloseShop">Close</button>
            </a>
            <div className="tieuDeDonHang">Đơn Hàng Thành Công</div>
            {allDonHang && allDonHang.length !== 0 ? (
                <div className="ttdonHang">
                    <div className="thoiGian">Thời Gian</div>
                    <div className="SanPham">
                        <div className="tenSanPham">Sản Phẩm</div>
                        <div className="soLuong">Số Lượng</div>
                    </div>
                </div>
            ) : (
                <div>Đơn hàng trống!</div>
            )}

            {allDonHang?.map((item, index) => {
                return (
                    <div key={index}>
                        <div className="ttdonHang">
                            <div className="thoiGian">
                                {item?.createdAt.slice(5, 10)}
                            </div>
                            <div>
                                {item?.donHang?.map((item2, index) => {
                                    return (
                                        <div className="SanPham" key={index}>
                                            <div className="tenSanPham">
                                                {item2.TenSanPham}
                                            </div>
                                            <div className="soLuong">
                                                {item2.soLuong}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default LichSuDonMua;

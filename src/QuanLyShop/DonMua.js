import "./DonMua.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDonHang } from "../redux/apiRequest";
import { useEffect } from "react";
import { useState } from "react";
const DonMua = () => {
    const { idShop } = useParams();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    const allDonHang = useSelector(
        (state) => state.donHang.donHang.alldonHang?.allDonHang
    );
    const [skip, setskip] = useState(0);
    const trangThaiDH = 1;
    useEffect(() => {
        const limit = 20
        getDonHang(user?._id, skip,limit, trangThaiDH, dispatch);
        
    }, [skip]);
    return (
        <div className="DonMua">
            <a
                href={
                    idShop === user?._id
                        ? `/ca-nhan`
                        : `/shop/ca-nhan/${idShop}`
                }
            >
                <button className="CloseShop">Close</button>
            </a>
            <div className="tieuDeDonHang">Đơn Hàng Đang Giao</div>
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
            {(skip > 20 || skip === 20) && (
                <button onClick={() => setskip(+skip - 20)} className="xemThem">
                    Quay Lại
                </button>
            )}
            {allDonHang?.length === 20 && (
                <button onClick={() => setskip(+skip + 20)} className="xemThem">
                    Xem Thêm
                </button>
            )}
        </div>
    );
};
export default DonMua;

import "./ChiTietSanPham2.scss";
import { useSelector } from "react-redux";
const ChiTietSanPham2 = (props) => {
    const {
        cart,
        setcart,
        handleThemGioHangCoUser,
        handleThemGioHangKhongUser,
        thongTinSp,
        showChiTietSanPham,
        setshowChiTietSanPham,
    } = props;
    const gioHang = useSelector(
        (state) => state.gioHang.gioHang.gioHang?.gioHang
    );
    const user = useSelector((state) => state.auth.login.currentUser);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="chiTietSanPham-container">
            <button className="close" onClick={() => setshowChiTietSanPham(0)}>
                Close
            </button>
            <div className="anhVaTen">
                <div className="trai">
                    <img
                        src={thongTinSp?.AnhSanPham}
                        className="anhSanPham"
                        alt="timtim"
                    />
                </div>
                <div className="phai">
                    <div className="tenSanPham">{thongTinSp?.TenSanPham}</div>
                    <div className="giaBan">
                        <div className="giaBanMoi">
                            {VND.format(thongTinSp?.giaKhuyenMai)}
                        </div>
                        <div className="giaGiam">
                            <div className="giabanCu">
                                {VND.format(thongTinSp?.giaNiemYet)}
                            </div>
                            <div className="phanTram">
                                Giảm&nbsp;
                                {Math.floor(
                                    (100 *
                                        (thongTinSp?.giaNiemYet -
                                            thongTinSp?.giaKhuyenMai)) /
                                        thongTinSp?.giaNiemYet
                                )}
                                %
                            </div>
                        </div>
                    </div>

                    {!user ? (
                        <>
                            {cart?.find(
                                (thongTinSp2) =>
                                    thongTinSp2._id === thongTinSp._id
                            ) ? (
                                <button className="daThem">ĐÃ THÊM</button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleThemGioHangKhongUser(thongTinSp)
                                    }
                                    className="muaHang"
                                >
                                    THÊM GIỎ HÀNG
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            {!gioHang ? (
                                <button
                                    onClick={() =>
                                        handleThemGioHangCoUser(thongTinSp._id)
                                    }
                                    className="muaHang"
                                >
                                    THÊM GIỎ HÀNG
                                </button>
                            ) : (
                                <>
                                    {gioHang?.gioHang.find(
                                        (thongTinSp2) =>
                                            thongTinSp2 === thongTinSp._id
                                    ) ? (
                                        <button className="daThem">
                                            ĐÃ THÊM
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleThemGioHangCoUser(
                                                    thongTinSp._id
                                                )
                                            }
                                            className="muaHang"
                                        >
                                            THÊM GIỎ HÀNG
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    <div className="viTriSanPham">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="diachisanpham">{thongTinSp?.xa}</div>
                        <div className="diachisanpham">{thongTinSp?.huyen}</div>
                        <div className="diachisanpham">{thongTinSp?.tinh}</div>
                    </div>
                </div>
            </div>
            <div className="tieuDeThongTinSanPham">Thông Tin Sản Phẩm</div>
            <div className="thongTinSanPham">{thongTinSp?.thongTinSanPham}</div>
        </div>
    );
};
export default ChiTietSanPham2;

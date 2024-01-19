import "./ChiTietSanPham2.scss";
const ChiTietSanPham2 = (props) => {
    const {
        handleThemGioHang,
        thongTinSp,
        showChiTietSanPham,
        setshowChiTietSanPham,
    } = props;
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

                    <button
                        onClick={() => {
                            handleThemGioHang(thongTinSp);
                        }}
                        className="muaHang"
                    >
                        THÊM GIỎ HÀNG
                    </button>
                    <div className="viTriSanPham">
                                                                                    <i className="fa-solid fa-location-dot"></i>
                                                                                    <div className="diachisanpham">
                                                                                        {
                                                                                            thongTinSp?.xa
                                                                                        }
                                                                                    </div>
                                                                                    <div className="diachisanpham">
                                                                                        {
                                                                                            thongTinSp?.huyen
                                                                                        }
                                                                                    </div>
                                                                                    <div className="diachisanpham">
                                                                                        {
                                                                                            thongTinSp?.tinh
                                                                                        }
                                                                                    </div>
                                                                                </div>
                </div>
            </div>
            <div className="tieuDeThongTinSanPham">Thông Tin Sản Phẩm</div>
            <div className="thongTinSanPham">{thongTinSp?.thongTinSanPham}</div>
        </div>
    );
};
export default ChiTietSanPham2;
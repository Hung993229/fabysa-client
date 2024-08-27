import "./ChiTietSanPham2.scss";
import { useSelector } from "react-redux";
const ChiTietSanPham2 = (props) => {
    const {
   
        handleDaThemGioHang,
        handleThemGioHang,
        thongTinSp,
        setloading,
        cartDemo,
        handlexemAnh,
    } = props;
    const gioHang = useSelector(
        (state) => state.gioHang.gioHang.gioHang?.gioHang
    );
    const ttShop = useSelector((state) => state.ttShop.ttShop.ttShop?.shop);
    const nvQuanLy = ttShop?.ttShopThem?.nvQuanLy;
    const user = useSelector((state) => state.auth.login.currentUser);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const allDacDiemSP = thongTinSp?.allDacDiemSP;
    const suaSanPham = () => {
        const suaSp = window.confirm("Sửa Sản Phẩm Này?");
        if (suaSp) {
            setloading(6);
        }
    };

    return (
        <div className="chiTietSanPham-container">
            <div className="quayLai-tieuDe">
                <div onClick={() => setloading(0)} className="quayLai">
                    <i className="fa fa-angle-double-left"></i>Quay Lại
                </div>
                <div className="tieuDe">Chi Tiết Sản Phẩm</div>
            </div>
            <div className="sanPham-container">
                {user?._id === ttShop?.user ||
                user?.admin === true ||
                nvQuanLy?.find(
                    (item) => item?.sdtnvQuanLy === user?.username
                ) ? (
                    <div className="tenSanPham-sua-xoa">
                        <div
                            onClick={() => suaSanPham()}
                            className="tenSanPham"
                        >
                            {thongTinSp?.TenSanPham}&emsp;
                            <i className="fa fa-edit"></i>
                        </div>
                    </div>
                ) : (
                    <div className="tenSanPham-sua-xoa">
                        <div className="tenSanPham">
                            {thongTinSp?.TenSanPham}
                        </div>
                    </div>
                )}
                <div className="bangGiaSP-themGioHang">
                    <div className="bangGiaSP">Bảng Giá Sản Phẩm</div>
                    {cartDemo?.find((item) => thongTinSp?._id === item?._id) ? (
                        <div
                            onClick={() => handleDaThemGioHang(thongTinSp)}
                            className="dathemGH"
                        >
                            Đã Thêm
                        </div>
                    ) : (
                        <div
                            onClick={() => handleThemGioHang(thongTinSp)}
                            className="themGH"
                        >
                            Thêm Giỏ Hàng
                        </div>
                    )}
                </div>

                <div className="dacDiem-container">
                    {allDacDiemSP &&
                        allDacDiemSP?.length > 0 &&
                        allDacDiemSP?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="dacDiem-themGioHang"
                                >
                                    <img
                                        onClick={() =>
                                            handlexemAnh(item.AnhSanPham)
                                        }
                                        src={item?.AnhSanPham}
                                        className="anhSp"
                                        alt="timtim"
                                    />

                                    <div className="giaSanPham">
                                        <div className="giaKM">
                                            {VND.format(item?.giaCtv)}
                                        </div>
                                        <div className="tenSp">
                                            {item?.tenDacDiem}
                                        </div>
                                    </div>
                                    <div className="giaNY-giamGia">
                                        <div className="giaNY">
                                            {VND.format(item?.giaNiemYet)}
                                        </div>
                                        <div className="giamGia">
                                            Giảm&nbsp;
                                            {Math.floor(
                                                (100 *
                                                    (item?.giaNiemYet -
                                                        item?.giaCtv)) /
                                                    item?.giaNiemYet
                                            )}
                                            %
                                        </div>
                                    </div>
                                    <div className="sl">{item?.soLuong}</div>
                                </div>
                            );
                        })}
                </div>
                <div className="gioiThieuSp">Giới Thiệu Sản Phẩm</div>
                <div
                    className="thongTinChiTiet"
                    dangerouslySetInnerHTML={{
                        __html: thongTinSp?.thongTinSanPham,
                    }}
                >
                
                </div>
            </div>
        </div>
    );
};
export default ChiTietSanPham2;
